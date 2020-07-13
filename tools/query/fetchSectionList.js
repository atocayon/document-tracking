const connection = require("../dbConnection/connection");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

const fetchSectionList = (callback) => {
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
      return callback(err);
    }

    console.log(rows);
    io.emit("sectionList", rows);
  });
};

const fetchSectionById = (secid, callback) => {
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
      return callback("server error");
    }
    console.log(rows[0]);
    return callback(rows[0]);
  });
};

const addNewSection = (division, section, secshort, callback) => {
  const sql =
    "INSERT INTO sections (divid, section, secshort, active) VALUES ?";
  const values = [[division, section, secshort, 1]];
  connection.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    fetchSectionList(callback);
    return callback("success");
  });
};

const updateSection = (data, callback) => {
  const { secid, divid, section, secshort } = data;
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
      fetchSectionList(callback);
      return callback(result);
    }
  );
};

const deleteSection = (secid, callback) => {
  const sql = "DELETE FROM sections WHERE secid = ?";
  connection.query(sql, [parseInt(secid)], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    console.log(result);
    fetchSectionList(callback);
    return callback("success");
  });
};

exports.deleteSection = deleteSection;
exports.updateSection = updateSection;
exports.addNewSection = addNewSection;
exports.fetchSectionById = fetchSectionById;
exports.fetchSectionList = fetchSectionList;
