const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/dts", router);

server.listen(PORT, () => {
  console.log("========================================================");
  console.log("SERVER IS RUNNING ON PORT: " + PORT);
  console.log("========================================================");
});

// mongoose.connect("mongodb://127.0.0.1:27017/dts", { useNewUrlParser: true });
// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("========================================================");
//   console.log("MongoDB database connection established successfully!!!");
//   console.log("========================================================");
// });

const connection = mysql.createConnection({
  user: "root",
  password: "",
  database: "documentTracking",
  host: "localhost",
  port: "3306",
});

connection.connect(function (err) {
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

io.on("connection", (socket) => {
  //Login
  socket.on("login", (email, password, callback) => {
    login(email, password, callback);
  });

  //Logout
  socket.on("logout", (id, callback) => {
    logout(id, callback);
  });

  //active users list
  socket.on("active_users", fetchUserActiveList);

  //Add User
  socket.on(
    "addUser",
    (
      role,
      employeeId,
      name,
      username,
      password,
      contact,
      email,
      section,
      position
    ) => {
      addUser(
        role,
        employeeId,
        name,
        username,
        password,
        contact,
        email,
        section,
        position
      );
    }
  );

  //Fetch All Users
  socket.on("getAllUsers", Users);

  //Fetch document Logs
  socket.on("getDocumentLogs", getDocLogs);

  //Assign Document tracking number
  socket.on("assignTrackingNum", assignTrackingNum);

  //Insert Document
  socket.on(
    "addDocument",
    (
      documentID,
      creator,
      subject,
      doc_type,
      note,
      action_req,
      documentLogs,
      callback
    ) => {
      insertDocument(
        documentID,
        creator,
        subject,
        doc_type,
        note,
        action_req,
        documentLogs,
        callback
      );
    }
  );

  //Expand/dropdown in doc logs
  socket.on("expandDocLogs", (doc_id, status) => {
    expandDogLogs(doc_id, status, socket);
  });

  //Receive Documents
  socket.on(
    "receiveDocument",
    (documentTracking, user_id, user_section, callback) => {
      receiveDocument(
        documentTracking,
        user_id,
        user_section,
        callback,
        socket
      );
    }
  );

  //Track Document
  socket.on("tracking", (data) => {
    trackDocument(data);
  });

  //Count Pending
  socket.on("countPending", (user_id) => {
    countPending(user_id, socket);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
    socket.emit("Hey, are you still there?");
  });
});

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

//Add User
const addUser = (
  role,
  employeeId,
  name,
  username,
  password,
  contact,
  email,
  section,
  position
) => {
  email = email.toLowerCase();
  email = email.trim();

  const sql = "SELECT * FROM users WHERE email = ? ";
  connection.query(sql, [email], function (err, rows, fields) {
    if (err) {
      console.log(err);
    }
    console.log(rows);
    if (rows.length > 0) {
      // res.status(200).send({ success: "failed" });
      console.log("failed");
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          console.log(err);
          // res.status(500).send(err);
        }
        let sql1 = "";
        sql1 += "INSERT INTO users ";
        sql1 +=
          "(employeeId, name, username, password, contact, email, section, position, role, status) ";
        sql1 += "VALUES ?";

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
            "1",
          ],
        ];
        connection.query(sql1, [values], function (err, result) {
          if (err) {
            console.log(err);
            // res.status(500).send(err);
          }
          console.log(result);
          // res.status(200).send({ success: "success" });
          Users();
        });
      });
    }
  });
};

//Fetch All Users Query
const Users = () => {
  let sql = "";
  sql += "SELECT users.user_id AS user_id, ";
  sql += "users.employeeId AS employeeId, ";
  sql += "users.name AS name, ";
  sql += "users.username AS username, ";
  sql += "users.contact AS contact, ";
  sql += "users.email AS email, ";
  sql += "users.section AS secid, ";
  sql += "sections.section AS section, ";
  sql += "sections.secshort AS secshort, ";
  sql += "divisions.department AS department, ";
  sql += "divisions.depshort AS depshort, ";
  sql += "users.position AS position, ";
  sql += "users.role AS role_id, ";
  sql += "users_role.role AS role, ";
  sql += "users_status.status AS accnt_status ";
  sql += "FROM users ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "JOIN divisions ";
  sql += "ON sections.divid = divisions.depid ";
  sql += "JOIN users_role ";
  sql += "ON users.role = users_role.role_id ";
  sql += "JOIN users_status ";
  sql += "ON users.status = users_status.status_id ";
  sql += "ORDER BY users.user_id ASC ";
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }
    io.emit("users", rows);
  });
};

//Fetch Document Logs Query
const getDocLogs = (socket) => {
  let sql = "";
  sql += "SELECT documentLogs.document_id AS trans_id, ";
  sql += "users.name AS name, ";
  sql += "documentLogs.remarks AS remarks, ";
  sql += "documentLogs.destinationType AS destinationType, ";
  sql += "documentLogs.destination AS destination, ";
  sql += "documentStatus.status AS status, ";
  sql +=
    "DATE_FORMAT(documentLogs.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS date_time ";
  sql += "FROM documents ";
  sql +=
    "JOIN (SELECT MAX(trans_id) as trans, document_id, remarks, destinationType, destination, date_time, user_id,status ";
  sql +=
    "FROM documentLogs GROUP BY document_id) AS documentLogs on documents.documentID = documentLogs.document_id ";
  sql += "JOIN users ";
  sql += "ON documentLogs.user_id = users.user_id ";
  sql += "JOIN documentStatus ";
  sql += "ON documentLogs.status = documentStatus.statid ";
  sql += "ORDER BY documentLogs.date_time DESC ";

  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }

    io.emit("docLogs", rows);
  });
};

