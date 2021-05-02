const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const postRoutes = require("./post-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/post", postRoutes);

module.exports = router;