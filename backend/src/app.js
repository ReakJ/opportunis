import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Opportunis backend is Running!");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Opportunis API is working!"
    });
});

export default app;