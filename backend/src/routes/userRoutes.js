const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You can access this protected route",
        user: req.user
    });
});

module.exports = router;