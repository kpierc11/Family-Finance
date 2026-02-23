import { Route, Routes } from "react-router";
import "./App.css";
import DashboardNavigation from "../components/DashboardNavigation";
import Home from "./pages/Home";
import Bills from "./pages/Bills";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function App() {
  const [claims, setClaims] = useState(null);
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get("token_hash");
  const [verifying, setVerifying] = useState(!!hasTokenHash);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  useEffect(() => {
    // Check for existing session using getClaims
    supabase.auth.getClaims().then(({ data: { claims } }) => {
      setClaims(claims);
    });
    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data: { claims } }) => {
        setClaims(claims);
      });
    });
    return () => subscription.unsubscribe();
  }, []);

  // Show verification state
  if (verifying) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>Confirming your magic link...</p>
        <p>Loading...</p>
      </div>
    );
  }

  // Show auth success (briefly before claims load)
  if (authSuccess && !claims) {
    return (
      <div>
        <h1>Authentication</h1>
        <p>✓ Authentication successful!</p>
        <p>Loading your account...</p>
      </div>
    );
  }
  // If user is logged in, show welcome screen
  if (claims) {
    return (
      <Routes>
        <Route path="/" element={<DashboardNavigation />}></Route>
        <Route path="/dashboard" element={<DashboardNavigation />}>
          <Route index element={<Home />} />
          <Route path="analytics" element={<Bills />} />
        </Route>
      </Routes>
    );
  }
  // Show login form
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route index path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
