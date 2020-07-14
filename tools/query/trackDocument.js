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
//Track Document
const trackDocument = (data, socket) => {
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

    socket.emit("track", rows);
  });
};

exports.trackDocument = trackDocument;
