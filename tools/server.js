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
    alert(err);
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
    role,
    employeeId,
    name,
    username,
    password,
    contact,
    email,
    section,
    position
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
      res.status(200).send({ success: false });
    } else {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        const sql1 =
          "INSERT INTO users (employeeId, name, username, password, contact, email, section, position, role, status) VALUES ?";

        const values = [
          [
            employeeId,
            name,
            username,
            hash,
            contact,
            email,
            section,
            position,
            role,
            "1"
          ]
        ];
        connection.query(sql1, [values], function(err, result) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }

          res.status(200).send({ success: true });
        });
      });
    }
  });
});

// Users Login
router.route("/login/:email/:password").post(function(req, res) {
  let email = req.params.email;
  let password = req.params.password;

  const sql =
    "SELECT users.user_id AS user_id, users.password AS password, users_role.role AS role FROM users JOIN users_role ON users.role = users_role.role_id WHERE email = ?";

  connection.query(sql, [email], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if (rows.length === 0) {
      res.status(404).send("Unrecognized email");
    }

    if (rows.length > 0) {
      bcrypt.compare(password, rows[0].password, function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        if (!result) {
          console.log(result);
          res.status(404).json({ success: false, message: "failed" });
        }

        console.log(result);

        const id = rows[0].user_id.toString();
        const role = rows[0].role;
        const check_session_query =
          "SELECT * FROM users_session WHERE userId = ?";
        connection.query(check_session_query, [id], function(
          err,
          rows,
          fields
        ) {
          if (err) {
            console.log(err);
            res.status(500).send("Server error in checking session");
          }
          console.log(rows);
          if (!rows) {
            const sql1 =
              "INSERT INTO users_session (userId, isDeleted) VALUES ?";
            const values = [[id, 0]];
            connection.query(sql1, [values], function(err, result) {
              if (err) {
                console.log(err);
                res.status(500).send("Server Error inserting new session");
              }

              console.log(result);
              res.status(200).json({
                success: true,
                message: "New User",
                role: role,
                token: id
              });
            });
          }

          if (rows) {
            const update_session =
              "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
            connection.query(update_session, [0, id], function(err, result) {
              if (err) {
                console.log(err);
                res.status(500).json({
                  success: false,
                  message: "Server error in updating session"
                });
              }
              console.log(result);
              if (result) {
                res.status(200).json({
                  success: true,
                  role: role,
                  message: "Record Found, Login Success!",
                  token: id
                });
              }
            });
          }
        });
      });
    }
  });
});