const expandDogLogs = (doc_id, status, socket) => {
  let sql = "";
  sql += "SELECT documentLogs.document_id AS trans_id, ";
  sql += "users.name AS name, ";
  sql += "documentLogs.remarks AS remarks,  ";
  sql += "documentLogs.destinationType AS destinationType, ";
  sql += "documentLogs.destination AS destination, ";
  sql += "documentStatus.status AS status, ";
  sql +=
    "DATE_FORMAT(documentLogs.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS date_time ";
  sql += "FROM documentLogs ";
  sql += "JOIN documents ";
  sql += "ON documentLogs.document_id = documents.documentID ";
  sql += "JOIN users ";
  sql += "ON documentLogs.user_id = users.user_id ";
  sql += "JOIN documentStatus ";
  sql += "ON documentLogs.status = documentStatus.statid ";
  sql += "WHERE documentLogs.document_id = ? AND documentStatus.status != ?";
  sql += "ORDER BY documentLogs.date_time ASC ";
  connection.query(sql, [doc_id, status], function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(rows);
    socket.emit("expandedDoc", rows);
  });
};

//Assign Document Tracking ID
const assignTrackingNum = () => {
  const sql = "SELECT * FROM documents";
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }

    if (rows.length > 0) {
      const sql1 =
        "SELECT documentID+1 as documentID FROM documents ORDER BY documentID DESC LIMIT 1";
      connection.query(sql1, function (err, rows, fields) {
        if (err) {
          console.log(err);
          throw err;
        }

        io.emit("documentId", rows[0]);
      });
    } else {
      console.log(rows);
      const defaultValue = 1000000000;
      io.emit("documentId", { documentID: defaultValue });
    }
  });
};

//Inserting new document
const insertDocument = (
  documentID,
  creator,
  subject,
  doc_type,
  note,
  action_req,
  documentLogs,
  callback
) => {
  const check = "SELECT * FROM documents WHERE documentID = ?";
  connection.query(check, [parseInt(documentID)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (rows.length > 0) {
      const update =
        "UPDATE documents SET creator = ?, subject= ?, doc_type = ?, note = ?, status = ? WHERE documentID = ?";
      connection.query(
        update,
        [creator, subject, doc_type, note, "1", parseInt(documentID)],
        function (err, result) {
          if (err) {
            console.log(err);
            return callback("server error");
          }

          let sql = "";
          sql += "INSERT INTO documentLogs ";
          sql += "(document_id, ";
          sql += "user_id, ";
          sql += "remarks, ";
          sql += "destinationType, ";
          sql += "destination, ";
          sql += "status, ";
          sql += "notification, level, ref) ";
          sql += "VALUES ? ";

          connection.query(sql, [documentLogs], function (err, result) {
            if (err) {
              console.log(err);
              return callback("server error");
            }

            getDocLogs();
            assignTrackingNum();
          });
        }
      );
    }
    if (rows.length === 0) {
      const sql1 =
        "INSERT INTO documents (documentID, creator, subject, doc_type, note, status) VALUES ?";
      const values = [
        [parseInt(documentID), creator, subject, doc_type, note, "1"],
      ];
      connection.query(sql1, [values], function (err, result) {
        if (err) {
          console.log(err);
        }

        const sql2 =
          "INSERT INTO document_action_req (documentID, action_req) VALUES ?";

        connection.query(sql2, [action_req], function (err, result) {
          if (err) {
            console.log(err);
          }

          const sql3 =
            "INSERT INTO documentLogs (document_id, user_id, remarks, destinationType, destination, status, notification, level, ref) VALUES ?";

          connection.query(sql3, [documentLogs], function (err, result) {
            if (err) {
              console.log(err);
            }

            getDocLogs();
            assignTrackingNum();
          });
        });
      });
    }
  });
};

const receiveDocument = (
  documentTracking,
  user_id,
  user_section,
  callback,
  socket
) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  const sql = "SELECT * FROM documentLogs WHERE document_id = ?";

  connection.query(sql, [documentTracking], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        if (
            rows[i].destinationType === "Internal" &&
            rows[i].status === "1" &&
            rows[i].user_id === user_id &&
            rows[i].user_id === user_id &&
            rows[i].notification === "0"
        ) {
          console.log("gn receive na ini");
          callback("failed");
          break;
        }
        if (
          rows[i].destinationType === "External" &&
          rows[i].user_id === user_id &&
          rows[i].status === "2"
        ) {
          let currentDocLevel = rows[i].level;
          let ref = rows[i].trans_id;
          const insertExternal =
            "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time, level, ref) VALUES ?";
          const val = [
            [
              documentTracking,
              user_id,
              "none",
              "External",
              "none",
              "1",
              "0",
              dateTime,
              currentDocLevel,
              ref,
            ],
          ];
          connection.query(insertExternal, [val], function (err, result) {
            if (err) {
              console.log(err);
              return callback("server error");
            }
            countPending(user_id, socket);
            trackDocument(documentTracking);
            return callback("success");
          });
          break;
        }

        if (
          rows[i].destinationType === "Internal" &&
          rows[i].destination === user_section &&
          rows[i].status === "2" &&
          rows[i].notification === "0"
        ) {
          let currentDocLevel = rows[i].level;
          let ref = rows[i].trans_id;
          let insertInternal = "";
          insertInternal += "INSERT INTO documentLogs ";
          insertInternal += "(document_id, ";
          insertInternal += "user_id, ";
          insertInternal += "remarks, ";
          insertInternal += "destinationType, ";
          insertInternal += "destination, ";
          insertInternal += "status, ";
          insertInternal += "notification, date_time,level, ref) ";
          insertInternal += "VALUES ? ";
          const val1 = [
            [
              documentTracking,
              user_id,
              "none",
              "Internal",
              "none",
              "1",
              "0",
              dateTime,
              currentDocLevel,
              ref,
            ],
          ];
          connection.query(insertInternal, [val1], function (err, result) {
            if (err) {
              console.log(err);
              return callback("server error");
            }

            const update = "UPDATE documentLogs SET notification =  ? WHERE status = ? AND destination = ? AND document_id = ?";
            connection.query(update, ["1", "2",user_section, documentTracking], function (err, result) {
              if (err) {
                console.log(err);
                return callback("server error");
              }

              countPending(user_id, socket);
              trackDocument(documentTracking);
              return callback("success");
            });

          });
          break;
        }

      }
    }
  });
};

//Count Pending
const countPending = (user_id, socket) => {
  const sql =
    "SELECT * FROM documentLogs WHERE user_id = ? AND status = ? AND notification = ?";
  connection.query(sql, [user_id, "1", "0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }

    socket.emit("pendings", rows.length);
  });
};

