import express from "express";
import activitesRouter from "./routes/activities.js";

const app = express();

// serve static files using middleware
app.use("/scripts", express.static("./public/scripts"));

app.use("/public", express.static("./public"));
app.use("/activities", activitesRouter);


app.get("/", (req, res) => {
    res.send("Hello World");
    });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });