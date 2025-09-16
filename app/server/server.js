const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 3001;

const pgp = require("pg-promise")(/* options */);
const db = pgp("postgres://postgres:admin@localhost:5432/postgres");

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  let userExists = false;

  bcrypt.hash(password, saltRounds, (err, hashPwd) => {
    if (err) {
      console.error("Bcrypt error:", err);
      return res.status(500).json({ error: "Error hashing password" });
    }

    db.one('SELECT "email" FROM public."Users" WHERE "email" = $1', [email])
      .then((data) => {
        console.log("User with this email found: ", data);
        userExists = true;
        return res.status(401).json({message: "User already exists", registeredUser: false });
      })
      .catch((error) => {
        userExists = false;
        console.error("DB ERROR no user found.", error);
        return res.status(401).json({ registeredUser: false });
      });

    if (!userExists) {
      db.one(
        'INSERT INTO public."Users"(email, password) VALUES($1, $2) RETURNING *',
        [email, hashPwd]
      )
        .then((data) => {
          console.log("Inserted row:", data);
          res
            .status(201)
            .json({ message: "User registered successfully", registeredUser: true });
        })
        .catch((error) => {
          console.error("DB ERROR:", error);
          res.status(500).json({ error: "Database error" });
        });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.one('SELECT "password" FROM public."Users" WHERE "email" = $1', [email])
    .then((data) => {
      console.log("retrieved:", data);

      const hashedPassword = data.password;

      bcrypt.compare(password, hashedPassword, function (err, result) {
        if (err) {
          console.error("Bcrypt error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (result) {
          console.log("Password match!");
          return res.json({ loggedIn: true });
        } else {
          console.log("Password does not match!");
          return res.status(401).json({ loggedIn: false });
        }
      });
    })
    .catch((error) => {
      console.error("ERROR:", error);
      return res.status(500).json({ error: "Database error" });
    });
});

// app.get("/login", (req, res) => {
//   res.json({ loggedIn: "true" });
// });