//Track Document
const trackDocument = (data) => {
  let sql = "";
  sql += "SELECT ";
  sql += "documentLogs.trans_id  AS trans_id, ";
  sql += "documentLogs.document_id AS document_id, ";
  sql += "users.name AS name,  ";
  sql += "users.position AS position, ";
  sql += "sections.secshort AS secshort, ";
  sql += "documentLogs.remarks AS remarks, ";
  sql += "documentLogs.destination  AS destination, ";
  sql += "documentStatus.status AS status, ";
  sql += "users.name AS operator, ";
  sql += "documentLogs.ref AS ref_id, ";
  sql +=
    "DATE_FORMAT(documentLogs.date_time, '%M %d, %Y @ %h:%i %p') AS date_time ";
  sql += "FROM documentLogs ";
  sql += "JOIN users ";
  sql += "ON documentLogs.user_id = users.user_id ";
  sql += "JOIN documentStatus ";
  sql += "ON documentLogs.status = documentStatus.statid ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "WHERE documentLogs.document_id = ? ";
  sql += "AND documentLogs.ref = ? ";
  sql += "ORDER BY documentLogs.trans_id DESC";
  connection.query(sql, [data, "0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }

    io.emit("track", rows);
  });
};

//Fetch sub document
router.route("/fetchSubDocument").post(function (req, res) {
  const { trans_id, tracking } = req.body;
  let sql = "";
  sql += "SELECT ";
  sql += "documentLogs.trans_id  AS trans_id, ";
  sql += "documentLogs.document_id AS document_id, ";
  sql += "users.name AS name,  ";
  sql += "users.position AS position, ";
  sql += "sections.secshort AS secshort, ";
  sql +=
    "DATE_FORMAT(documentLogs.date_time, '%M %d, %Y @ %h:%i %p') AS date_time , ";
  sql += "documentLogs.remarks AS remarks, ";
  sql += "documentLogs.destination AS destination, ";
  sql += "documentStatus.status AS status, ";
  sql += "users.name AS operator ";
  sql += "FROM documentLogs ";
  sql += "JOIN users ";
  sql += "ON documentLogs.user_id = users.user_id ";
  sql += "JOIN documentStatus ";
  sql += "ON documentLogs.status = documentStatus.statid ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "WHERE documentLogs.document_id = ? ";
  sql += "AND documentLogs.ref = ? ";
  sql += "ORDER BY documentLogs.trans_id ASC";
  connection.query(sql, [tracking, trans_id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    res.status(200).send(rows);
  });
});

const login = (email, password, callback) => {
  let sql = "";
  sql += "SELECT ";
  sql += "users.user_id AS user_id, ";
  sql += "users.name AS name, ";
  sql += "users.password AS password, ";
  sql += "users_role.role AS role ";
  sql += "FROM users ";
  sql += "JOIN users_role ";
  sql += "ON users.role = users_role.role_id ";
  sql += "WHERE email = ? ";

  connection.query(sql, [email], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (rows.length === 0) {
      return callback("unrecognize email");
    }

    if (rows.length > 0) {
      bcrypt.compare(password, rows[0].password, function (err, result) {
        if (err) {
          console.log(err);
          return callback("server error");
        }

        if (!result) {
          console.log(result);
          return callback("incorrect password");
        }

        console.log(result);

        const id = rows[0].user_id;
        const role = rows[0].role;
        const name = rows[0].name;
        const data = { id, name };
        const check_session_query =
          "SELECT * FROM users_session WHERE userId = ?";
        connection.query(check_session_query, [id], function (
          err,
          rows,
          fields
        ) {
          if (err) {
            console.log(err);
            return callback("server error");
          }
          console.log(rows);
          if (rows.length === 0) {
            const sql1 =
              "INSERT INTO users_session (userId, isDeleted) VALUES ?";
            const values = [[id, 0]];
            connection.query(sql1, [values], function (err, result) {
              if (err) {
                console.log(err);
                return callback("server error");
              }
              fetchUserActiveList();
              return callback(data);
            });
          }

          if (rows) {
            const update_session =
              "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
            connection.query(update_session, [0, id], function (err, result) {
              if (err) {
                console.log(err);
                return callback("server error");
              }
              console.log(result);
              if (result) {
                fetchUserActiveList();
                return callback(data);
              }
            });
          }
        });
      });
    }
  });
};

const logout = (id, callback) => {
  const sql = "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
  connection.query(sql, ["1", id], async function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (result) {
      await fetchUserActiveList();
      return callback("logout");
    }
  });
};

//Active user list
const fetchUserActiveList = () => {
  let sql = "";
  sql += "SELECT CONVERT(users.user_id, CHAR) as user_id, users.name AS name, ";
  sql += "users.position AS position, ";
  sql += "users_session.timeStamp AS timeStamp ";
  sql += "FROM users_session ";
  sql += "JOIN users ";
  sql += "ON users_session.userId = users.user_id ";
  sql += "WHERE users_session.isDeleted = ? ";
  sql += "ORDER BY users_session.timeStamp ASC";

  connection.query(sql, ["0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
    }

    io.emit("activeUsers", rows);
  });
};

//Verify User Token
const verifyToken = (token, callback, socket) => {
  const sql = "SELECT * FROM users_session WHERE userId = ?";
  connection.query(sql, [token], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    console.log(rows[0]);
    socket.emit("verifiedToken", rows[0]);
  });
};
router.route("/verifyToken/:token").get(function (req, res) {
  let token = req.params.token;

  const sql = "SELECT * FROM users_session WHERE userId = ?";
  connection.query(sql, [token], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows[0]);
    res.status(200).send(rows[0]);
  });
});

