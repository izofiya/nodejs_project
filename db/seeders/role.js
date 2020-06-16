module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      "role",
      [
        {
          id: 1,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("role", null, {});
  },
};
