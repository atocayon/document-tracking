const connection = require("../dbConnection/connection");
const activeList = require("./fetchActiveUserList");

const logout = (id, callback) => {
  const sql = "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
  connection.query(sql, ["1", id], async function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (result) {
      await activeList.fetchUserActiveList();
      return callback("logout");
    }
  });
};

exports.logout = logout;
