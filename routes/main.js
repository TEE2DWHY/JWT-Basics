const router = require("express").Router();
const { dashboard, login } = require("../controllers/main");

router.route("/login").post(login);
router.route("/dashboard").get(dashboard);
module.exports = router;
