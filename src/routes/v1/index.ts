import express from "express";
import { getBalancesController } from "../../controllers";
import getBalances from "../../middlewares";

const router = express.Router();

/**
 * Route to get balances.
 *
 * This route handles GET requests to the "/balances" endpoint. It uses the `getBalances` middleware
 * to perform any necessary pre-processing or validation before calling the `getBalancesController`
 * to handle the request and provide a response.
 *
 * The `getBalances` middleware might, for example, validate request data, authenticate the user,
 * or perform other preliminary checks before the request reaches the controller.
 */
router.post("/balances", getBalances, getBalancesController);

export default router;
