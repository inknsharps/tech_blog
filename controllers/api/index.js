const router = require("express").Router();
const crudPostRoutes = require("./CRUDpost-routes");
const userRoutes = require("./user-routes");

router.use("/users", userRoutes);
router.use("/crudpost", crudPostRoutes);

module.exports = router;