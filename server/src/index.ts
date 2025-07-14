import express from "express";
import cors from "cors";
import session from "express-session";
import Redis from "ioredis";
import { RedisStore } from "connect-redis";

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Initialize Redis
const redis = new Redis({});

redis.on("connect", () => console.log("Connected to Redis!"));
redis.on("error", (err: Error) => console.log("Redis Client Error", err));

// Session configuration
app.use(
  session({
    // Use Redis as the session store
    store: new (RedisStore as any)({
      client: redis, // Pass the Redis client instance
      disableTouch: true, // Prevent session expiration from being reset on every request
    }),
    secret: "blabbits454545", // Secret key to sign the session ID cookie (should be strong in production)
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Do not create session until something is stored
    cookie: {
      secure: false, // Cookie is sent over HTTP (set to true if using HTTPS)
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      maxAge: 1000 * 60 * 60 * 24, // Cookie expires after 1 day (in milliseconds)
    },
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Hello world!!</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
