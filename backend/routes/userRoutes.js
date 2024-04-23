import express from "express";
import jwt from "jsonwebtoken";
import DB from "../database.js";

const router = express.Router();
const jwtTokenKey = process.env.JWT_SECRET_KEY;

// signup route
router.post("/signup", (req, res) => {
  const newUserQuery =
    "INSERT INTO user (`eid`, `employee_name`, `dob`, `email`, `mobile`, `address`, `password`, `position`, `job`,`department_id`) VALUES (?)";

  const user = [
    req.body.eid,
    req.body.employee_name,
    req.body.dob,
    req.body.email,
    req.body.mobile,
    req.body.address,
    req.body.password,
    req.body.position,
    req.body.job,
    req.body.department_id,
  ];

  DB.query(newUserQuery, [user], (error, result) => {
    if (error) {
      console.error("Error creating user:", error);
      return res.status(500).send("Error creating user");
    } else {
      const data = {
        user: {
          id: user.eid,
        },
      };
      const token = jwt.sign(data, jwtTokenKey);
      res.status(201).json({ Status: "Success", token });
    }
  });
});

// login route
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    const userQuery = "SELECT * FROM user WHERE email=?";
    DB.query(userQuery, [email], (error, data) => {
      if (error) {
        console.error("Error querying user:", error);
        return res.status(500).send("Error logging in");
      }
      if (data.length === 0) {
        return res.status(404).send("User not found");
      }

      const user = data[0];
      if (password === user.password) {
        const data = {
          user: {
            id: user.eid,
          },
        };

        const token = jwt.sign(data, jwtTokenKey);
        return res.status(200).json({ success: true, token });
      } else {
        return res
          .status(401)
          .json({ success: false, error: "Invalid Password" });
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Error logging in");
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const resultQuery =
      "SELECT eid,employee_name,email,mobile,address,position,job,dob FROM user";
    DB.query(resultQuery, (error, result) => {
      if (error) {
        console.log("Error retriving users: ", error);
        return res.status(500).send(error);
      } else {
        return res.status(200).send(result);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// get one user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultQuery =
      "SELECT eid,employee_name,email,mobile,address,position,job,dob FROM user WHERE eid=?";
    DB.query(resultQuery, [id], (error, result) => {
      if (error) {
        console.log("Error retriving user: ", error);
        return res.status(500).send(error);
      } else {
        return res.status(200).send(result);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// delete a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultQuery = "DELETE FROM user WHERE eid=?";
    DB.query(resultQuery, [id], (error, result) => {
      if (error) {
        console.log("Error deleting user: ", error);
        return res.status(500).send(error);
      } else {
        return res.status(200).send("user deleted.");
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// update a user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      eid,
      employee_name,
      dob,
      email,
      mobile,
      address,
      password,
      position,
      job,
      department_id,
    } = req.body;
    const resultQuery = `UPDATE user SET eid=?, employee_name=?, dob=?, email=?, mobile=?, address=?, password=?, position=?, job=?, department_id=? WHERE eid=?`;
    const values = [
      eid,
      employee_name,
      dob,
      email,
      mobile,
      address,
      password,
      position,
      job,
      department_id,
      id,
    ];
    DB.query(resultQuery, values, (error, result) => {
      if (error) {
        console.log("Error updating user: ", error);
        return res.status(500).send(error);
      } else {
        return res.status(200).send("User updated successfully.");
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default router;
