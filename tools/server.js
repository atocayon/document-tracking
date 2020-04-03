const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const router = express.Router();
const PORT = 4000;
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose.connect("mongodb://127.0.0.1:27017/dts", { useNewUrlParser: true });
// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("========================================================");
//   console.log("MongoDB database connection established successfully!!!");
//   console.log("========================================================");
// });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "documentTracking"
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  }

  console.log("MySQL database connection established successfully!!!");
});

// ==========================================================================================
// ==========================================================================================
// Document Tracking System Users Data Control
//===========================================================================================
//===========================================================================================

// Add User
router.route("/addUser").post(function(req, res) {
  const { body } = req;
  let {
    employeeId,
    name,
    username,
    password,
    contact,
    email,
    division,
    section,
    position,
    address,
    bdate,
    gender
  } = body;

  email = email.toLowerCase();
  email = email.trim();

  const sql = "SELECT * FROM users WHERE email = ? ";
  connection.query(sql, [email], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.send(err);
    }

    if (rows.length > 0) {
      res.status(409).send("Email is already in used");
    }

    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        res.status(500).send("Error hashing");
      }

      const sql1 =
        "INSERT INTO users (employeeId, name, username, password, contact, email, division, section, position, address, bdate, gender) VALUES ?";

      const values = [
        [
          employeeId,
          name,
          username,
          hash,
          contact,
          email,
          division,
          section,
          position,
          address,
          bdate,
          gender
        ]
      ];
      connection.query(sql1, [values], function(err, result) {
        if (err) {
          res.status(500).send(err);
        }

        res.status(200).send("Registration successful" + result);
      });
    });
  });
});

// Users Login
router.route("/login/:email/:password").post(function(req, res) {
  let email = req.params.email;
  let password = req.params.password;

  const sql = "SELECT * FROM users WHERE email = ?";

  connection.query(sql, [email], function(err, rows, fields) {
    if (err) {
      res.status(500).send("Server Error");
    }

    if (rows.length === 0) {
      res.status(404).send("Unrecognized email");
    }

    bcrypt.compare(password, rows[0].password, function(err, result) {
      if (err) {
        res.status(500).send("Server Error");
      }

      if (!result) {
        res.status(404).send("Unrecognized password");
      }

      const id = rows[0].user_id.toString();

      const check_session_query = "SELECT * FROM users_session WHERE userId = ?";
      connection.query(check_session_query, [id], function(err, rows, fields) {
        if (err) {
          res.status(500).json({
            success: false,
            message: "Server error in checking session"
          });
        }

        if (!rows) {

          const sql1 = "INSERT INTO users_session (userId, isDeleted) VALUES ?";
          const values = [[id, 0]];
          connection.query(sql1, [values], function(err, result) {
            if (err) {
              res.status(500).send("Server Error inserting new session");
            }

            res
                .status(200)
                .json({ success: true, message: "New User", token: id });
          });


        }

        if (rows){
          const update_session =
              "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
          connection.query(update_session, [0, id], function(err, result) {
            if (err) {
              res.status(500).json({
                success: false,
                message: "Server error in updating session"
              });
            }

            if (result) {
              res.status(200).json({
                success: true,
                message: "Record Found, Login Success!",
                token: id
              });
            }
          });
        }



      });
    });
  });
});

//Verify User Token
router.route("/varifyToken/:token").get(function(req, res) {
  let token = req.params.token;

  const sql = "SELECT * FROM users_session WHERE userId = ? AND isDeleted = ?";
  connection.query(sql, [token, 0], function(err, rows, fields) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error selecting user session"
      });
    }

    if (rows) {
      res.status(200).json({ success: true, message: "Valid" });
    } else {
      res.status(404).json({ success: false, message: "Invalid" });
    }
  });
});

// //Fetch all users
router.route("/getUsers").get(function(req, res) {
  const sql = "SELECT * FROM users";
  connection.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server Error in fetching data in users table"
      });
    }

    res.status(200).send(rows[0]);
  });
});

// //Fetch All users by section
router.route("/sectionUser/:section").get(function(req, res) {
  let section = req.params.section;

  const sql = "SELECT * FROM users WHERE section = ?";
  connection.query(sql, section, function(err, rows, fields) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error in fetching data in users table"
      });
    }

    res.status(200).send(rows[0]);
  });
});

//Fetch Users Data By ID
router.route("/user/:id").get(function(req, res) {
  let id = req.params.id;

  const sql = "SELECT * FROM users WHERE user_id = ?";
  connection.query(sql, id, function(err, rows, fields) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error in fetching data in users table"
      });
    }

    if (!rows) {
      res.status(404).json({ success: false, message: "No Records Found" });
    }

    if (rows){
      res.status(200).send(rows[0]);
    }


  });
});

//Update Users Info
router.route("/updateUser/:id").post(function(req, res) {
  let id = req.params.id;
  const {
    employeeId,
    name,
    username,
    contact,
    email,
    division,
    section,
    position,
    address,
    bdate,
    gender
  } = req.body;
  const sql = "SELECT * FROM users WHERE user_id = ?";
  connection.query(sql, id, function(err, rows, fields) {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Server error in updating user info"
      });
    }

    if (rows.length > 0) {
      const sql1 =
        "UPDATE users SET employeeId = ? , name = ?, username = ?, contact = ?, email = ?, division = ?, section = ?, position = ?, address = ?, bdate = ?, gender = ?";
      connection.query(
        sql1,
        [
          employeeId,
          name,
          username,
          contact,
          email,
          division,
          section,
          position,
          address,
          bdate,
          gender
        ],
        function(err, result) {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Server error in updating users data"
            });
          }

          res.status(200).send("update success");
        }
      );
    }
  });
});
// ==========================================================================================
// ==========================================================================================
// End Users Data Control
//===========================================================================================
//===========================================================================================

app.use("/dts", router);
app.listen(PORT, () => {
  console.log("========================================================");
  console.log("SERVER IS RUNNING ON PORT: " + PORT);
  console.log("========================================================");
});
