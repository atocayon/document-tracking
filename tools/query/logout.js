const activeList = require("./fetchActiveUserList");
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
const logout = (id, callback, io) => {
  const sql = "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
  connection.query(sql, ["1", id], async function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (result) {
      await activeList.fetchUserActiveList(io);
      return callback("logout");
    }
  });
};

exports.logout = logout;
