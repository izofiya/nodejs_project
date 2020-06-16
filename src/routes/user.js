const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthController");

const express = require("express");
const router = express.Router();

router
  .route("/users")
  .post(UserController.createUser)
  .get(UserController.getUsers);

router.route("/login").post(AuthController.login);

module.exports = {
  users: router,
};
