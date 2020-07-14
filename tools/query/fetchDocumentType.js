const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

const fetchDocumentType = (callback, connection) => {
  const sql = "SELECT * FROM document_type";
  connection.query(sql, function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    io.emit("documentTypeList", rows);
  });
};

const fetchDocumentTypeById = (docTypeId, callback, connection) => {
  const sql = "SELECT * FROM document_type WHERE id = ?";
  connection.query(sql, [parseInt(docTypeId)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows[0]);
  });
};

const addNewDocumentType = (type, callback, connection) => {
    const sql = "INSERT INTO document_type (type) VALUES ?";
    const values = [[type]];
    connection.query(sql, [values], function (err, result) {
        if (err) {
            console.log(err);
            return callback("server error");
        }

        fetchDocumentType(callback);
        return callback("success");
    });
};

const updateDocumentType = (data, callback, connection) => {
    const { id, type } = data;
    const sql = "UPDATE document_type SET type = ? WHERE id = ?";
    connection.query(sql, [type, parseInt(id)], function (err, result) {
        if (err) {
            console.log(err);
            return callback("server error");
        }

        fetchDocumentType(callback);
        return callback("success");
    });
};

const deleteDocumentType = (docTypeId, callback, connection) => {
  const sql = "DELETE FROM document_type WHERE id = ?";
  connection.query(sql, [parseInt(docTypeId)], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    fetchDocumentType(callback);
    return callback("success");
  });
};


exports.deleteDocumentType = deleteDocumentType;
exports.updateDocumentType = updateDocumentType;
exports.addNewDocumentType = addNewDocumentType;
exports.fetchDocumentTypeById = fetchDocumentTypeById;
exports.fetchDocumentType = fetchDocumentType;