//Users Logout
router.route("/logout/:id").post(function(req, res) {
  let id = req.params.id;

  const sql = "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
  connection.query(sql, [1, id], function(err, result) {
    if (err) {
      res.status(500).send("Server Error...");
    }

    if (result) {
      res.status(200).send("Logout Success...");
    }
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

//Fetch all users
router.route("/getUsers").get(function(req, res) {
  const sql =
    "SELECT users.user_id AS user_id, users.employeeId AS employeeId, users.name AS name, users.username AS username, users.contact AS contact, users.email AS email, users.section AS secid, sections.section AS section, sections.secshort AS secshort, divisions.department AS department, divisions.depshort AS depshort,users.position AS position, users.role AS role_id, users_role.role AS role, users_status.status AS accnt_status FROM users JOIN sections ON users.section = sections.secid JOIN divisions ON sections.divid = divisions.depid JOIN users_role ON users.role = users_role.role_id JOIN users_status ON users.status = users_status.status_id ORDER BY users.name ASC";
  connection.query(sql, function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(rows);
    res.status(200).send(rows);
  });
});

// //Fetch All users by section
router.route("/sectionUser/:section").get(function(req, res) {
  let section = req.params.section;

  const sql =
    "SELECT users.user_id AS user_id, users.employeeId AS employeeId, users.name AS name, users.username AS username, users.password AS password, users.contact AS contact, users.email AS email, users.section AS secid, users.position AS position, users.role AS role, users.status AS status ,sections.section AS section, sections.secshort AS secshort, divisions.department AS department, divisions.depshort AS depshort  FROM users JOIN sections ON users.section = sections.secid JOIN divisions ON sections.divid = divisions.depid WHERE users.section = ? ORDER BY name ASC";
  connection.query(sql, [section], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch Users Data By ID
router.route("/user/:id").get(function(req, res) {
  let id = req.params.id;

  const sql =
    "SELECT users.user_id AS user_id, users.employeeId AS employeeId, users.name AS name, users.username AS username, users.password AS password, users.contact AS contact, users.email AS email, users.section AS secid, users.position AS position, users.role AS role, users.status AS status ,sections.section AS section, sections.secshort AS secshort, divisions.department AS department, divisions.depshort AS depshort  FROM users JOIN sections ON users.section = sections.secid JOIN divisions ON sections.divid = divisions.depid WHERE users.user_id = ?";
  connection.query(sql, [parseInt(id)], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows[0]);
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
    section,
    position,
    role
  } = req.body;

  const sql = "SELECT * FROM users WHERE user_id = ?";
  connection.query(sql, [id], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if (rows.length > 0) {
      const sql1 =
        "UPDATE users SET employeeId = ? , name = ?, username = ?, contact = ?, email = ?, section = ?, position = ?, role = ? WHERE user_id = ?";
      connection.query(
        sql1,
        [
          employeeId,
          name,
          username,
          contact,
          email,
          section,
          position,
          role,
          id
        ],
        function(err, result) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }
          console.log(result);
          res.status(200).send(true);
        }
      );
    }
  });
});

//Update User Role
router.route("/updateRole").post(function(req, res) {
  const { role, id } = req.body;
  const sql = "UPDATE users SET role = ? WHERE user_id = ?";
  connection.query(sql, [role, parseInt(id)], function(err, result) {
    if (err) {
      res.status(500).send("Server Error...");
    }

    res.status(200).send("User role updated...");
  });
});

//Update user Status
router.route("/updateStatus").post(function(req, res) {
  const { status, id } = req.body;

  const sql = "UPDATE users SET status = ? WHERE user_id = ?";
  connection.query(sql, [status, parseInt(id)], function(err, result) {
    if (err) {
      res.status(500).send("Server Error");
    }

    res.status(200).send("Status updated");
  });
});

//Delete User
router.route("/deleteUser").post(function(req, res) {
  const { id } = req.body;
  const sql = "DELETE FROM users WHERE user_id = ?";
  connection.query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
    }

    res.status(200).send("Deleted");
  });
});

//Handle Transfer Office
router.route("/transferOffice").post(function(req, res) {
  const { id, section } = req.body;

  const sql = "UPDATE users SET section = ? WHERE user_id = ?";
  connection.query(sql, [section, parseInt(id)], function(err, result) {
    if (err) {
      // console.log(err);
      res.status(500).send(err);
    }

    // console.log(result);
    res.status(200).send("Transfer Success");
  });
});

//Fetch section by section id
router.route("/sections/:secid").post(function(req, res) {
  const secid = req.params.secid;
  const sql =
    "SELECT sections.section AS section, sections.secshort AS secshort, divisions.department AS department, divisions.depshort AS depshort  FROM sections JOIN divisions ON sections.secid = divisions.depid WHERE sections.secid = ?";
  connection.query(sql, [parseInt(secid)], function(err, rows, fields) {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).send(rows);
  });
});

