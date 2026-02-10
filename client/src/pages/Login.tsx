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
import { AuthContext } from "../../components/AuthProvider";
import { use, useContext, useState } from "react";

export default function Login() {
  const { onLogin } = useContext(AuthContext);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");

  const validateInput = () => {};

  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    const email = document.querySelector<HTMLInputElement>("#email");
    const password = document.querySelector<HTMLInputElement>("#password");

    console.log(email, password);
    if (email && password) {
      if (email.value == undefined || password.value == undefined) {
        setError(true);
        return;
      }

      setLoggingIn(true);
      fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
        .then((response) => {
          if (response.status === 401) {
            console.log("Could not log in user with current credentials");
            setError(true);
            return;
          }
          return response.json();
        })
        .then((user) => {
          console.log(user);
          if (user) {
            onLogin();
            setLoggingIn(false);
          } else {
            setLoggingIn(false);
          }
        })
        .catch((error) => {
          setLoggingIn(false);
          console.log(error);
        });
    }
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
            <Alert sx={{marginTop:2}} severity="error">
              <AlertTitle>Login Error</AlertTitle>
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
