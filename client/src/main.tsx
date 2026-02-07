import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CssBaseline></CssBaseline>
    <App />
  </BrowserRouter>,
);