//Fetch Section
router.route("/sections").get(function(req, res) {
  const sql =
    "SELECT sections.secid AS secid, sections.section AS section, sections.secshort AS secshort, divisions.department AS department, divisions.depshort AS depshort  FROM sections JOIN divisions ON sections.divid = divisions.depid";
  connection.query(sql, function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch Divisions
router.route("/fetchDivisions").get(function(req, res) {
  const sql = "SELECT * FROM divisions";
  connection.query(sql, function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch Division By ID
router.route("/fetchDivisionById/:id").get(function(req, res) {
  let id = req.params.id;
  const sql = "SELECT * FROM divisions WHERE depid= ?";
  connection.query(sql, [parseInt(id)], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(rows);
    res.status(200).send(rows[0]);
  });
});

//Add Division
router.route("/addDivision").post(function(req, res) {
  const { department, depshort, payrollshort } = req.body;
  const sql =
    "INSERT INTO divisions (department, depshort, payrollshort) VALUES ?";
  const values = [[department, depshort, payrollshort]];
  connection.query(sql, [values], function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(result);
    res.status(200).send("success");
  });
});

//Update Division
router.route("/updateDivision/:id").post(function(req, res) {
  let id = req.params.id;
  const { department, depshort, payrollshort } = req.body;
  const sql =
    "UPDATE divisions SET department = ?, depshort = ?, payrollshort = ? WHERE depid = ?";
  connection.query(
    sql,
    [department, depshort, payrollshort, parseInt(id)],
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      console.log(result);
      res.status(200).send("success");
    }
  );
});

router.route("/deleteDivision/:id").post(function(req, res) {
  let id = req.params.id;

  const sql = "DELETE FROM divisions WHERE depid = ?";
  connection.query(sql, [parseInt(id)], function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(result);
    res.status(200).send("success");
  });
});

// ==========================================================================================
// ==========================================================================================
// End Users Data Control
//===========================================================================================
//===========================================================================================

// ==========================================================================================
// ==========================================================================================
// Document Data Control
//===========================================================================================
//===========================================================================================

//Assign Document Tracking ID
router.route("/documentId").get(function(req, res) {
  const sql = "SELECT * FROM documents";

  connection.query(sql, function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if (rows.length > 0) {
      const sql1 =
        "SELECT documentID+1 as documentID FROM documents ORDER BY documentID DESC LIMIT 1";
      connection.query(sql1, function(err, rows, fields) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        console.log(rows);
        res.status(200).send(rows[0]);
      });
    } else {
      console.log(rows);
      const defaultValue = 1000000000;
      res.status(200).send({ documentID: defaultValue });
    }
  });
});

// Fetch Document Type
router.route("/documentType").get(function(req, res) {
  const sql = "SELECT * FROM document_type";
  connection.query(sql, function(err, rows, fields) {
    if (err) {
      res.status(500).send(err);
    }

    res.status(200).send(rows);
  });
});

//Insert New Document
router.route("/addNewDocument").post(function(req, res) {
  const {
    documentID,
    creator,
    subject,
    doc_type,
    note,
    action_req,
    documentLogs
  } = req.body;

  const check = "SELECT * FROM documents WHERE documentID = ?";
  connection.query(check, [documentID], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if (rows.length > 0) {
      const update =
        "UPDATE documents SET creator = ?, subject= ?, doc_type = ?, note = ?, status = ? WHERE documentID = ?";
      connection.query(
        update,
        [creator, subject, doc_type, note, "1", documentID],
        function(err, result) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }

          const draft = "DELETE FROM documentDrafts WHERE documentID = ?";
          connection.query(draft, [documentID], function(err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            }

            const sql =
              "INSERT INTO documentLogs (document_id, user_id, remarks, destinationType, destination, status) VALUES ?";

            connection.query(sql, [documentLogs], function(err, result) {
              if (err) {
                console.log(err);
                res.status(500).send(err);
              }

              console.log(result);
              res.status(200).send(result);
            });
          });
        }
      );
    } else {
      const sql1 =
        "INSERT INTO documents (documentID, creator, subject, doc_type, note, status) VALUES ?";
      const values = [[documentID, creator, subject, doc_type, note, "1"]];
      connection.query(sql1, [values], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        const sql2 =
          "INSERT INTO document_action_req (documentID, action_req) VALUES ?";

        connection.query(sql2, [action_req], function(err, result) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }

          const sql3 =
            "INSERT INTO documentLogs (document_id, user_id, remarks, destinationType, destination, status) VALUES ?";

          connection.query(sql3, [documentLogs], function(err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            }

            console.log(result);
            res.status(200).send(result);
          });
        });
      });
    }
  });
});

