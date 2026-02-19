"use client";
import LoginForm from "@/components/LoginForm";
import { useState } from "react";
import Dashboard from "./dashboard/page";
import Login from "./login/page";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  } else {
    return <Dashboard onLogin={() => setLoggedIn(false)}></Dashboard>;
  }
}
