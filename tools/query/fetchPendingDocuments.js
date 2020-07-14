const connection = require("../dbConnection/connection");

const fetchPendingDocument = (userId, callback) => {
  let sql = "";
  sql += "SELECT d.name AS creator, ";
  sql += "e.section AS creatorSection, ";
  sql += "d.position AS creatorPosition, ";
  sql += "b.subject AS subject, ";
  sql += "c.type AS doc_type,  ";
  sql += "b.note AS note, ";
  sql += "a.remarks AS remarks, ";
  sql += "a.destinationType AS destinationType, ";
  sql += "a.document_id AS documentId, ";
  sql += "DATE_FORMAT(b.date_time_created, '%Y%m%d') AS date_time_created ";
  sql += "FROM documentLogs a ";
  sql += "JOIN documents b ";
  sql += "ON a.document_id = b.documentID ";
  sql += "JOIN document_type c ";
  sql += "ON b.doc_type = c.id ";
  sql += "JOIN users d ";
  sql += "ON b.creator = d.user_id ";
  sql += "JOIN sections e ";
  sql += "ON d.section = e.secid ";
  sql += "WHERE a.user_id = ? ";
  sql += "AND a.status = ? ";
  sql += "AND a.notification = ? ";
  sql += "ORDER BY a.date_time DESC ";

  connection.query(sql, [userId, "1", "0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows);
  });
};

exports.fetchPendingDocument = fetchPendingDocument;
