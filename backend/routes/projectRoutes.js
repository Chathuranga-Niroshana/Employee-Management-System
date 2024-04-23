import express from "express";
import DB from "../database.js";

const router = express.Router();

router.post("/createproject", (req, res) => {
  const resultQuery =
    "INSERT INTO project (`project_id`,`project_name`,`start_date`,`end_date`,`description`,`department_id`,`eid`) VALUES (?,?,?,?,?,?,?)";
  const values = [
    req.body.project_id,
    req.body.project_name,
    req.body.start_date,
    req.body.end_date,
    req.body.description,
    req.body.department_id,
    req.body.eid,
  ];
  DB.query(resultQuery, values, (error, result) => {
    if (error) {
      console.error("Error creating Project:", error);
      return res.status(500).send("Error creating Project");
    } else {
      res.status(201).send("Project created successfully");
    }
  });
});

// view projects
router.get("/", async (req, res) => {
  const resultQuery = "SELECT * FROM project";
  DB.query(resultQuery, (error, result) => {
    if (error) {
      console.error("Error getting projects:", error);
      return res.status(500).send("Error getting projects");
    } else {
      res.status(201).send(result);
    }
  });
});

// get  project by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const resultQuery = "SELECT * FROM project WHERE project_id =? ";
  DB.query(resultQuery, [id], (error, result) => {
    if (error) {
      console.error("Error getting project:", error);
      return res.status(500).send("Error getting project");
    } else {
      res.status(201).send(result);
    }
  });
});

// delete a project
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const resultQuery = "DELETE FROM project WHERE project_id =? ";
  DB.query(resultQuery, [id], (error, result) => {
    if (error) {
      console.error("Error deleting project:", error);
      return res.status(500).send("Error deleting project");
    } else {
      res.status(201).send("project deleted");
    }
  });
});

// update a project
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    project_id,
    project_name,
    start_date,
    end_date,
    description,
    department_id,
    eid,
  } = req.body;
  const resultQuery =
    "UPDATE project SET project_id=? ,project_name=?,start_date=?,end_date=?,description=?,department_id=?,eid=? WHERE project_id =?";
  const values = [
    project_id,
    project_name,
    start_date,
    end_date,
    description,
    department_id,
    eid,
    id,
  ];
  DB.query(resultQuery, values, (error, result) => {
    if (error) {
      console.error("Error updating project:", error);
      return res.status(500).send("Error updating project");
    } else {
      res.status(201).send("project updated");
    }
  });
});

export default router;
