const { User } = require("../models");
const logger = require("../services/logger");
const bcrypt = require("bcryptjs");

module.exports = {
  async getUsers(req, res) {
    let users;
    let { email } = req.query;
    try {
      users = await User.findAll({
        where: email,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
    } catch (err) {
      logger.error(err);
      res.status(500).send({
        error: "Database is offline",
        message: err.message,
      });
    }
    res.status(200).send(users);
  },

  async createUser(req, res) {
    try {
      const { fullName, email, password, photo, roleId } = req.body;
      let hash = bcrypt.hashSync(password, 10);
      const user = await User.create({
        fullName,
        email,
        password: hash,
        photo,
        roleId,
      });
      res.send(user);
    } catch {
      logger.error("Sorry. You can not add new user");
      res.status(400).send("Sorry. You can not add new user.");
    }
  },
};
