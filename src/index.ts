import bodyParser from "body-parser";

import cors from "cors"; // Import the CORS middleware
import express from "express";
import { PORT } from "./config";

import apiRouter from "./routes/index";

const app = express();

/**
 * Function to configure and start the Express server.
 *
 * This function sets up the necessary middleware, such as `bodyParser` to handle JSON requests,
 * and defines the API routes using the `apiRouter`. Finally, it starts the server on the specified port.
 */
const configureAndStartServer = () => {
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Set up the base route for all API endpoints
  app.use("/api", apiRouter);

  // Start the server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Execute the function to configure and start the server
configureAndStartServer();
