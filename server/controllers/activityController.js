import { pool } from "../config/database.js";

export const getActivities = async (req, res) => {
  // debug
  console.log("getActivities");
  try {
    const results = await pool.query(
      "SELECT * FROM activities ORDER BY id ASC"
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const getActivityById = async (req, res) => {
  // debug
  console.log("getActivityById");
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query("SELECT * FROM activities WHERE id = $1", [
      id,
    ]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
