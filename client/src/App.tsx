import { Route, Routes } from "react-router";
import "./App.css";
import DashboardNavigation from "../components/DashboardNavigation";
import Dashboard from "./pages/Dashboard";
import Bills from "./pages/Bills";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createClient, type JwtPayload } from "@supabase/supabase-js";
import { Box, CircularProgress } from "@mui/material";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function App() {
  const [claims, setClaims] = useState<JwtPayload | null>(null);
  const params = new URLSearchParams(window.location.search);
  const hasTokenHash = params.get("token_hash");
  const [verifying, setVerifying] = useState(!!hasTokenHash);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);

  const verifySession = async () => {
    setVerifying(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const token_hash = params.get("token_hash");
      const type = params.get("type");
      if (token_hash) {
        // Verify the OTP token
        supabase.auth
          .verifyOtp({
            token_hash,
            type: type || "email",
          })
          .then(({ error }) => {
            if (error) {
              setAuthError(error.message);
            } else {
              setAuthSuccess(true);
              // Clear URL params
              window.history.replaceState({}, document.title, "/");
            }
            setVerifying(false);
          });
      }

      const { data, error } = await supabase.auth.getClaims();

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setClaims(data.claims);
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        setTimeout(async () => {
          const { data, error } = await supabase.auth.getClaims();
          if (error) {
            console.log(error);
            return;
          }
          if (data) {
            setClaims(data.claims);
          }
        }, 0);
      });
      return subscription.unsubscribe();
    } catch (error) {}
    finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    verifySession();
  }, []);


  if(verifying)
  {
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  }

  if (claims) {
    return (
      <Routes>
        <Route path="/" element={<DashboardNavigation />}>
          <Route index element={<Dashboard />} />
          <Route path="/bills" element={<Bills />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
