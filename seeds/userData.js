const sequelize = require("../config/connection.js");
const { User } = require("../models");

const userData = [
    {
        username: "SQL_Dev",
        password: "password12345"
    },
    {
        username: "JS_Dev",
        password: "password12345"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;