import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { CssBaseline } from "@mui/material";
import AuthProvider from "../components/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CssBaseline></CssBaseline>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
