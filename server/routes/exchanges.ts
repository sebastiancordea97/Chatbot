import express from "express";
import exchangesController from "../controllers/exchanges";

const router = express.Router();

router.get("/", exchangesController.getExchanges);

export default router;