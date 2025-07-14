"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = require("connect-redis");
// Initialize Express app
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // Parse JSON bodies
// Initialize Redis
const redis = new ioredis_1.default({});
redis.on("connect", () => console.log("Connected to Redis!"));
redis.on("error", (err) => console.log("Redis Client Error", err));
// Session configuration
app.use((0, express_session_1.default)({
    store: new connect_redis_1.RedisStore({
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
}));
app.get("/", (req, res) => {
    res.send("<h1>Hello world!!</h1>");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} `);
});
