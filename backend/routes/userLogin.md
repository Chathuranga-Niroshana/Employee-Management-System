// signup route
router.post("/signup", (req, res) => {
  const newUserQuery =
    "INSERT INTO user (`eid`, `employee_name`, `dob`, `email`, `mobile`, `address`, `password`, `position`, `job`,`department_id`) VALUES (?)";

  bcrypt.hash(req.body.password.toString(), salt, (error, hash) => {
    if (error) {
      return res.status(500).json({ Error: "Hashing error in server" });
    }

    const values = [
      req.body.eid,
      req.body.employee_name,
      req.body.dob,
      req.body.email,
      req.body.mobile,
      req.body.address,
      hash,
      req.body.position,
      req.body.job,
      req.body.department_id,
    ];

    DB.query(newUserQuery, [values], (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ Error: "Inserting data error in server" });
      } else {
        res.status(201).json({ Status: "Success" });
      }
    });
  });
});

// login route
router.post("/login", (req, res) => {
  const userQuery = "SELECT * FROM user WHERE email=?";
  DB.query(userQuery, [req.body.email], (error, data) => {
    if (error) {
      return res.status(500).json({ Error: "Login error in server" });
    }
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (error, response) => {
          if (error) {
            return res.status(500).json({ Error: "Password compair error" });
          }
          if (response) {
            return res.status(201).json({ Status: "Success" });
          } else {
            return res.status(400).json({ Error: "Password not match" });
          }
        }
      );
    } else {
      return res.status(404).json({ Error: "Incorrect emil" });
    }
  });
});


<!-- ================================================= -->
// signup route

router.post("/signup", (req, res) => {
  const newUserQuery =
    "INSERT INTO user (`eid`, `employee_name`, `dob`, `email`, `mobile`, `address`, `password`, `position`, `job`,`department_id`) VALUES (?)";

  const values = [
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

  DB.query(newUserQuery, [values], (error, result) => {
    if (error) {
      console.error("Error creating user:", error);
      return res.status(500).send("Error creating user");
    } else {
      res.status(201).json({ Status: "Success" });
    }
  });
});

// token

const verifyUser = (req, res, next) => {
  const token = req.Cookies.token;
  if (!token) {
    res.status(500).json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (error, decoded) => {
      if (error) {
        res.status(500).json({ Error: "Token is not ok" });
      } else {
        req.eid = decoded.eid;
        next();
      }
    });
  }
};

router.get("/token", verifyUser, (req, res) => {
  return res.status(200).json({ Status: "Success", eid: req.eid });
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
        const eid = data[0].eid;
        const token = jwt.sign({ eid }, "jwt-secret-key", { expiresIn: "1d" });
        res.cookie("token", token);
        return res.status(200).json({ Status: "Success" });
      } else {
        return res.status(401).send("Invalid Password");
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Error logging in");
  }
});
