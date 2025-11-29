import {Sequelize} from 'sequelize'
import 'dotenv/config.js'
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbPort = process.env.DB_PORTA
const dbHost =process.env.DB_HOST

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect:"mysql",
    host:dbHost,
    port:dbPort
});

export default sequelize;