//Insert Draft
router.route("/draft").post(function(req, res) {
  const { documentID, creator, subject, doc_type, note, action_req } = req.body;
  const sql =
    "INSERT INTO documents (documentID, creator, subject, doc_type, note, status) VALUES ?";
  const values = [[documentID, creator, subject, doc_type, note, "0"]];
  connection.query(sql, [values], function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    const sql_action_req =
      "INSERT INTO document_action_req (documentID, action_req) VALUES ?";
    connection.query(sql_action_req, [action_req], function(err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      const draft = "INSERT INTO documentDrafts (documentID) VALUES ?";
      const draftVal = [[documentID]];
      connection.query(draft, [draftVal], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        console.log(result);
        res.status(200).send(result);
      });
    });
  });
});

//Get draft by user
router.route("/getDrafts/:user").get(function(req, res) {
  const userID = req.params.user;
  const sql =
    "SELECT documentDrafts.documentID as documentID, documents.subject as subject, document_type.type as doc_type FROM documentDrafts JOIN documents ON documentDrafts.documentID = documents.documentID JOIN document_type ON documents.doc_type = document_type.id WHERE documents.creator = ? AND documents.status = ? ORDER BY documents.date_time_created DESC";

  connection.query(sql, [userID, "0"], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    res.status(200).send(rows);
  });
});

//Fetch Document By ID
router.route("/fetchDocument/:doc_id").get(function(req, res) {
  const doc = req.params.doc_id;
  const sql =
    "SELECT documents.subject as subject, document_type.id as docType_id, document_type.type as type, documents.note FROM documents JOIN document_type ON documents.doc_type = document_type.id WHERE documents.documentID = ?";
  connection.query(sql, [doc], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows[0]);
  });
});

//Fetch  Action Required of Document
router.route("/fetchActionReq/:doc_id").get(function(req, res) {
  const doc = req.params.doc_id;
  const sql = "SELECT * FROM document_action_req WHERE documentID = ?";
  connection.query(sql, [doc], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch Documents of User
router.route("/fetchUserDocuments/:userID").get(function(req, res) {
  const userID = req.params.userID;
  const sql =
    "SELECT documents.documentID as documentID, documents.subject as subject, document_type.id as docType_id, document_type.type as type, documents.note FROM documents JOIN document_type ON documents.doc_type = document_type.id WHERE documents.creator = ? AND documents.status = ?";
  connection.query(sql, [userID, "1"], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch Documents of Section
router.route("/fetchSectionDocuments/:userID").get(function(req, res) {
  const userID = req.params.userID;
  const fetchUser = "SELECT * FROM users WHERE user_id = ?";
  connection.query(fetchUser, [parseInt(userID)], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows[0].section);
    const sql =
      "SELECT documents.documentID as documentID, documents.subject as subject, documents.doc_type as docType_id, documents.note as note, document_type.type as docType,  documents.creator as creatorID, users.name as creator FROM documents JOIN document_type ON documents.doc_type = document_type.id JOIN users ON documents.creator = users.user_id WHERE users.section = ? AND documents.status = ? ORDER BY documents.date_time_created DESC";
    connection.query(sql, [rows[0].section, "1"], function(err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      console.log(rows);
      res.status(200).send(rows);
    });
  });
});

//Fetch Document Destination
router.route("/fetchDocumentDestination/:doc_id").get(function(req, res) {
  const documentID = req.params.doc_id;
  const sql =
    "SELECT DISTINCT documentLogs.destination as destination, documentLogs.user_id as creator,documentStatus.status as documentStatus FROM documentLogs JOIN documentStatus ON documentLogs.status = documentStatus.statid WHERE document_id = ? AND destination != ?";
  connection.query(sql, [documentID, "none"], function(err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

// ==========================================================================================
// ==========================================================================================
// End Document Data Control
//===========================================================================================
//===========================================================================================
app.use("/dts", router);
app.listen(PORT, () => {
  console.log("========================================================");
  console.log("SERVER IS RUNNING ON PORT: " + PORT);
  console.log("========================================================");
});
