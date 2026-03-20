import express from "express";
import {
  predictDiabetes,
  getUserRecords,
  getRecordById
} from "../controllers/diabetes.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/predict", authMiddleware, predictDiabetes);
router.get("/", authMiddleware, getUserRecords);
router.get("/:id", authMiddleware, getRecordById);

export default router;