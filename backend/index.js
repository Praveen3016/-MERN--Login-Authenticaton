import mysql from "mysql";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyToken } from "./middleware/verifyToken.js";
import { isAuthenticated } from "./middleware/isAuthenticated.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "login_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.get("/home", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the home page!", user: req.user , tokenB : req.token});
});

// app.get("/auth", (req, res) => {
//   res.json({ message: "check auth"});
// });

app.listen(3000, () => {
  console.log("Running at 3000");
});

app.post("/api/users", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received data:", name, email, password);

  const query = "SELECT * FROM users WHERE email=?";
  db.query(query, [email], (err, data) => {
    if (err) {
      console.log("Error querying database:", err);
      return res.status(500).send({ error: "Failed to query database" });
    }

    if (!data.length) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      const q = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(q, [name, email, hashPassword], (err, result) => {
        if (err) {
          console.log("Error inserting record:", err);
          return res.status(500).send({ error: "Failed to insert record" });
        }
        console.log("1 record inserted");

        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            id: result.insertId, // Use the inserted ID from the result
            email: email,
          },
          process.env.JWT_SECRET
        );

        res.cookie("access_cookie", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        });

        return res
          .status(200)
          .json({ message: "Record inserted successfully" });
      });
    } else {
      return res.status(409).json({ message: "User already exists" });
    }
  });
});

app.post("/api/user/login",   async (req, res) => {
  const { email, password } = req.body;

  try {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], async (error, data) => {
      if (error)
        return res.status(500).json({ message: "Error in login", error });

      if (data.length) {
        console.log("User data:", data[0]);

      //   // const pass = bcrypt.compareSync(password, data[0].password); // true
      //   const pass = await bcrypt.compare(password, data[0].password);
      // console.log('pass', pass)
      //   if (!pass){
      //     return res.status(401).json({ message: "incorrect password" });
      //   }else {
          const token = jwt.sign(
            {
              id: data[0].id,
              email: data[0].email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.cookie("access_cookie", token, {
            httpOnly: false,
            secure: true, 
            expires: new Date(Date.now() + 60 * 60 * 1000), 
          });

          return res.status(200).json({ message: "Logged in", token });
        // }
        
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

app.get("/api/user/logout", (req, res) => {
  res.cookie("access_cookie", "", {
    httpOnly: true,
    expires: new Date(0), // Set expiration date to a past date to clear the cookie
    secure: false, // Ensure this matches your previous settings
    sameSite: "strict", // Ensure this matches your previous settings
  });

  res.status(200).json({ message: "Logged out successfully" });
});
