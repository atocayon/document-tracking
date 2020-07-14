const connection = require("../dbConnection/connection");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

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

exports.fetchUserActiveList = fetchUserActiveList;
