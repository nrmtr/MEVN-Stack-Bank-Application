const express = require("express");
const authenControllers = require("../controllers/authenControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", authenControllers.registerController);

router.post("/login", authenControllers.loginController);

router.post("/logout", authenControllers.logoutController);

router.post("/refresh", authenControllers.refreshController);

router.get("/user", auth, authenControllers.userController);

module.exports = router;
