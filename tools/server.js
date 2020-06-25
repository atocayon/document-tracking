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
  socket.on("login", (emailOrPassword, password, callback) => {
    login(emailOrPassword, password, callback);
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
      position,
      callback
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
        position,
        callback
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
      category,
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
        category,
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

  //Add New Document Category
  socket.on("addNewDocumentCategory", (token, category, callback) => {
    addNewDocCategory(token, category, callback);
  });

  //Fetch Document Category
  socket.on("fetchDocumentCategory", (token, callback) => {
    fetchDocumentCategory(token, callback, socket);
  });

  //Update Doc Category
  socket.on("updateDocumentCategory", (data, token, callback) => {
    updateDocumentCategory(data, token, callback);
  });

  //Delete Doc Category
  socket.on("deleteDocCategory", (id, token, callback) => {
    deleteDocCategory(id, token, callback);
  });

  //Fetch Processed doc
  socket.on("fetchProcessedDoc", (token, callback) => {
    fetchProcessedDoc(token, callback, socket);
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

//Fetch Processed Doc
const fetchProcessedDoc = (token, callback, socket) => {
  let sql = "";
  sql += "SELECT DISTINCT a.document_id AS document_id, ";
  sql += "DATE_FORMAT(a.date_time, '%M %d, %Y @ %h:%i:%s %p ') AS date_time, ";
  sql += "b.subject AS subject, ";
  sql += "c.type AS type, ";
  sql += "d.status AS status ";
  sql += "FROM documentLogs a ";
  sql += "LEFT JOIN documents b ON a.document_id = b.documentID ";
  sql += "LEFT JOIN document_type c ON b.doc_type = c.id ";
  sql += "LEFT JOIN documentStatus d ON a.status = d.statid ";
  sql += "WHERE a.user_id = ? ";
  sql += "AND (a.status = ? OR a.status = ?) ";
  sql += "ORDER BY date_time DESC";
  connection.query(sql, [token, "2", "1"], function (err, rows, fields) {
    if (err) {
      return callback(err);
    }

    socket.emit("processedDocument", rows);
  });
};

//Delete Doc Category
const deleteDocCategory = (id, token, callback) => {
  const sql = "DELETE FROM doc_category WHERE id = ?";
  connection.query(sql, [parseInt(id)], function (err, result) {
    if (err) {
      return callback(err);
    }

    fetchDocumentCategory(token, callback);
    return callback("success");
  });
};

//Update Document Category
const updateDocumentCategory = (data, token, callback) => {
  for (let i = 0; i < data.length; i++) {
    const sql = "UPDATE doc_category SET category = ? WHERE id = ?";
    connection.query(sql, [data[i].category, parseInt(data[i].id)], function (
      err,
      result
    ) {
      if (err) {
        return callback(err);
      }
      fetchDocumentCategory(token, callback);
      return callback("success");
    });
  }
};

//Fetch Document Category
const fetchDocumentCategory = (token, callback, socket) => {
  const fetchSection = "SELECT a.section FROM users a WHERE a.user_id = ?";
  connection.query(fetchSection, [token], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    const fetchSectionCategory =
      "SELECT a.category AS category, a.id AS id FROM doc_category a WHERE a.section_id = ?";

    connection.query(fetchSectionCategory, [rows[0].section], function (
      err,
      rows,
      fields
    ) {
      if (err) {
        console.log(err);
        return callback("server error");
      }
      console.log(rows);
      socket.emit("sectionDocCategory", rows);
    });
  });
};

//Add New Document Category
const addNewDocCategory = (token, category, callback) => {
  const fetchSection = "SELECT a.section FROM users a WHERE a.user_id = ?";
  connection.query(fetchSection, [token], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    const sql = "INSERT INTO doc_category(section_id, category) VALUES ?";
    const value = [[rows[0].section, category]];
    connection.query(sql, [value], function (err, result) {
      if (err) {
        console.log(err);
        return callback("server error");
      }
      fetchDocumentCategory(token, callback);
      return callback("inserted");
    });
  });
};

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
  position,
  callback
) => {
  email = email.toLowerCase();
  email = email.trim();

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email, username], function (err, rows, fields) {
    if (err) {
      console.log(err);
    }
    console.log(rows);
    if (rows.length > 0) {
      // res.status(200).send({ success: "failed" });
      console.log("failed");
      return callback("email taken");
    } else {
      const checkUsername = "SELECT * FROM users WHERE username = ?";
      connection.query(checkUsername, [username], function (err, rows, fields) {
        if (err) {
          console.log(err);
          // res.status(500).send(err);
          return callback("error");
        }

        if (rows.length > 0) {
          return callback("username taken");
        } else {
          bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
              console.log(err);
              // res.status(500).send(err);
              return callback("error");
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
                return callback("error");
                // res.status(500).send(err);
              }
              console.log(result);
              // res.status(200).send({ success: "success" });
              Users();
              return callback("success");
            });
          });
        }
      });
    }
  });
};

