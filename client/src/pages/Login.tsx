import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";

export default function Login() {
   const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    const email = document.querySelector<HTMLInputElement>("#email");
    const password = document.querySelector<HTMLInputElement>("#password");

    console.log(email,password);
    if (email && password) {
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
        .then((result) => {
          return result.json();
        })
        .then((data) => {
            console.log(data);
          if (data.loggedIn) {
            //onLogin();
          } else {
            alert(data.message || "Login failed");
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
      <Paper elevation={2} sx={{padding:2}}>
        <Box sx={{padding:2}}>
            <Typography variant={"h4"}>Sign In</Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleLoginSubmit}
          sx={{ "& .MuiTextField-root": { m: 1, width: "40ch" }, display:"flex", flexDirection:"column", padding:2 }}
          noValidate
          autoComplete="off"
        >
          <TextField id="email" label="Email" variant="filled" />
          <TextField id="password" label="Password" variant="filled" type="password" />
          <Typography sx={{marginTop:2, marginBottom:2}}>Don't have an account? <Link href="/register">Register Here</Link></Typography>
          <Button variant="contained" type="submit">Sign In</Button>
        </Box>
      </Paper>
    </Box>
  );
}
