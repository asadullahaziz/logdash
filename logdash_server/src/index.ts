// Libs
// import "dotenv/config";
import express, { Express, Request, Response } from "express";

// Modules
import routes from "./routes";
// import errorHandler from "./utils/errorHandler"

// Setup
const app: Express = express();
const port = process.env.PORT || 3000;

// MiddleWare
// app.use(express.json());

// Routes
app.use(routes);

// Error Handler
// app.use(errorHandler);

// Init Server
app.listen(port, () => {
    console.log("App is running on port " + port);
})