//Fetch All Users Query
const Users = () => {
  let sql = "";
  sql += "SELECT a.user_id AS user_id, ";
  sql += "a.employeeId AS employeeId, ";
  sql += "a.name AS name, ";
  sql += "a.username AS username, ";
  sql += "a.contact AS contact, ";
  sql += "a.email AS email, ";
  sql += "a.section AS secid, ";
  sql += "a.position AS position, ";
  sql += "a.role AS role_id, ";
  sql += "b.section AS section, ";
  sql += "b.secshort AS secshort, ";
  sql += "c.department AS department, ";
  sql += "c.depshort AS depshort, ";
  sql += "d.role AS role, ";
  sql += "e.status AS accnt_status ";
  sql += "FROM users a ";
  sql += "JOIN sections b ";
  sql += "ON a.section = b.secid ";
  sql += "JOIN divisions c ";
  sql += "ON b.divid = c.depid ";
  sql += "JOIN users_role d ";
  sql += "ON a.role = d.role_id ";
  sql += "JOIN users_status e ";
  sql += "ON a.status = e.status_id ";
  sql += "ORDER BY a.user_id ASC ";
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
  sql += "SELECT e.document_id AS trans_id, e.remarks AS remarks, e.destinationType AS destinationType, ";
  sql += "e.destination AS destination, ";
  sql += "DATE_FORMAT(e.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS date_time, c.name AS name,  ";
  sql += "d.status AS status ";
  sql += "FROM documents a  ";
  sql += "JOIN (SELECT MAX(trans_id) as trans, document_id FROM documentLogs GROUP BY document_id) b ON a.documentID = b.document_id ";
  sql += "JOIN documentLogs e ON b.document_id = e.document_id  ";
  sql += "JOIN users c ON e.user_id = c.user_id ";
  sql +=
    "JOIN documentStatus d ON e.status = d.statid  ";
  sql +=
    "ORDER BY date_time DESC ";

  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }

    io.emit("docLogs", rows);
  });
};

const expandDogLogs = (doc_id, status, socket) => {
  let sql = "";
  sql += "SELECT a.document_id AS trans_id, ";
  sql += "c.name AS name, ";
  sql += "a.remarks AS remarks,  ";
  sql += "a.destinationType AS destinationType, ";
  sql += "a.destination AS destination, ";
  sql += "d.status AS status, ";
  sql += "DATE_FORMAT(a.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS date_time ";
  sql += "FROM documentLogs a ";
  sql += "JOIN documents b ";
  sql += "ON a.document_id = b.documentID ";
  sql += "JOIN users c ";
  sql += "ON a.user_id = c.user_id ";
  sql += "JOIN documentStatus d ";
  sql += "ON a.status = d.statid ";
  sql += "WHERE a.document_id = ? AND d.status != ?";
  sql += "ORDER BY a.date_time ASC ";
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
        "SELECT documentID as documentID FROM documents ORDER BY documentID DESC LIMIT 1";
      connection.query(sql1, function (err, rows, fields) {
        if (err) {
          console.log(err);
          throw err;
        }

        let str = rows[0].documentID.split("-", 1);
        let convert = parseInt(str);
        io.emit("documentId", {documentID: convert+1});
      });
    } else {
      console.log(rows);
      const defaultValue = 1000000000;
      io.emit("documentId", { documentID: defaultValue });
    }
  });
};

