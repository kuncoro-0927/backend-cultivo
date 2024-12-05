require("dotenv").config();
const mysql2 = require("mysql2/promise");

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Connection Database Success :)");
    connection.release();
  } catch (error) {
    console.error("Database Connection Failed", error);
  }
}

async function query(command, values) {
  try {
    const [rows] = await db.query(command, values ?? []);
    return rows;
  } catch (error) {
    console.error("Query Error: ", error);
    throw error;
  }
}

module.exports = { db, testConnection, query };
