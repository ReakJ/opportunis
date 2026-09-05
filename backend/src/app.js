import express from "express";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware.js"

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Opportunis backend is Running!");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "Opportunis API is working!"
    });
});

app.use(errorMiddleware);

export default app;