//Inserting new document
const insertDocument =  async (
  documentID,
  creator,
  subject,
  doc_type,
  note,
  action_req,
  documentLogs,
  category,
  callback
) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;

  const check = "SELECT * FROM documents WHERE documentID = ?";
  connection.query(check, [parseInt(documentID)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    //
    // if (rows.length > 0) {
    //   const update =
    //     "UPDATE documents SET creator = ?, subject= ?, doc_type = ?, note = ?, status = ? WHERE documentID = ?";
    //   connection.query(
    //     update,
    //     [creator, subject, doc_type, note, "1", parseInt(documentID)],
    //     function (err, result) {
    //       if (err) {
    //         console.log(err);
    //         return callback("server error");
    //       }
    //
    //       let sql = "";
    //       sql += "INSERT INTO documentLogs ";
    //       sql += "(document_id, ";
    //       sql += "user_id, ";
    //       sql += "remarks, ";
    //       sql += "destinationType, ";
    //       sql += "destination, ";
    //       sql += "status, ";
    //       sql += "notification, level, ref) ";
    //       sql += "VALUES ? ";
    //
    //       connection.query(sql, [documentLogs], function (err, result) {
    //         if (err) {
    //           console.log(err);
    //           return callback("server error");
    //         }
    //
    //         getDocLogs();
    //         assignTrackingNum();
    //       });
    //     }
    //   );
    // }
    if (rows.length === 0) {
      if (documentLogs.length > 1) {
        const sql1 =
          "INSERT INTO documents (documentID, creator, subject, doc_type, note, status, ref, category) VALUES ?";
        let values = [
          [documentID, creator, subject, doc_type, note, "1", "0", category],
        ];
        let destination = [];
        for (let i = 0; i < documentLogs.length; i++) {
          let inc = i + 1;
          values.push([
            documentID + "-" + inc,
            creator,
            subject,
            doc_type,
            note,
            "1",
            documentID,
            category,
          ]);

          destination.push([
            documentID + "-" + inc,
            documentLogs[i][1],
            documentLogs[i][2],
            documentLogs[i][3],
            documentLogs[i][4],
            documentLogs[i][5],
            documentLogs[i][6],
            dateTime,
          ]);
        }

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
              "INSERT INTO documentLogs (document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";

            connection.query(sql3, [destination],  async function (err, result) {
              if (err) {
                console.log(err);
              }

              await getDocLogs();
              await assignTrackingNum();
              await fetchProcessedDoc(creator, callback);
              return callback("success");
            });
          });
        });
      } else {
        const sql4 =
          "INSERT INTO documents (documentID, creator, subject, doc_type, note, status, ref, category) VALUES ?";
        let values4 = [
          [documentID, creator, subject, doc_type, note, "1", "0", category],
        ];

        connection.query(sql4, [values4], function (err, result) {
          if (err) {
            console.log(err);
          }

          const sql5 =
            "INSERT INTO document_action_req (documentID, action_req) VALUES ?";

          connection.query(sql5, [action_req], function (err, result) {
            if (err) {
              console.log(err);
            }

            const sql5 =
              "INSERT INTO documentLogs (document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
            const values5 = [
              [
                documentID,
                documentLogs[0][1],
                documentLogs[0][2],
                documentLogs[0][3],
                documentLogs[0][4],
                documentLogs[0][5],
                documentLogs[0][6],
                dateTime,
              ],
            ];
            connection.query(sql5, [values5], function (err, result) {
              if (err) {
                console.log(err);
              }

              getDocLogs();
              assignTrackingNum();
              fetchProcessedDoc(creator, callback);
              return callback("success");
            });
          });
        });
      }
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
          const insertExternal =
            "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
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
            ],
          ];
          connection.query(insertExternal, [val], function (err, result) {
            if (err) {
              console.log(err);
              return callback("server error");
            }
            countPending(user_id, socket);
            trackDocument(documentTracking);
            fetchProcessedDoc(user_id, callback);
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
          insertInternal += "notification, date_time) ";
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
            ],
          ];
          connection.query(insertInternal, [val1], function (err, result) {
            if (err) {
              console.log(err);
              return callback("server error");
            }

            const update =
              "UPDATE documentLogs SET notification =  ? WHERE status = ? AND destination = ? AND document_id = ?";
            connection.query(
              update,
              ["1", "2", user_section, documentTracking],
              function (err, result) {
                if (err) {
                  console.log(err);
                  return callback("server error");
                }

                countPending(user_id, socket);
                trackDocument(documentTracking);
                fetchProcessedDoc(user_id, callback);
                return callback("success");
              }
            );
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
  sql += "a.documentID AS document_id, ";
  sql += "a.subject, ";
  sql += "a.note, ";
  sql +=
    "DATE_FORMAT(a.date_time_created, '%M %d, %Y @ %h:%i:%s %p') AS date_time, ";
  sql += "b.name AS name, ";
  sql += "d.secshort AS section, ";
  sql += "c.type AS type ";
  sql += "FROM documents a ";
  sql += "JOIN users b ON a.creator = b.user_id ";
  sql += "JOIN document_type c ON a.doc_type = c.id ";
  sql += "JOIN sections d ON b.section = d.secid ";
  sql += "WHERE a.documentID = ?";
  connection.query(sql, [data], function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }

    io.emit("track", rows);
  });
};

