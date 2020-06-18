const userpassword = require("../../src/helpers/saltHashPassword");
const { salt, passwordHash } = userpassword("123456");

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: "dcaf23b0-acf2-11ea-bd01-dbcb662ad76f",
          fullName: "Ivan Petrov",
          email: "ivan_petrov@gmail.com",
          password: passwordHash,
          salt: salt,
          roleId: 1,
          photo: "https://html5css.ru/w3images/avatar2.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