//Fetch All users by section
const fetchSectionUser = (section, callback, socket) => {
  let sql = "";
  sql += "SELECT users.user_id AS user_id, ";
  sql += "users.employeeId AS employeeId, ";
  sql += "users.name AS name, ";
  sql += "users.username AS username, ";
  sql += "users.password AS password, ";
  sql += "users.contact AS contact, ";
  sql += "users.email AS email, ";
  sql += "users.section AS secid, ";
  sql += "users.position AS position, ";
  sql += "users.role AS role, ";
  sql += "users.status AS status, ";
  sql += "sections.section AS section, ";
  sql += "sections.secshort AS secshort, ";
  sql += "divisions.department AS department, ";
  sql += "divisions.depshort AS depshort ";
  sql += "FROM users ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "JOIN divisions ";
  sql += "ON sections.divid = divisions.depid ";
  sql += "WHERE users.section = ? ORDER BY name ASC ";

  connection.query(sql, [section], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    console.log(rows);
    io.emit("sectionUsers", rows);
  });
};
router.route("/sectionUser/:section").get(function (req, res) {
  let section = req.params.section;

  let sql = "";
  sql += "SELECT users.user_id AS user_id, ";
  sql += "users.employeeId AS employeeId, ";
  sql += "users.name AS name, ";
  sql += "users.username AS username, ";
  sql += "users.password AS password, ";
  sql += "users.contact AS contact, ";
  sql += "users.email AS email, ";
  sql += "users.section AS secid, ";
  sql += "users.position AS position, ";
  sql += "users.role AS role, ";
  sql += "users.status AS status, ";
  sql += "sections.section AS section, ";
  sql += "sections.secshort AS secshort, ";
  sql += "divisions.department AS department, ";
  sql += "divisions.depshort AS depshort ";
  sql += "FROM users ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "JOIN divisions ";
  sql += "ON sections.divid = divisions.depid ";
  sql += "WHERE users.section = ? ORDER BY name ASC ";
  connection.query(sql, [section], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch Users Data By ID
const fetchUserData = (id, callback, socket) => {
  let sql = "";
  sql += "SELECT users.user_id AS user_id, ";
  sql += "users.employeeId AS employeeId, ";
  sql += "users.name AS name, ";
  sql += "users.username AS username, ";
  sql += "users.password AS password, ";
  sql += "users.contact AS contact, ";
  sql += "users.email AS email, ";
  sql += "users.section AS secid, ";
  sql += "users.position AS position, ";
  sql += "users_role.role AS role, ";
  sql += "users_role.role_id AS role_id, ";
  sql += "users.status AS status, ";
  sql += "sections.section AS section, ";
  sql += "sections.secshort AS secshort, ";
  sql += "divisions.department AS department, ";
  sql += "divisions.depshort AS depshort ";
  sql += "FROM users ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "JOIN divisions ";
  sql += "ON sections.divid = divisions.depid ";
  sql += "JOIN users_role ";
  sql += "ON users.role = users_role.role_id ";
  sql += "WHERE users.user_id = ? ";

  connection.query(sql, [parseInt(id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    console.log(rows);
    socket.emit("userData", rows[0]);
  });
};
router.route("/user/:id").get(function (req, res) {
  let id = req.params.id;

  let sql = "";
  sql += "SELECT users.user_id AS user_id, ";
  sql += "users.employeeId AS employeeId, ";
  sql += "users.name AS name, ";
  sql += "users.username AS username, ";
  sql += "users.password AS password, ";
  sql += "users.contact AS contact, ";
  sql += "users.email AS email, ";
  sql += "users.section AS secid, ";
  sql += "users.position AS position, ";
  sql += "users_role.role AS role, ";
  sql += "users_role.role_id AS role_id, ";
  sql += "users.status AS status, ";
  sql += "sections.section AS section, ";
  sql += "sections.secshort AS secshort, ";
  sql += "divisions.department AS department, ";
  sql += "divisions.depshort AS depshort ";
  sql += "FROM users ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "JOIN divisions ";
  sql += "ON sections.divid = divisions.depid ";
  sql += "JOIN users_role ";
  sql += "ON users.role = users_role.role_id ";
  sql += "WHERE users.user_id = ? ";
  connection.query(sql, [parseInt(id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows[0]);
  });
});

//Update Users Info
const updateUserInfo = (
  employeeId,
  name,
  username,
  contact,
  email,
  section,
  position,
  role,
  callback,
  socket
) => {
  const sql = "SELECT * FROM users WHERE user_id = ?";
  connection.query(sql, [parseInt(employeeId)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (rows.length > 0) {
      let sql1 = "";
      sql1 += "UPDATE users ";
      sql1 += "SET employeeId = ? , ";
      sql1 += "name = ?, ";
      sql1 += "username = ?, ";
      sql1 += "contact = ?, ";
      sql1 += "email = ?, ";
      sql1 += "section = ?, ";
      sql1 += "position = ?, ";
      sql1 += "role = ? ";
      sql1 += "WHERE user_id = ? ";
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
          employeeId,
        ],
        function (err, result) {
          if (err) {
            console.log(err);
            return callback("server error");
          }
          console.log(result);
          return callback("success");
        }
      );
    }
  });
};
router.route("/updateUser/:id").post(function (req, res) {
  let id = req.params.id;
  const {
    employeeId,
    name,
    username,
    contact,
    email,
    section,
    position,
    role,
  } = req.body;

  const sql = "SELECT * FROM users WHERE user_id = ?";
  connection.query(sql, [id], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if (rows.length > 0) {
      let sql1 = "";
      sql1 += "UPDATE users ";
      sql1 += "SET employeeId = ? , ";
      sql1 += "name = ?, ";
      sql1 += "username = ?, ";
      sql1 += "contact = ?, ";
      sql1 += "email = ?, ";
      sql1 += "section = ?, ";
      sql1 += "position = ?, ";
      sql1 += "role = ? ";
      sql1 += "WHERE user_id = ? ";
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
          id,
        ],
        function (err, result) {
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
const updateUserRole = (role, id, callback, socket) => {
  const sql = "UPDATE users SET role = ? WHERE user_id = ?";
  connection.query(sql, [role, parseInt(id)], function (err, result) {
    if (err) {
      return callback("server error");
    }

    return callback("updated");
  });
};
router.route("/updateRole").post(function (req, res) {
  const { role, id } = req.body;
  const sql = "UPDATE users SET role = ? WHERE user_id = ?";
  connection.query(sql, [role, parseInt(id)], function (err, result) {
    if (err) {
      res.status(500).send("Server Error...");
    }

    res.status(200).send("User role updated...");
  });
});

//Update user Status
const updateUserStatus = (status, id, callback, socket) => {
  const sql = "UPDATE users SET status = ? WHERE user_id = ?";
  connection.query(sql, [status, parseInt(id)], function (err, result) {
    if (err) {
      return callback("server error");
    }

    return callback("updated");
  });
};
router.route("/updateStatus").post(function (req, res) {
  const { status, id } = req.body;

  const sql = "UPDATE users SET status = ? WHERE user_id = ?";
  connection.query(sql, [status, parseInt(id)], function (err, result) {
    if (err) {
      res.status(500).send("Server Error");
    }

    res.status(200).send("Status updated");
  });
});

//Delete User
const deleteUser = (id, callback, socket) => {
  const sql = "DELETE FROM users WHERE user_id = ?";
  connection.query(sql, [id], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback("deleted");
  });
};
router.route("/deleteUser").post(function (req, res) {
  const { id } = req.body;
  const sql = "DELETE FROM users WHERE user_id = ?";
  connection.query(sql, [id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send("Server error");
    }

    res.status(200).send("Deleted");
  });
});

//Handle Transfer Office
const userTransferOffice = (section, id, callback, socket) => {
  const sql = "UPDATE users SET section = ? WHERE user_id = ?";
  connection.query(sql, [section, parseInt(id)], function (err, result) {
    if (err) {
      return callback("server error");
    }

    // console.log(result);
    return callback("success");
  });
};

router.route("/transferOffice").post(function (req, res) {
  const { id, section } = req.body;

  const sql = "UPDATE users SET section = ? WHERE user_id = ?";
  connection.query(sql, [section, parseInt(id)], function (err, result) {
    if (err) {
      // console.log(err);
      res.status(500).send(err);
    }

    // console.log(result);
    res.status(200).send("Transfer Success");
  });
});

//Fetch section by section id
const fetchSectionById = (secid, callback) => {
  let sql = "";
  sql += "SELECT sections.secid AS secid, ";
  sql += "sections.divid AS divid, ";
  sql += "sections.section AS section, ";
  sql += "sections.secshort AS secshort, ";
  sql += "divisions.department AS department, ";
  sql += "divisions.depshort AS depshort ";
  sql += "FROM sections ";
  sql += "JOIN divisions ";
  sql += "ON sections.divid = divisions.depid ";
  sql += "WHERE sections.secid = ? ";
  connection.query(sql, [parseInt(secid)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    console.log(rows[0]);
    io.emit("sectionInfoById", rows[0]);
  });
};
router.route("/sections/:secid").post(function (req, res) {
  const secid = req.params.secid;
  let sql = "";
  sql += "SELECT sections.secid AS secid, ";
  sql += "sections.divid AS divid, ";
  sql += "sections.section AS section, ";
  sql += "sections.secshort AS secshort, ";
  sql += "divisions.department AS department, ";
  sql += "divisions.depshort AS depshort ";
  sql += "FROM sections ";
  sql += "JOIN divisions ";
  sql += "ON sections.divid = divisions.depid ";
  sql += "WHERE sections.secid = ? ORDER BY sections.section ASC";
  connection.query(sql, [parseInt(secid)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(rows[0]);
    res.status(200).send(rows[0]);
  });
});

//Fetch Sections
const fetchSections = (socket) => {
  let sql = "";
  sql += "SELECT sections.divid AS divid, ";
  sql += "sections.secid AS secid, ";
  sql += "sections.section AS section, ";
  sql += "sections.secshort AS secshort, ";
  sql += "sections.active AS active, ";
  sql += "divisions.department AS department, ";
  sql += "divisions.depshort AS depshort ";
  sql += "FROM sections ";
  sql += "JOIN divisions ";
  sql += "ON sections.divid = divisions.depid ";
  sql += "ORDER BY sections.section ASC ";

  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
    }

    console.log(rows);
    io.emit("sections", rows);
  });
};
router.route("/sections").get(function (req, res) {
  let sql = "";
  sql += "SELECT sections.divid AS divid, ";
  sql += "sections.secid AS secid, ";
  sql += "sections.section AS section, ";
  sql += "sections.secshort AS secshort, ";
  sql += "sections.active AS active, ";
  sql += "divisions.department AS department, ";
  sql += "divisions.depshort AS depshort ";
  sql += "FROM sections ";
  sql += "JOIN divisions ";
  sql += "ON sections.divid = divisions.depid ";
  sql += "ORDER BY sections.section ASC ";
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Add New Section
const addNewSection = (division, section, secshort, callback) => {
  const sql =
    "INSERT INTO sections (divid, section, secshort, active) VALUES ?";
  const values = [[division, section, secshort, 1]];
  connection.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return callback("sever error");
    }

    console.log(result);
    fetchSections();
    return callback("success");
  });
};
router.route("/addNewSection").post(function (req, res) {
  const { division, section, secshort } = req.body;
  const sql =
    "INSERT INTO sections (divid, section, secshort, active) VALUES ?";
  const values = [[division, section, secshort, 1]];
  connection.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(result);
    res.status(200).send("success");
  });
});

