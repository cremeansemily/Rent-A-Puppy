// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
if (process.env.JAWSDB_URL && process.env.DEV) {
    console.log('CONNECTING TO REMOTE DB WHILE ON LOCALHOST!')
    sequelize = new Sequelize(process.env.JAWS_DB_NAME, process.env.JAWS_USER, process.env.JAWS_PW, {
        host: process.env.JAWS_HOST,
        dialect: 'mysql',
        port: 3306
    });
}
else if (process.env.JAWSDB_URL && !process.env.DEV) {
    sequelize = new Sequelize(process.env.JAWSDB_URL,);
}
else {
    console.log('CONNECTING TO LOCAL DB')
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;