//Fetch sub process
router.route("/fetchSubProcess").post(function (req, res) {
  const { tracking } = req.body;
  let sql = "";
  sql += "SELECT ";
  sql += "a.trans_id AS trans_id, ";
  sql += "a.remarks AS remarks, ";
  sql += "a.destinationType AS destinationType, ";
  sql += "a.destination AS destination, ";
  sql += "b.name AS name, ";
  sql += "c.status AS status, ";
  sql += "DATE_FORMAT(a.date_time, '%M %d, %Y @ %h:%i:%s %p') AS date_time ";
  sql += "FROM documentLogs a ";
  sql += "JOIN users b ON  a.user_id = b.user_id ";
  sql += "JOIN documentStatus c ON a.status = c.statid ";
  sql += "WHERE a.document_id = ?";
  connection.query(sql, [tracking], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    res.status(200).send(rows);
  });
});

//Fetch sub document
router.route("/fetchSubDocument").post(function (req, res) {
  const { tracking } = req.body;
  let sql = "";
  sql += "SELECT ";
  sql += "a.documentID AS document_id, ";
  sql += "a.subject, ";
  sql += "a.note, ";
  sql +=
    "DATE_FORMAT(a.date_time_created, '%M %d, %Y @ %h:%i:%s %p') AS date_time, ";
  sql += "b.name AS name, ";
  sql += "c.type AS type ";
  sql += "FROM documents a ";
  sql += "JOIN users b ON a.creator = b.user_id ";
  sql += "JOIN document_type c ON a.doc_type = c.id ";
  sql += "WHERE a.ref = ?";

  connection.query(sql, [tracking], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    res.status(200).send(rows);
  });
});

const login = (emailOrPassword, password, callback) => {
  console.log(emailOrPassword);
  let sql = "";
  sql += "SELECT ";
  sql += "a.user_id AS user_id, ";
  sql += "a.name AS name, ";
  sql += "a.password AS password, ";
  sql += "b.role AS role ";
  sql += "FROM users a ";
  sql += "JOIN users_role b ";
  sql += "ON a.role = b.role_id ";
  sql += "WHERE email = ? OR username = ?";

  connection.query(sql, [emailOrPassword, emailOrPassword], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    console.log(rows);
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
  sql += "SELECT  ";
  sql += "a.timeStamp AS timeStamp, ";
  sql += "b.position AS position, ";
  sql += "b.user_id AS user_id, ";
  sql += "CONVERT(b.user_id, CHAR) as user_id, b.name AS name ";
  sql += "FROM users_session a ";
  sql += "JOIN users b ";
  sql += "ON a.userId = b.user_id ";
  sql += "WHERE a.isDeleted = ? ";
  sql += "ORDER BY a.timeStamp ASC";

  connection.query(sql, ["0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
    }

    io.emit("activeUsers", rows);
  });
};