//Update Section
const updateSection = (secid, divid, section, secshort, callback, socket) => {
  const sql =
    "UPDATE sections SET divid = ?, section = ?, secshort = ?, active = ? WHERE secid = ?";
  connection.query(
    sql,
    [parseInt(divid), section, secshort, 1, parseInt(secid)],
    function (err, result) {
      if (err) {
        console.log(err);
        return callback("server error");
      }

      console.log(result);
      fetchSectionById(secid, callback);
      return callback("updated");
    }
  );
};
router.route("/updateSection").post(function (req, res) {
  const { secid, divid, section, secshort } = req.body;
  const sql =
    "UPDATE sections SET divid = ?, section = ?, secshort = ?, active = ? WHERE secid = ?";
  connection.query(
    sql,
    [parseInt(divid), section, secshort, 1, parseInt(secid)],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      console.log(result);
      res.status(200).send(result);
    }
  );
});

//DELETE SECTION
const deleteSection = (id, callback) => {
  const sql = "DELETE FROM sections WHERE secid = ?";
  connection.query(sql, [parseInt(id)], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    console.log(result);
    fetchSections();
    return callback("success");
  });
};
router.route("/deleteSection/:id").post(function (req, res) {
  let id = req.params.id;
  const sql = "DELETE FROM sections WHERE secid = ?";
  connection.query(sql, [parseInt(id)], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(result);
    res.status(200).send("success");
  });
});

