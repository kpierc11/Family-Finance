import { Route, Routes } from "react-router";
import "./App.css";
import DashboardNavigation from "../components/DashboardNavigation";
import Home from "./pages/Home";
import Bills from "./pages/Bills";
import { useState } from "react";
import Login from "./pages/Login";

function App() {
const  [loggedIn, setLoggedin] = useState<boolean>(false)
  if (!loggedIn)
  {
    return <Login></Login>
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
