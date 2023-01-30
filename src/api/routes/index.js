const express = require("express");
const router = express.Router();
const mainRoutes = require("./main.route");


router.use("/api", mainRoutes); // GET /api

module.exports = router;
