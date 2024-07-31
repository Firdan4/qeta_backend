import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequalizeConnection = new Sequelize(
  process.env.DEV_DB_NAME as string,
  process.env.DEV_DB_USERNAME as string,
  process.env.DEV_DB_PASSWORD,
  {
    host: process.env.DEV_DB_HOST,
    dialect: "mysql",
  }
);

export default sequalizeConnection;
