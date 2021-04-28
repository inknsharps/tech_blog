const sequelize = require("../config/connection.js");
const seedUsers = require("./userData.js");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    process.exit(0);
};

seedAll();