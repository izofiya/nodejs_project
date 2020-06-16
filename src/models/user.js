const bcrypt = require("bcryptjs");
const logger = require("../services/logger");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: DataTypes.STRING,
    },
    {
      timestamps: true,
      underscore: false,
      tableName: "users",
    }
  );
  User.associate = function(models) {
		User.belongsTo(models.Role, { foreignKey: 'roleId', as: "role" });
	};

  User.authenticate = async function (email, password) {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["email", "createdAt", "updatedAt"] },
    });
    console.log(password);
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      logger.error("Invalid password");
      throw new Error("invalid password");
    }
  };

  return User;
};
