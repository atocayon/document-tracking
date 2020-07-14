
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

//Fetch Document Logs Query
const getDocLogs = (connection) => {
    let sql = "";
    sql +=
        "SELECT e.document_id AS trans_id, e.remarks AS remarks, e.destinationType AS destinationType, ";
    sql += "e.destination AS destination, ";
    sql +=
        "DATE_FORMAT(e.date_time,'%M %d, %Y @ %h:%i:%s %p ') AS date_time, c.name AS name,  ";
    sql += "d.status AS status ";
    sql += "FROM documents a  ";
    sql +=
        "JOIN (SELECT MAX(trans_id) as trans, document_id FROM documentLogs GROUP BY document_id) b ON a.documentID = b.document_id ";
    sql += "JOIN documentLogs e ON b.document_id = e.document_id  ";
    sql += "JOIN users c ON e.user_id = c.user_id ";
    sql += "JOIN documentStatus d ON e.status = d.statid  ";
    sql += "ORDER BY date_time DESC ";

    connection.query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err);
        }

        io.emit("docLogs", rows);
    });
};

exports.getDocLogs = getDocLogs;