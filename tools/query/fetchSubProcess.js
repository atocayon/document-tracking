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
const fetchSubProcess = (tracking, callback) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.trans_id AS trans_id, ";
  sql += "a.remarks AS remarks, ";
  sql += "a.destinationType AS destinationType, ";
  sql += "a.destination AS destination, ";
  sql += "b.name AS name, ";
  sql += "c.status AS status, ";
  sql += "DATE_FORMAT(a.date_time, '%M %d, %Y @ %h:%i:%s %p') AS date_time ";
  sql += "FROM documentLogs a ";
  sql += "JOIN users b ON  a.user_id = b.user_id ";
  sql += "JOIN documentStatus c ON a.status = c.statid ";
  sql += "WHERE a.document_id = ?";
  connection.query(sql, [tracking], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows);
  });
};

exports.fetchSubProcess = fetchSubProcess;
