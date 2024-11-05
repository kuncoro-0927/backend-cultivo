import { Sequelize } from "sequelize";

const db = new Sequelize("cultivo", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
