const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const mysql = require("mysql");
const db = require("./dbVariable");
const connection = mysql.createConnection({
  user: db.user,
  password: db.password,
  database: db.database,
  host: db.host,
  port: db.port,
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  }
});
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
        io.emit("documentId", { documentID: convert + 1 });
      });
    } else {
      console.log(rows);
      const defaultValue = 1000000000;
      io.emit("documentId", { documentID: defaultValue });
    }
  });
};

exports.assignTrackingNumber = assignTrackingNum;
