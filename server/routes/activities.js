import express from "express";
// import { getActivities, createActivity, deleteActivity, updateActivity } from "../controllers/activities.js";
import path from "path";
import { fileURLToPath } from "url";
// TODO: change this to models folder
import activities from "../data/activities.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get("/", (req, res) => {
  console.log("GET request received");
  try {
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

router.get("/activities/:id", (req, res) => {
  console.log("GET request received");
  res
    .status(200)
    .sendFile(path.resolve(__dirname, "../public/activities.html"));
});

export default router;