//Verify User Token
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

router.route("/sectionUser/:section").get(function (req, res) {
  let section = req.params.section;

  let sql = "";
  sql += "SELECT a.user_id AS user_id, ";
  sql += "a.employeeId AS employeeId, ";
  sql += "a.name AS name, ";
  sql += "a.username AS username, ";
  sql += "a.password AS password, ";
  sql += "a.contact AS contact, ";
  sql += "a.email AS email, ";
  sql += "a.section AS secid, ";
  sql += "a.position AS position, ";
  sql += "a.role AS role, ";
  sql += "a.status AS status, ";
  sql += "b.section AS section, ";
  sql += "b.secshort AS secshort, ";
  sql += "c.department AS department, ";
  sql += "c.depshort AS depshort ";
  sql += "FROM users a ";
  sql += "JOIN sections b ";
  sql += "ON a.section = b.secid ";
  sql += "JOIN divisions c ";
  sql += "ON b.divid = c.depid ";
  sql += "WHERE a.section = ? ORDER BY a.name ASC ";
  connection.query(sql, [section], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    console.log(rows);
    res.status(200).send(rows);
  });
});

router.route("/user/:id").get(function (req, res) {
  let id = req.params.id;

  let sql = "";
  sql += "SELECT a.user_id AS user_id, ";
  sql += "a.employeeId AS employeeId, ";
  sql += "a.name AS name, ";
  sql += "a.username AS username, ";
  sql += "a.password AS password, ";
  sql += "a.contact AS contact, ";
  sql += "a.email AS email, ";
  sql += "a.section AS secid, ";
  sql += "a.position AS position, ";
  sql += "d.role AS role, ";
  sql += "d.role_id AS role_id, ";
  sql += "a.status AS status, ";
  sql += "b.section AS section, ";
  sql += "b.secshort AS secshort, ";
  sql += "c.department AS department, ";
  sql += "c.depshort AS depshort ";
  sql += "FROM users a ";
  sql += "JOIN sections b ";
  sql += "ON a.section = b.secid ";
  sql += "JOIN divisions c ";
  sql += "ON b.divid = c.depid ";
  sql += "JOIN users_role d ";
  sql += "ON a.role = d.role_id ";
  sql += "WHERE a.user_id = ? ";
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
router.route("/sections/:secid").post(function (req, res) {
  const secid = req.params.secid;
  let sql = "";
  sql += "SELECT a.secid AS secid, ";
  sql += "a.divid AS divid, ";
  sql += "a.section AS section, ";
  sql += "a.secshort AS secshort, ";
  sql += "b.department AS department, ";
  sql += "b.depshort AS depshort ";
  sql += "FROM sections a ";
  sql += "JOIN divisions b ";
  sql += "ON a.divid = b.depid ";
  sql += "WHERE a.secid = ? ORDER BY a.section ASC";
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
router.route("/sections").get(function (req, res) {
  let sql = "";
  sql += "SELECT a.divid AS divid, ";
  sql += "a.secid AS secid, ";
  sql += "a.section AS section, ";
  sql += "a.secshort AS secshort, ";
  sql += "a.active AS active, ";
  sql += "b.department AS department, ";
  sql += "b.depshort AS depshort ";
  sql += "FROM sections a ";
  sql += "JOIN divisions b ";
  sql += "ON a.divid = b.depid ";
  sql += "ORDER BY a.section ASC ";
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
  sql += "SELECT a.documentID as documentID, ";
  sql += "a.subject as subject, ";
  sql += "b.type as doc_type ";
  sql += "FROM documents a ";
  sql += "JOIN document_type b ";
  sql += "ON a.doc_type = b.id ";
  sql += "WHERE a.creator = ? ";
  sql += "AND a.status = ? ";
  sql += "ORDER BY a.date_time_created DESC ";

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
  sql += "SELECT a.subject as subject, ";
  sql += "a.note, ";
  sql +=
    "DATE_FORMAT(a.date_time_created, '%M %d, %Y @ %h:%i %p') AS date_time_created, ";
  sql += "b.id as docType_id, ";
  sql += "b.type as type, ";
  sql += "c.name AS creator, ";
  sql += "c.position AS creatorPosition, ";
  sql += "d.secshort AS creatorSection ";
  sql += "FROM documents a ";
  sql += "JOIN document_type b ";
  sql += "ON a.doc_type = b.id ";
  sql += "JOIN users c ";
  sql += "ON a.creator = c.user_id ";
  sql += "JOIN sections d ";
  sql += "ON c.section = d.secid ";
  sql += "WHERE a.documentID = ? ";
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
  sql += "SELECT  ";
  sql += "a.remarks AS remarks, ";
  sql += "a.destinationType AS destinationType ";
  sql += "b.name AS sender, ";
  sql += "b.position AS senderPosition, ";
  sql += "c.secshort AS senderSection ";
  sql += "FROM documentLogs a ";
  sql += "JOIN users b ";
  sql += "ON a.user_id = b.user_id ";
  sql += "JOIN sections c ";
  sql += "ON b.section = c.secid ";
  sql += "WHERE a.document_id = ? ";
  sql += "AND a.status = ? ";
  sql += "ORDER BY a.date_time DESC LIMIT 1";

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
  sql += "SELECT a.documentID as documentID, ";
  sql += "a.subject as subject, ";
  sql += "a.note, ";
  sql += "b.id as docType_id, ";
  sql += "b.type as type, ";
  sql += "c.trans_id AS trans_id, ";
  sql += "c.document_id AS document_id, ";
  sql += "c.maxStatus AS maxStatus, ";
  sql += "c.destination AS destination, ";
  sql += "c.name AS name ";
  sql += "FROM documents a ";
  sql += "JOIN document_type b ";
  sql += "ON a.doc_type =b.id ";
  sql += "JOIN (SELECT logs.trans_id AS trans_id, ";
  sql += "logs.document_id, ";
  sql += "status.status AS maxStatus, ";
  sql += "usr.name AS name, ";
  sql += "logs.destination AS destination  ";
  sql +=
    "FROM documentLogs logs JOIN documentStatus status ON logs.status = status.statid ";
  sql += "JOIN users usr ON logs.user_id = usr.user_id ";
  sql += "ORDER BY documentLogs.trans_id DESC LIMIT 1) c ";
  sql += "ON a.documentID = c.document_id ";
  sql += "WHERE a.creator = ? ";
  sql += "AND a.status = ? ";
  sql += "ORDER BY a.date_time_created DESC ";
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
  sql += "SELECT a.documentID as documentID, ";
  sql += "a.subject as subject, ";
  sql += "b.id as docType_id, ";
  sql += "b.type as type, ";
  sql += "c.trans_id AS trans_id, ";
  sql += "c.document_id AS document_id, ";
  sql += "c.maxStatus AS maxStatus, ";
  sql += "c.destination AS destination, ";
  sql += "c.name AS name, ";
  sql += "a.note ";
  sql += "FROM documents a ";
  sql += "JOIN document_type b ";
  sql += "ON a.doc_type = b.id ";
  sql += "JOIN (SELECT logs.trans_id AS trans_id, ";
  sql += "logs.document_id, ";
  sql += "status.status AS maxStatus, ";
  sql += "usr.name AS name, ";
  sql += "logs.destination AS destination  ";
  sql +=
    "FROM documentLogs logs JOIN documentStatus status ON logs.status = status.statid ";
  sql += "JOIN users usr ON logs.user_id = usr.user_id ";
  sql += "ORDER BY logs.trans_id DESC LIMIT 1) c ";
  sql += "ON a.documentID = c.document_id ";
  sql += "WHERE a.subject LIKE ? ";
  sql += "ORDER BY a.date_time_created DESC ";
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
router.route("/fetchSectionDocuments/:userID/:folder").get(function (req, res) {
  const userID = req.params.userID;
  const folder = req.params.folder;
  const fetchUser = "SELECT * FROM users WHERE user_id = ?";
  connection.query(fetchUser, [parseInt(userID)], function (
    err,
    user_id,
    fields
  ) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    const fetchCategory =
      "SELECT a.id AS id,a.category AS category FROM doc_category a WHERE a.section_id = ? AND a.category = ?";
    connection.query(fetchCategory, [user_id[0].section, folder], function (
      err,
      category,
      fields
    ) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      let sql = "";
      sql += "SELECT a.documentID as documentID, ";
      sql += "a.subject as subject, ";
      sql += "a.doc_type as docType_id, ";
      sql += "a.note as note, ";
      sql += "b.type as docType, ";
      sql += "a.creator as creatorID, ";
      sql += "d.name as creator ";
      sql += "FROM documents a ";
      sql += "JOIN document_type b ";
      sql += "ON a.doc_type = b.id ";
      sql += "JOIN users d ";
      sql += "ON a.creator = d.user_id ";
      sql += "WHERE d.section = ? ";
      sql += "AND a.status = ? ";
      sql += "AND a.ref = ? ";
      sql += "AND a.category = ? ";
      sql += "ORDER BY a.date_time_created DESC ";
      connection.query(
        sql,
        [user_id[0].section, "1", "0", category[0].id],
        function (err, rows, fields) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          }

          console.log(rows);
          res.status(200).send(rows);
        }
      );
    });
  });
});

router.route("/fetchDocumentRouteType/:doc_id").get(function (req, res) {
  const documentID = req.params.doc_id;
  console.log(documentID);
  let sql = "";
  sql +=
    "SELECT a.creator AS creator, a.subject AS subject, a.doc_type AS doc_type, a.note AS note ";
  sql += "FROM documents a WHERE a.ref = ? ";
  connection.query(sql, [documentID], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(rows);
    res.status(200).send(rows);
  });
});

//Fetch Document Destination
router.route("/fetchDocumentDestination/:doc_id").get(function (req, res) {
  const documentID = req.params.doc_id;
  let sql = "";
  sql += "SELECT a.remarks AS remarks, a.document_id AS document_id, ";
  sql += "DATE_FORMAT(a.date_time, '%c/%d/%y %h:%i %p') AS date_time_receive, ";
  sql += "b.name AS receiver, ";
  sql += "a.user_id AS receiver_id, ";
  sql += "c.secshort AS section ";
  sql += "FROM documentLogs a ";
  sql += "JOIN users b ";
  sql += "ON a.user_id = b.user_id ";
  sql += "JOIN sections c ";
  sql += "ON b.section = c.secid ";
  sql += "WHERE a.document_id = ? ";
  sql += "AND a.status = ?";

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
  let sql = "";
  sql +=
    "SELECT DATE_FORMAT(date_time, '%c/%d/%y %h:%i %p') AS date_time_released ";
  sql += "FROM documentLogs ";
  sql += "WHERE user_id = ? AND document_id = ? AND (status = ? || status =?)";
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
  sql += "SELECT d.name AS creator, ";
  sql += "e.section AS creatorSection, ";
  sql += "d.position AS creatorPosition, ";
  sql += "b.subject AS subject, ";
  sql += "c.type AS doc_type,  ";
  sql += "b.note AS note, ";
  sql += "a.remarks AS remarks, ";
  sql += "a.destinationType AS destinationType, ";
  sql += "a.document_id AS documentId ";
  sql += "FROM documentLogs a ";
  sql += "JOIN documents b ";
  sql += "ON a.document_id = b.documentID ";
  sql += "JOIN document_type c ";
  sql += "ON b.doc_type = c.id ";
  sql += "JOIN users d ";
  sql += "ON b.creator = d.user_id ";
  sql += "JOIN sections e ";
  sql += "ON d.section = e.secid ";
  sql += "WHERE a.user_id = ? ";
  sql += "AND a.status = ? ";
  sql += "AND a.notification = ? ";
  sql += "ORDER BY a.date_time DESC ";

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
  sql += "SELECT a.subject AS subject, ";
  sql += "b.name AS creator, ";
  sql += "d.type AS doc_type, ";
  sql += "e.document_id AS documentId ";
  sql += "FROM documents a ";
  sql += "JOIN users b ";
  sql += "ON a.creator = b.user_id ";
  sql += "JOIN document_type d ";
  sql += "ON a.doc_type = d.id ";
  sql += "JOIN documentLogs e ";
  sql += "ON a.documentID = e.document_id ";
  sql += "WHERE e.destination = ? ";
  sql += "AND e.notification = ? ";
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
    console.log(typeof destination);
    if (status === "2") {
      if (typeof destination === "string") {
        const insertLogs2 =
          "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
        const valInsertLogs2 = [
          [
            documentId,
            user_id,
            remarks,
            destinationType,
            destination,
            status,
            "0",
            dateTime,
          ],
        ];
        connection.query(insertLogs2, [valInsertLogs2], function (err, result) {
          if (err) {
            throw err;
          }
          let updateLogs2 = "";
          updateLogs2 += "UPDATE documentLogs SET ";
          updateLogs2 += "notification   = ? ";
          updateLogs2 += "WHERE document_id = ? ";
          updateLogs2 += "AND user_id = ? ";
          updateLogs2 += "AND status = ? ";
          connection.query(
            updateLogs2,
            ["1", documentId, user_id, "1"],
            function (err, result) {
              if (err) {
                throw err;
              }

              res.status(200).send(result);
            }
          );
        });
      } else {
        if (destination.length > 1) {
          const sql =
            "SELECT a.documentID AS documentId, a.subject AS subject, a.doc_type AS doc_type, a.note AS note FROM documents a WHERE a.documentID =?";
          connection.query(sql, documentId, function (err, doc, fields) {
            if (err) {
              throw err;
            }
            let forwardArr = [];
            let insertLogsVal = [];
            for (let i = 0; i < destination.length; i++) {
              let inc = i + 1;
              forwardArr.push([
                documentId + "-" + inc,
                user_id,
                doc[0].subject,
                doc[0].doc_type,
                doc[0].note,
                "1",
                documentId,
              ]);

              insertLogsVal.push([
                documentId + "-" + inc,
                user_id,
                remarks,
                destinationType,
                destination[i],
                status,
                "0",
                dateTime,
              ]);
            }

            const insert =
              "INSERT INTO documents(documentID, creator, subject,doc_type, note, status, ref) VALUES ?";

            connection.query(insert, [forwardArr], function (err, result) {
              if (err) {
                throw err;
              }

              const insertLogs =
                "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";

              connection.query(insertLogs, [insertLogsVal], function (
                err,
                result
              ) {
                if (err) {
                  throw err;
                }
                let updateLogs = "";
                updateLogs += "UPDATE documentLogs SET ";
                updateLogs += "notification   = ? ";
                updateLogs += "WHERE document_id = ? ";
                updateLogs += "AND user_id = ? ";
                updateLogs += "AND status = ? ";
                connection.query(
                  updateLogs,
                  ["1", documentId, user_id, "1"],
                  function (err, result) {
                    if (err) {
                      throw err;
                    }

                    res.status(200).send(result);
                  }
                );
              });
            });
          });
        }
      }
    } else {
      const insertLogs3 =
        "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
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
        ],
      ];

      connection.query(insertLogs3, [values], function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        let updateLogs3 = "";
        updateLogs3 += "UPDATE documentLogs SET ";
        updateLogs3 += "notification   = ? ";
        updateLogs3 += "WHERE document_id = ? ";
        updateLogs3 += "AND user_id = ? ";
        updateLogs3 += "AND status = ? ";
        connection.query(
          updateLogs3,
          ["1", documentId, user_id, "1"],
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
  sql += "SELECT a.documentId AS documentId, a.subject AS subject, ";
  sql += "b.name AS creator, ";
  sql += "b.position AS creatorPosition, ";
  sql += "d.section AS creatorSection ";
  sql += "FROM documents a ";
  sql += "JOIN users b ";
  sql += "ON a.creator = b.user_id ";
  sql += "JOIN sections d ";
  sql += "ON b.section = d.secid ";
  sql += "WHERE a.subject LIKE ? ORDER BY a.date_time_created DESC";

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
