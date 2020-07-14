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
//Count Pending
const countPending = (user_id, socket) => {
  const sql =
    "SELECT * FROM documentLogs WHERE user_id = ? AND status = ? AND notification = ?";
  connection.query(sql, [user_id, "1", "0"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }

    socket.emit("pendings", rows.length);
  });
};

exports.countPending = countPending;
