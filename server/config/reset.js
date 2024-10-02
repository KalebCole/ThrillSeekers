import { pool } from "./database.js";
import dotenv from "./dotenv.js";
import activities from "../data/activities.js";

// used to create out Activities table and load our json data into the db
const createActivitiesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS Activities;

    CREATE TABLE IF NOT EXISTS Activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        priority INTEGER NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
    )
`;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 Activities table created successfully");
  } catch (err) {
    console.error("⚠️ error creating Activities table", err);
  }
};

const seedActivitiesTable = async () => {
  await createActivitiesTable();

  for (const activity of activities) {
    const checkQuery = {
      text: "SELECT 1 FROM Activities WHERE name = $1",
      values: [activity.name],
    };

    try {
      const checkResult = await pool.query(checkQuery);
      if (checkResult.rowCount > 0) {
        console.log(`⚠️ ${activity.name} already exists, skipping insertion`);
        continue;
      }

      const insertQuery = {
        text: "INSERT INTO Activities (name, location, priority, image, description) VALUES ($1, $2, $3, $4, $5)",
        values: [
          activity.name,
          activity.location,
          activity.priority,
          activity.image,
          activity.description,
        ],
      };

      await pool.query(insertQuery);
      console.log(`✅ ${activity.name} added successfully`);
    } catch (err) {
      console.error("⚠️ error inserting activity", err);
    }
  }
};

seedActivitiesTable();
