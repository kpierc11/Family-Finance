import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";

export default function Register() {
  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    const email = document.querySelector<HTMLInputElement>("#email");
    const password = document.querySelector<HTMLInputElement>("#password");

    if (email && password) {
      fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          console.log(data);
          if (data.userRegistered) {
            alert(data.message || "Registration Succeeded");
          } else {
            alert(data.message || "Registration failed");
          }
        });
    }
  };

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
          <Typography variant={"h4"}>Register</Typography>
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
          <TextField id="email" label="Email" variant="filled" />
          <TextField
            id="password"
            label="Password"
            variant="filled"
            type="password"
          />
          <Typography sx={{ marginTop: 2, marginBottom: 2 }}>
            Already have an account? <Link href="/login">Login Here</Link>
          </Typography>
          <Button variant="contained" type="submit">
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
