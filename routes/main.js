const router = require("express").Router();
const { dashboard, login } = require("../controllers/main");
const authMiddleWear = require("../middleWare/auth");
router.route("/login").post(login);
router.route("/dashboard").get(authMiddleWear, dashboard);
module.exports = router;