//Fetch Divisions
const fetchDivisions = () => {
  const sql = "SELECT * FROM divisions";
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
    }

    console.log(rows);
    io.emit("divisions", rows);
  });
};
router.route("/fetchDivisions").get(function (req, res) {
  const sql = "SELECT * FROM divisions";
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch Division By ID
const fetchDivisionById = (id, callback, socket) => {
  const sql = "SELECT * FROM divisions WHERE depid= ?";
  connection.query(sql, [parseInt(id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    console.log(rows);
    socket.emit("divisionInfo", rows[0]);
  });
};
router.route("/fetchDivisionById/:id").get(function (req, res) {
  let id = req.params.id;
  const sql = "SELECT * FROM divisions WHERE depid= ?";
  connection.query(sql, [parseInt(id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(rows);
    res.status(200).send(rows[0]);
  });
});

//Add Division
const addNewDivision = (department, depshort, payrollshort, callback) => {
  const sql =
    "INSERT INTO divisions (department, depshort, payrollshort) VALUES ?";
  const values = [[department, depshort, payrollshort]];
  connection.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    console.log(result);
    fetchDivisions();
    return callback("success");
  });
};
router.route("/addDivision").post(function (req, res) {
  const { department, depshort, payrollshort } = req.body;
  const sql =
    "INSERT INTO divisions (department, depshort, payrollshort) VALUES ?";
  const values = [[department, depshort, payrollshort]];
  connection.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(result);
    res.status(200).send("success");
  });
});

//Update Division
router.route("/updateDivision/:id").post(function (req, res) {
  let id = req.params.id;
  const { department, depshort, payrollshort } = req.body;
  const sql =
    "UPDATE divisions SET department = ?, depshort = ?, payrollshort = ? WHERE depid = ?";
  connection.query(
    sql,
    [department, depshort, payrollshort, parseInt(id)],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      console.log(result);
      res.status(200).send("success");
    }
  );
});

//Delete Division
router.route("/deleteDivision/:id").post(function (req, res) {
  let id = req.params.id;

  const sql = "DELETE FROM divisions WHERE depid = ?";
  connection.query(sql, [parseInt(id)], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(result);
    res.status(200).send("success");
  });
});

//Fetch Document Type By ID
router.route("/fetchDocumentType/:id").get(function (req, res) {
  let id = req.params.id;
  const sql = "SELECT * FROM document_type WHERE id = ?";
  connection.query(sql, [parseInt(id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows[0]);
    res.status(200).send(rows[0]);
  });
});

//Add Document Type
router.route("/addDocumentType").post(function (req, res) {
  const { type } = req.body;
  const sql = "INSERT INTO document_type (type) VALUES ?";
  const values = [[type]];
  connection.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(result);
    res.status(200).send("success");
  });
});

//Update Document Type
router.route("/updateDocumentType").post(function (req, res) {
  const { id, type } = req.body;
  const sql = "UPDATE document_type SET type = ? WHERE id = ?";
  connection.query(sql, [type, parseInt(id)], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(result);
    res.status(200).send("success");
  });
});

