import { Route, Routes } from "react-router";
import "./App.css";
import DashboardNavigation from "../components/DashboardNavigation";
import Home from "./pages/Home";
import Bills from "./pages/Bills";
import { useContext, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "../components/AuthProvider";

function App() {
  const { userAuthenticated, onLogin, onLogout } = useContext(AuthContext);

  const verifyToken = async () => {
    //Verify Token
    const tokenResponse = await fetch("http://localhost:8000/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (tokenResponse.status === 401) {
      console.log("Couldn't validate token");
      return;
    }

    if(tokenResponse.ok)
    {
      onLogin();
    }

  };

  useEffect(() => {
    verifyToken();
  });

  if (!userAuthenticated) {
    return (
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<DashboardNavigation />}>
        <Route index element={<Home />} />
        <Route path="analytics" element={<Bills />} />
      </Route>
    </Routes>
  );
}

export default App;
