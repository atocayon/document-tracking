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

//Active user list
const fetchUserActiveList = (io) => {
  let sql = "";
  sql += "SELECT  ";
  sql += "a.timeStamp AS timeStamp, ";
  sql += "b.position AS position, ";
  sql += "b.user_id AS user_id, ";
  sql += "CONVERT(b.user_id, CHAR) as user_id, b.name AS name ";
  sql += "FROM users_session a ";
  sql += "JOIN users b ";
  sql += "ON a.userId = b.user_id ";
  sql += "WHERE a.isDeleted = ? ";
  sql += "ORDER BY a.timeStamp ASC";

  connection.query(sql, ["0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
    }

    console.log(rows);
    io.emit("activeUsers", rows);
  });
};

exports.fetchUserActiveList = fetchUserActiveList;
