import pg from "pg";
import dotenv from "./dotenv.js";

// used to set the properties to connect to the database
const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

// pool allows us to connect to the database
// a pool is a collection of connections to the database
export const pool = new pg.Pool(config);
