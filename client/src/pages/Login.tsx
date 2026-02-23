import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default function Login() {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateInput = () => {};

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    const email = document.querySelector<HTMLInputElement>("#email");
    const password = document.querySelector<HTMLInputElement>("#password");

    console.log(email, password);
    if (!email || !password) {
      setError(true);
      return;
    }

    if (!email.value || !password.value) {
      setError(true);
      return;
    }

    setLoggingIn(true);
    setError(false);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.log("Error:", error);
    }

    navigate("/dashboard");
  };

  if (loggingIn) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress></CircularProgress>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Paper elevation={2} sx={{ padding: 2 }}>
        <Box sx={{ padding: 2 }}>
          <Typography variant={"h4"}>Sign In</Typography>
          {error ? (
            <Alert sx={{ marginTop: 2 }} severity="error">
              <AlertTitle>Error</AlertTitle>
              Couldn't log in with those credentials.
            </Alert>
          ) : (
            <></>
          )}
        </Box>
        <Box
          component="form"
          onSubmit={handleLoginSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onBlur={validateInput}
            error={error}
            helperText="Please enter a valid email."
            type="email"
            id="email"
            label="Email"
            variant="filled"
            name="email"
            required
          />
          <TextField
            error={error}
            id="password"
            label="Password"
            variant="filled"
            type="password"
            name="password"
            required
          />
          <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
            Don't have an account? <Link href="/register">Register Here</Link>
          </Typography>
          <Button variant="contained" type="submit">
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
