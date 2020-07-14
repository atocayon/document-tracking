const connection = require("../dbConnection/connection");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

const fetchDivisions = (callback) => {
  const sql = "SELECT * FROM divisions";
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    io.emit("divisionsList", rows);
  });
};

const byId = (divid, callback) => {
  const sql = "SELECT * FROM divisions WHERE depid= ?";
  connection.query(sql, [parseInt(divid)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows[0]);
  });
};

const addNewDivision = (data, callback) => {
  const { department, depshort, payrollshort } = data;
  const sql =
    "INSERT INTO divisions (department, depshort, payrollshort) VALUES ?";
  const values = [[department, depshort, payrollshort]];
  connection.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    fetchDivisions(callback);
    return callback("success");
  });
};

const updateDivision = (data, callback) => {
  const { depid, department, depshort, payrollshort } = data;
  const sql =
    "UPDATE divisions SET department = ?, depshort = ?, payrollshort = ? WHERE depid = ?";
  connection.query(
    sql,
    [department, depshort, payrollshort, parseInt(depid)],
    function (err, result) {
      if (err) {
        console.log(err);
        return callback("server error");
      }

      fetchDivisions(callback);
      return callback("success");
    }
  );
};

const deleteDivision = (divid, callback) => {
  const sql = "DELETE FROM divisions WHERE depid = ?";
  connection.query(sql, [parseInt(divid)], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    fetchDivisions(callback);
    return callback("success");
  });
};

exports.deleteDivision = deleteDivision;
exports.updateDivision = updateDivision;
exports.addNewDivision = addNewDivision;
exports.byId = byId;
exports.fetchDivisions = fetchDivisions;
