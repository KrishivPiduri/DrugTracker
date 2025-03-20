require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "yourSecretKey", resave: false, saveUninitialized: true })
);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware for Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// Default Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Additional Routes
app.get("/greet", (req, res) => {
  res.send("Hello from a new route!");
});

app.get("/persons/1/medications", (req, res) => {
  const dummy = {
    _id: 1,
    name: "John Doe",
    drugs_taken: [
      {
        date: "2025-03-15",
        medications: [
          {
            drug_name: "Aspirin",
            dosage: "100mg",
          },
          {
            drug_name: "Ibuprofen",
            dosage: "200mg",
          },
        ],
      },
      {
        date: "2025-03-16",
        medications: [
          {
            drug_name: "Aspirin",
            dosage: "150mg",
          },
        ],
      },
    ],
  };
  res.setHeader("Content-Type", "application/json");
  res.send(dummy);
});

// =============================
//      AUTHENTICATION ROUTES
// =============================

// Register User
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).send("User already exists");
      res.send("User registered successfully");
    }
  );
});

// Login User
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err || results.length === 0)
        return res.status(401).send("Invalid email or password");

      const user = results[0];
      const isValidPassword = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!isValidPassword)
        return res.status(401).send("Invalid email or password");

      req.session.user = user; // Store user session
      res.send("Login successful");
    }
  );
});

// Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("Login successful with Google!");
  }
);

// Logout Route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send("Error logging out");
    res.send("Logged out successfully");
  });
});

// Serve login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// =============================
//        START SERVER
// =============================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
