const connection = require("../dbConnection/connection");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

const fetchSectionUsers = (secid, callback) => {
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
  connection.query(sql, [secid], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    // console.log(rows);
    io.emit("usersOnSection", rows);
    // return callback(rows);
  });
};

exports.fetchSectionUsers = fetchSectionUsers;
