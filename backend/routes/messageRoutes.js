import express from "express";
import DB from "../database.js";

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

router.delete("/" , async (req,res)=>{
  const {id} = req.params
})

export default router;
