const connection = require("../dbConnection/connection");

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
