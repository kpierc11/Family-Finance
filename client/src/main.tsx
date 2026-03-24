import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const shadows = Array(25).fill("none") as string[];


// shadows[1] = `
//   rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
// `; // Trello

const theme = createTheme({
  colorSchemes: {
    dark: false,
  },
 // shadows: shadows as any,
  shape: {
    borderRadius: 8,
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline></CssBaseline>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);
