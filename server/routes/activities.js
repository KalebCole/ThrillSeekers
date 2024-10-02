import express from "express";
import {
  getActivities,
  getActivityById,
} from "../controllers/activityController.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get("/", getActivities);

router.get("/activities/:id", getActivityById);

export default router;
