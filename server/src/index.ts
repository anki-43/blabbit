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
    store: new (RedisStore as any)({
      client: redis,
      disableTouch: true,
    }),
    secret: "blabbits454545", // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
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
