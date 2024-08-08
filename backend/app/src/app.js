import express from "express";
import cors from "cors";
import morgan from "morgan";

// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 8080;

// Creates the express server
const app = express();

// Configure middleware (logging, CORS support, JSON parsing support, static files support)
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

// Import and use our application routes.
import routes from "./routes/routes.js";
console.log(`Env Var API_STAGE_NAME is ${process.env.API_STAGE_NAME}`);
app.use(`/${process.env.API_STAGE_NAME || ''}`, routes);

app.listen(PORT, () => console.log(`App server listening on port ${PORT}!`));
