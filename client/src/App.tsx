import { Route, Routes } from "react-router";
import "./App.css";
import DashboardNavigation from "../components/DashboardNavigation";
import Home from "./pages/Home";
import Bills from "./pages/Bills";
import { useContext } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext } from "../components/AuthProvider";

function App() {
  const {userAuthenticated, onLogin, onLogout} = useContext(AuthContext);

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
