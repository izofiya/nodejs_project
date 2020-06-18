const crypto = require("crypto");
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
      salt: {
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
  User.associate = function (models) {
    User.belongsTo(models.Role, { foreignKey: "roleId", as: "role" });
  };

  User.authenticate = async function (email, password) {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["email", "createdAt", "updatedAt"] },
    });
    if (crypto.scryptSync(password, user.salt, 32)) {
      return user;
    } else {
      logger.error("Invalid password");
      throw new Error("invalid password");
    }
  };

  return User;
};
