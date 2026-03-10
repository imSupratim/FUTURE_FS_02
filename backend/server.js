import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


connectDB();

app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req,res)=>{
    res.send("CRM API Running");
});

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});