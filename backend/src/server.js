const express = require("express");
const cors = require("cors");

const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "RailSetu Backend is Running!"
    });
});

app.get("/api/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 AS result");

        res.json({
            message: "MySQL connection successful!",
            data: rows
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "MySQL connection failed"
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});