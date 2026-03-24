import { VisibilityOff, Visibility, EmailOutlined, Lock } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router";
import LockOutlineIcon from "@mui/icons-material/LockOutline";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default function Login() {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateInput = () => {};

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      if (error) {
        setError(true);
        return;
      }

      if (data.session) {
        navigate(0);
      }

    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoggingIn(false);
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
      <Paper elevation={1} sx={{ padding: 2, width:"100%", maxWidth:450, marginLeft:"4%", marginRight:"4%" }}>
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
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              onBlur={validateInput}
              error={error}
              type="email"
              id="email"
              label="Email"
              name="email"
              required
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 1 }} variant="outlined">
            <InputLabel htmlFor="password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              error={error}
              required
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlineIcon/>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
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
