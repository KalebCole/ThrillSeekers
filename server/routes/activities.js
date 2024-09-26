import express from "express";
// TODO: create a controller file that reads and writes to json and can read and write to a database
// import { getActivities, createActivity, deleteActivity, updateActivity } from "../controllers/activities.js";
import path from "path";
import { fileURLToPath } from "url";
// TODO: change this to models folder
import adrenalineActivities from "../data/activities.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get("/", (req, res) => {
  console.log("GET request received");
  try {
    res.status(200).json(adrenalineActivities);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

// router.get("/activities/:id", (req, res) => {
//   res
//     .status(200)
//     .sendFile(path.resolve(__dirname, "../public/activities.html"));
// });

export default router;