// Import dependencies
const express = require("express");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Initialize SQLite database
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    // Create users table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating users table:", err.message);
        } else {
          console.log("Users table ready.");
        }
      }
    );
  }
});

// Secret key for JWT
const JWT_SECRET = "your_secret_key";

// Route: Create User
app.post("/api/createUser", async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    db.run(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [userName, email, hashedPassword],
      (err) => {
        if (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            return res.status(400).json({ error: "Username or email already exists." });
          }
          return res.status(500).json({ error: "Error creating user." });
        }
        res.json({ message: "User created successfully." });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Error creating user." });
  }
});

// Route: Login User
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check if the user exists
  db.get(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    async (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Error retrieving user." });
      }
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      // Generate a JWT
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful.", token });
    }
  );
});

// Route: Get All Users (for testing)
app.get("/api/users", (req, res) => {
  db.all(`SELECT id, username, email FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Error retrieving users." });
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
