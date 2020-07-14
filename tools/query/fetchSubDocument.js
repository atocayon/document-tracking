const connection = require("../dbConnection/connection");

const fetchSubDocument = (tracking, callback) => {
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
      return callback("server error");
    }
    return callback(rows);
  });
};

exports.fetchSubDocument = fetchSubDocument;
