import express from "express";
import DB from "../database.js";

const router = express.Router();

// create a department
router.post("/createdepartment", (req, res) => {
  const newDept =
    "INSERT INTO department (`department_id`,`departmant_name`) VALUES (?,?)";
  const values = [req.body.department_id, req.body.departmant_name];

  DB.query(newDept, values, (error, result) => {
    if (error) {
      console.error("Error creating department:", error);
      return res.status(500).send("Error creating department");
    } else {
      res.status(201).send("Department created successfully");
    }
  });
});

// view departments
router.get("/", async (req, res) => {
  const resultQuery = "SELECT * FROM department";
  DB.query(resultQuery, (error, result) => {
    if (error) {
      console.error("Error getting departments:", error);
      return res.status(500).send("Error getting departments");
    } else {
      res.status(201).send(result);
    }
  });
});

// get  dept by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const resultQuery = "SELECT * FROM department WHERE department_id =? ";
  DB.query(resultQuery, [id], (error, result) => {
    if (error) {
      console.error("Error getting department:", error);
      return res.status(500).send("Error getting department");
    } else {
      res.status(201).send(result);
    }
  });
});

// delete a dept
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const resultQuery = "DELETE FROM department WHERE department_id =? ";
  DB.query(resultQuery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting department:", error);
      return res.status(500).send("Error deleting department");
    } else {
      res.status(201).send("department deleted");
    }
  });
});

// update a dept
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { department_id, departmant_name } = req.body;
  const resultQuery =
    "UPDATE department SET department_id=? ,departmant_name=? WHERE department_id = ? ";
  const values = [department_id, departmant_name, id];
  DB.query(resultQuery, values, (error, result) => {
    if (error) {
      console.error("Error updating department:", error);
      return res.status(500).send("Error updating department");
    } else {
      res.status(201).send("department updated");
    }
  });
});

export default router;
