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
const verifyToken = (token, callback) => {
  const sql = "SELECT * FROM users_session WHERE userId = ?";
  connection.query(sql, [token], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows[0]);
  });
};

exports.verifyToken = verifyToken;
