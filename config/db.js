const mysql2 = require("mysql2/promise");

const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cultivo",
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
