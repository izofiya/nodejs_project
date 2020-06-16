const { User } = require("../models");
const logger = require("../services/logger");

module.exports = {
  async login(req, res) {
	const { email, password } = req.body;
    if (!email || !password) {
      logger.error("Enter email and password!");
      return res.status(400).send("Enter email and password!");
    }
    try {
	  const user = await User.authenticate(email, password);
      if (user) {
        const userJson = user.toJSON();
        const { password, ...userWithoutPassword } = userJson;
        logger.info("Loged in");
        res.send({
          user: userWithoutPassword,
        });
      }
    } catch (err) {
      logger.error(err);
      return res.status(400).send("Invalid username or password");
    }
  },
};
