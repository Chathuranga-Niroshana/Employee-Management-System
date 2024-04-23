import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const DB = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

DB.connect((error) => {
  if (error) {
    console.log("Error connecting database:", error);
    return;
  }
  console.log("Connected to Database");
});

export default DB;
