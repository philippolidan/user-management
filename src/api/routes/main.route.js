const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");

router.route("/").get((req, res) => {
    res.send({
        status: 200,
        message: "Successfully connected to User Management endpoints.",
    });
});

router.use("/users", userRoutes); // GET /api

module.exports = router;