router.route("/deleteDocumentType/:id").post(function (req, res) {
  let id = req.params.id;
  const sql = "DELETE FROM document_type WHERE id = ?";
  connection.query(sql, [parseInt(id)], function (err, result) {
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

// Fetch Document Type
router.route("/documentType").get(function (req, res) {
  const sql = "SELECT * FROM document_type";
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Insert Draft
router.route("/draft").post(function (req, res) {
  const { documentID, creator, subject, doc_type, note, action_req } = req.body;
  const sql =
    "INSERT INTO documents (documentID, creator, subject, doc_type, note, status) VALUES ?";
  const values = [[documentID, creator, subject, doc_type, note, "0"]];
  connection.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    const sql_action_req =
      "INSERT INTO document_action_req (documentID, action_req) VALUES ?";
    connection.query(sql_action_req, [action_req], function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      res.status(200).send(result);
    });
  });
});

//Get draft by user
router.route("/getDrafts/:user").get(function (req, res) {
  const userID = req.params.user;
  let sql = "";
  sql += "SELECT documents.documentID as documentID, ";
  sql += "documents.subject as subject, ";
  sql += "document_type.type as doc_type ";
  sql += "FROM documents ";
  sql += "JOIN document_type ";
  sql += "ON documents.doc_type = document_type.id ";
  sql += "WHERE documents.creator = ? ";
  sql += "AND documents.status = ? ";
  sql += "ORDER BY documents.date_time_created DESC ";

  connection.query(sql, [userID, "0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    res.status(200).send(rows);
  });
});

//Fetch Document By ID
router.route("/fetchDocument/:doc_id").get(function (req, res) {
  const doc = req.params.doc_id;
  let sql = "";
  sql += "SELECT documents.subject as subject, ";
  sql +=
    "DATE_FORMAT(documents.date_time_created, '%M %d, %Y @ %h:%i %p') AS date_time_created, ";
  sql += "users.name AS creator, ";
  sql += "users.position AS creatorPosition, ";
  sql += "sections.secshort AS creatorSection, ";
  sql += "document_type.id as docType_id, ";
  sql += "document_type.type as type, ";
  sql += "documents.note ";
  sql += "FROM documents ";
  sql += "JOIN document_type ";
  sql += "ON documents.doc_type = document_type.id ";
  sql += "JOIN users ";
  sql += "ON documents.creator = users.user_id ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "WHERE documents.documentID = ? ";
  connection.query(sql, [doc], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows[0]);
    res.status(200).send(rows[0]);
  });
});

//Fetch  Action Required of Document
router.route("/fetchActionReq/:doc_id").get(function (req, res) {
  const doc = req.params.doc_id;
  const sql = "SELECT * FROM document_action_req WHERE documentID = ?";
  connection.query(sql, [doc], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch the last person/office/user document forwarder
router.route("/lastForwarder/:doc_id").get(function (req, res) {
  let sql = "";
  sql += "SELECT users.name AS sender, ";
  sql += "sections.secshort AS senderSection, ";
  sql += "users.position AS senderPosition, ";
  sql += "documentLogs.remarks AS remarks, ";
  sql += "documentLogs.destinationType AS destinationType ";
  sql += "FROM documentLogs ";
  sql += "JOIN users ";
  sql += "ON documentLogs.user_id = users.user_id ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "WHERE documentLogs.document_id = ? ";
  sql += "AND documentLogs.status = ? ";
  sql += "ORDER BY documentLogs.date_time DESC LIMIT 1";

  connection.query(sql, [req.params.doc_id, "2"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(rows[0]);
    res.status(200).send(rows[0]);
  });
});

//Fetch Documents of User
router.route("/fetchUserDocuments/:userID").get(function (req, res) {
  const userID = req.params.userID;
  let sql = "";
  sql += "SELECT documents.documentID as documentID, ";
  sql += "documents.subject as subject, ";
  sql += "document_type.id as docType_id, ";
  sql += "document_type.type as type, ";
  sql += "documentLogs.trans_id AS trans_id, ";
  sql += "documentLogs.document_id AS document_id, ";
  sql += "documentLogs.maxStatus AS maxStatus, ";
  sql += "documentLogs.destination AS destination, ";
  sql += "documentLogs.name AS name, ";
  sql += "documents.note ";
  sql += "FROM documents ";
  sql += "JOIN document_type ";
  sql += "ON documents.doc_type = document_type.id ";
  sql += "JOIN (SELECT documentLogs.trans_id AS trans_id, ";
  sql += "documentLogs.document_id, ";
  sql += "documentStatus.status AS maxStatus, ";
  sql += "users.name AS name, ";
  sql += "documentLogs.destination AS destination  ";
  sql +=
    "FROM documentLogs JOIN documentStatus ON documentLogs.status = documentStatus.statid ";
  sql += "JOIN users ON documentLogs.user_id = users.user_id ";
  sql += "ORDER BY documentLogs.trans_id DESC LIMIT 1) documentLogs ";
  sql += "ON documents.documentID = documentLogs.document_id ";
  sql += "WHERE documents.creator = ? ";
  sql += "AND documents.status = ? ";
  sql += "ORDER BY documents.date_time_created DESC ";
  connection.query(sql, [userID, "1"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//SEARCH BY SUBJ
router.route("/searchUserDocument/:value").get(function (req, res) {
  let sql = "";
  sql += "SELECT documents.documentID as documentID, ";
  sql += "documents.subject as subject, ";
  sql += "document_type.id as docType_id, ";
  sql += "document_type.type as type, ";
  sql += "documentLogs.trans_id AS trans_id, ";
  sql += "documentLogs.document_id AS document_id, ";
  sql += "documentLogs.maxStatus AS maxStatus, ";
  sql += "documentLogs.destination AS destination, ";
  sql += "documentLogs.name AS name, ";
  sql += "documents.note ";
  sql += "FROM documents ";
  sql += "JOIN document_type ";
  sql += "ON documents.doc_type = document_type.id ";
  sql += "JOIN (SELECT documentLogs.trans_id AS trans_id, ";
  sql += "documentLogs.document_id, ";
  sql += "documentStatus.status AS maxStatus, ";
  sql += "users.name AS name, ";
  sql += "documentLogs.destination AS destination  ";
  sql +=
    "FROM documentLogs JOIN documentStatus ON documentLogs.status = documentStatus.statid ";
  sql += "JOIN users ON documentLogs.user_id = users.user_id ";
  sql += "ORDER BY documentLogs.trans_id DESC LIMIT 1) documentLogs ";
  sql += "ON documents.documentID = documentLogs.document_id ";
  sql += "WHERE documents.subject LIKE ? ";
  sql += "ORDER BY documents.date_time_created DESC ";
  connection.query(sql, ["%" + req.params.value + "%"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch Documents of Section
router.route("/fetchSectionDocuments/:userID").get(function (req, res) {
  const userID = req.params.userID;
  const fetchUser = "SELECT * FROM users WHERE user_id = ?";
  connection.query(fetchUser, [parseInt(userID)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    let sql = "";
    sql += "SELECT documents.documentID as documentID, ";
    sql += "documents.subject as subject, ";
    sql += "documents.doc_type as docType_id, ";
    sql += "documents.note as note, ";
    sql += "document_type.type as docType, ";
    sql += "documentLogs.trans_id AS trans_id, ";
    sql += "documentLogs.document_id AS document_id, ";
    sql += "documentLogs.maxStatus AS maxStatus, ";
    sql += "documentLogs.destination AS destination, ";
    sql += "documentLogs.name AS name, ";
    sql += "documents.creator as creatorID, ";
    sql += "users.name as creator ";
    sql += "FROM documents ";
    sql += "JOIN document_type ";
    sql += "ON documents.doc_type = document_type.id ";
    sql += "JOIN (SELECT documentLogs.trans_id AS trans_id, ";
    sql += "documentLogs.document_id, ";
    sql += "documentStatus.status AS maxStatus, ";
    sql += "users.name AS name, ";
    sql += "documentLogs.destination AS destination  ";
    sql +=
      "FROM documentLogs JOIN documentStatus ON documentLogs.status = documentStatus.statid ";
    sql += "JOIN users ON documentLogs.user_id = users.user_id ";
    sql += "ORDER BY documentLogs.trans_id DESC LIMIT 1) documentLogs ";
    sql += "ON documents.documentID = documentLogs.document_id ";
    sql += "JOIN users ";
    sql += "ON documents.creator = users.user_id ";
    sql += "WHERE users.section = ? ";
    sql += "AND documents.status = ? ";
    sql += "ORDER BY documents.date_time_created DESC ";
    connection.query(sql, [rows[0].section, "1"], function (err, rows, fields) {
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
router.route("/fetchDocumentDestination/:doc_id").get(function (req, res) {
  const documentID = req.params.doc_id;
  let sql = "";
  sql +=
    "SELECT documentLogs.remarks AS remarks, documentLogs.document_id AS document_id, ";
  sql +=
    "DATE_FORMAT(documentLogs.date_time, '%c/%d/%y %h:%i %p') AS date_time_receive, ";
  sql += "users.name AS receiver, ";
  sql += "documentLogs.user_id AS receiver_id, ";
  sql += "sections.secshort AS section ";
  sql += "FROM documentLogs ";
  sql += "JOIN users ";
  sql += "ON documentLogs.user_id = users.user_id ";
  sql += "JOIN sections ON users.section = sections.secid ";
  sql += "WHERE documentLogs.document_id = ? ";
  sql += "AND documentLogs.status = ?";

  connection.query(sql, [documentID, "1"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

router.route("/fetchDateTimeReleased").post(function (req, res) {
  const { user_id, document_id } = req.body;

  const sql =
    "SELECT DATE_FORMAT(date_time, '%c/%d/%y %h:%i %p') AS date_time_released FROM documentLogs WHERE user_id = ? AND document_id = ? AND (status = ? || status =?)";
  connection.query(sql, [user_id, document_id, "2", "4"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
    }

    res.status(200).send(rows[0]);
  });
});

router.route("/fetchActionTaken").post(function (req, res) {
  const { user_id, document_id } = req.body;
  const sql =
    "SELECT remarks FROM documentLogs WHERE user_id = ? AND document_id = ? AND (status = ? || status = ?)";
  connection.query(sql, [user_id, document_id, "2", "4"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
    }
    console.log(rows);
    res.status(200).send(rows[0]);
  });
});

//Fetch Pending Documents
router.route("/fetchPendingDocument/:user_id").get(function (req, res) {
  let sql = "";
  sql += "SELECT users.name AS creator, ";
  sql += "sections.section AS creatorSection, ";
  sql += "users.position AS creatorPosition, ";
  sql += "documents.subject AS subject, ";
  sql += "document_type.type AS doc_type,  ";
  sql += "documents.note AS note, ";
  sql += "documentLogs.remarks AS remarks, ";
  sql += "documentLogs.destinationType AS destinationType, ";
  sql += "documentLogs.document_id AS documentId ";
  sql += "FROM documentLogs ";
  sql += "JOIN documents ";
  sql += "ON documentLogs.document_id = documents.documentID ";
  sql += "JOIN document_type ";
  sql += "ON documents.doc_type = document_type.id ";
  sql += "JOIN users ";
  sql += "ON documents.creator = users.user_id ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "WHERE documentLogs.user_id = ? ";
  sql += "AND documentLogs.status = ? ";
  sql += "AND documentLogs.notification = ? ";
  sql += "ORDER BY documentLogs.date_time DESC ";

  connection.query(sql, [req.params.user_id, "1", "0"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

//notification
router.route("/notification/:user_section").get(function (req, res) {
  const section = req.params.user_section;
  let sql = "";
  sql += "SELECT documents.subject AS subject, ";
  sql += "users.name AS creator, ";
  sql += "document_type.type AS doc_type, ";
  sql += "documentLogs.document_id AS documentId ";
  sql += "FROM documents ";
  sql += "JOIN users ";
  sql += "ON documents.creator = users.user_id ";
  sql += "JOIN document_type ";
  sql += "ON documents.doc_type = document_type.id ";
  sql += "JOIN documentLogs ";
  sql += "ON documents.documentID = documentLogs.document_id ";
  sql += "WHERE documentLogs.destination = ? ";
  sql += "AND notification = ? ";
  connection.query(sql, [section, "0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    res.status(200).send(rows);
  });
});

//Action After Receive or under pending documents
router.route("/afterDocumentReceive").post(function (req, res) {
  const {
    documentId,
    user_id,
    remarks,
    destinationType,
    destination,
    status,
  } = req.body;
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  const level =
    "SELECT * FROM documentLogs WHERE document_id = ? AND status = ? AND user_id = ? AND notification = ?";
  connection.query(level, [documentId, "1", user_id, "0"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
    }
    let currentDocLevel = rows[0].level;
    let ref = rows[0].ref;
    parseInt(currentDocLevel);

    if (status === "2") {
      const newLevel =
        "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time,level, ref) VALUES ?";
      const values = [
        [
          documentId,
          user_id,
          remarks,
          destinationType,
          destination,
          status,
          "0",
          dateTime,
          ++currentDocLevel,
          ref,
        ],
      ];

      connection.query(newLevel, [values], function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        let updateNewLevel = "";
        updateNewLevel += "UPDATE documentLogs SET ";
        updateNewLevel += "notification   = ? ";
        updateNewLevel += "WHERE document_id = ? ";
        updateNewLevel += "AND user_id = ? ";
        updateNewLevel += "AND status = ? ";
        updateNewLevel += "AND level = ? ";
        connection.query(
          updateNewLevel,
          ["1", documentId, user_id, "1", rows[0].level],
          function (err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            }
            res.status(200).send(result);
          }
        );
      });
    } else {
      const sameLevel =
        "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time,level, ref) VALUES ?";
      const values = [
        [
          documentId,
          user_id,
          remarks,
          destinationType,
          destination,
          status,
          "0",
          dateTime,
          currentDocLevel,
          ref,
        ],
      ];

      connection.query(sameLevel, [values], function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        let updateSameLevel = "";
        updateSameLevel += "UPDATE documentLogs SET ";
        updateSameLevel += "notification   = ? ";
        updateSameLevel += "WHERE document_id = ? ";
        updateSameLevel += "AND user_id = ? ";
        updateSameLevel += "AND status = ? ";
        updateSameLevel += "AND level = ? ";
        connection.query(
          updateSameLevel,
          ["1", documentId, user_id, "1", currentDocLevel],
          function (err, result) {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            }
            res.status(200).send(result);
          }
        );
      });
    }
  });
});

//Search Document
router.route("/searchBySubject/:subj").get(function (req, res) {
  let subj = req.params.subj;
  let sql = "";
  sql +=
    "SELECT documents.documentId AS documentId, documents.subject AS subject, ";
  sql += "users.name AS creator, ";
  sql += "users.position AS creatorPosition, ";
  sql += "sections.section AS creatorSection ";
  sql += "FROM documents ";
  sql += "JOIN users ";
  sql += "ON documents.creator = users.user_id ";
  sql += "JOIN sections ";
  sql += "ON users.section = sections.secid ";
  sql += "WHERE subject LIKE ? ORDER BY documents.date_time_created DESC";

  connection.query(sql, ["%" + subj + "%"], function (err, rows, fields) {
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
