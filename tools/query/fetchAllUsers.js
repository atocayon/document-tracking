const connection = require("../dbConnection/connection");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

//Fetch All Users
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

exports.Users = Users;
