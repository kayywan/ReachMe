const router = require("express").Router()
const authRoutes = require("./users");

router.use("/users", authRoutes);

module.exports = router;