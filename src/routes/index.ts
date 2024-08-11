import express from "express";
import { errorHandler } from "../utils/errors-handler";
import v1ApiRoutes from "./v1";

const router = express.Router();

/**
 * Mounts the version 1 API routes under the "/v1" path.
 *
 * This router is used to handle all version 1 API requests. All routes defined
 * in the `v1ApiRoutes` module will be prefixed with "/v1".
 */
router.use("/v1", v1ApiRoutes);

/**
 * Error handling middleware.
 *
 * This middleware is used to catch and handle errors that occur during the request processing.
 * It should be added after all other routes and middlewares.
 */
router.use(errorHandler);

export default router;
