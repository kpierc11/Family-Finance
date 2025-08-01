const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const rawData = fs.readFileSync("./login.json");
  const jsonData = JSON.parse(rawData);

  const matchingEmail = jsonData.users.find((user) => user.email == email);
  const matchingPassword = jsonData.users.find(
    (user) => user.password == password
  );

  if (matchingEmail && matchingPassword) {
    res.json({ loggedIn: "true" });
  } else {
    res.json({ loggedIn: "false" });
  }
});

app.get("/login", (req, res) => {
  res.json({ loggedIn: "true" });
});
