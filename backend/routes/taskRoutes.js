import express from "express";
import DB from "../database.js";

const router = express.Router();

// create a task
router.post("/createtask", async (req, res) => {
  const newTask =
    "INSERT INTO task (`task_name`,`task_description`,`date`,`start_time`,`end_time`,`review`,`progress`,`eid`,`project_id`) VALUES (?,?,?,?,?,?,?,?,?)";
  const values = [
    req.body.task_name,
    req.body.task_description,
    req.body.date,
    req.body.start_time,
    req.body.end_time,
    req.body.review,
    req.body.progress,
    req.body.eid,
    req.body.project_id,
  ];
  DB.query(newTask, values, (error, result) => {
    if (error) {
      console.error("Error creating Task:", error);
      return res.status(500).send("Error creating Task");
    } else {
      res.status(201).send("Task created successfully");
    }
  });
});
// get tasks
router.get("/", async (req, res) => {
  const resultQuery = "SELECT * FROM task";
  DB.query(resultQuery, (error, result) => {
    if (error) {
      console.error("Error getting tasks:", error);
      return res.status(500).send("Error getting tasks");
    } else {
      res.status(201).send(result);
    }
  });
});

// get  task by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const resultQuery = "SELECT * FROM task WHERE task_id =? ";
  DB.query(resultQuery, [id], (error, result) => {
    if (error) {
      console.error("Error getting task:", error);
      return res.status(500).send("Error getting task");
    } else {
      res.status(201).send(result);
    }
  });
});

// delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const resultQuery = "DELETE FROM task WHERE task_id =? ";
  DB.query(resultQuery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting task:", error);
      return res.status(500).send("Error deleting task");
    } else {
      res.status(201).send("task deleted");
    }
  });
});

// update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    task_name,
    task_description,
    date,
    start_time,
    end_time,
    review,
    progress,
    eid,
    project_id,
  } = req.body;
  const resultQuery =
    "UPDATE task SET task_name=?,task_description=?,date=?,start_time=?,end_time=?,review=?,progress=?,eid=?,project_id=? WHERE task_id =?";
  const values = [
    task_name,
    task_description,
    date,
    start_time,
    end_time,
    review,
    progress,
    eid,
    project_id,
    id,
  ];
  DB.query(resultQuery, values, (error, result) => {
    if (error) {
      console.error("Error updating task:", error);
      return res.status(500).send("Error updating task");
    } else {
      res.status(201).send("task updated");
    }
  });
});

export default router;
