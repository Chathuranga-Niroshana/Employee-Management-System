import express from "express";
import DB from "../database.js";
import cron from "node-cron";

const router = express.Router();

router.get("/", async (req, res) => {
  const resultQuery = "SELECT * FROM message";

  DB.query(resultQuery, (error, result) => {
    if (error) {
      console.log("Error geting messages", error);
      res.status(500).send("Error getting messages");
    } else {
      res.status(201).send(result);
    }
  });
});

// This cron job runs at midnight every day
cron.schedule("0 0 * * *", () => {
  // Calculate the date 1 month ago
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Delete messages older than 1 month from the database
  const deleteQuery = "DELETE FROM message WHERE date < ?";
  DB.query(deleteQuery, [oneMonthAgo], (error, result) => {
    if (error) {
      console.log("Error deleting old messages: ", error);
    } else {
      console.log("Old messages deleted successfully");
    }
  });
});

export default router;
