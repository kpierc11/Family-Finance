import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const shadows = Array(25).fill("none") as string[];

shadows[1] = `
  rgba(99, 99, 99, 0.2) 0px 2px 8px 0px
`; // stronger card

shadows[2] = `
  0 1px 2px rgba(0, 0, 0, 0.08),
  0 2px 4px rgba(0, 0, 0, 0.08)
`; // Trello

const theme = createTheme({
  palette: {
    mode: "light",
  },
  shadows: shadows as any,
  shape: {
    borderRadius: 8,
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CssBaseline></CssBaseline>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
);
