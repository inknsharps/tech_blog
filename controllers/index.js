const router = require("express").Router();
const checkAuthorization = require('../utils/authorization');

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const postRoutes = require("./singleblogpost-routes");
const dashboardRoutes = require("./dashboard-routes");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/post", postRoutes);
router.use("/dashboard", checkAuthorization, dashboardRoutes);

module.exports = router;