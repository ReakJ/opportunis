import express from "express";
import cors from "cors";

import errorMiddleware from "./middleware/errorMiddleware.js";
import onboardingRoutes from "./routes/onboardingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Opportunis backend is Running!");
});

app.use("/api/onboarding", onboardingRoutes);

app.use(errorMiddleware);

export default app;