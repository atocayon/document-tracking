const sectionUser = require("./fetchSectionUsers");

const updateUser = (data, callback, connection) => {
  const sql = "SELECT * FROM users WHERE user_id = ?";
  connection.query(sql, [parseInt(data.user_id)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (rows.length > 0) {
      let sql1 = "";
      sql1 += "UPDATE users ";
      sql1 += "SET employeeId = ? , ";
      sql1 += "name = ?, ";
      sql1 += "username = ?, ";
      sql1 += "contact = ?, ";
      sql1 += "email = ?, ";
      sql1 += "section = ?, ";
      sql1 += "position = ?, ";
      sql1 += "role = ? ";
      sql1 += "WHERE user_id = ? ";
      connection.query(
        sql1,
        [
          data.employeeId,
          data.name,
          data.username,
          data.contact,
          data.email,
          data.secid,
          data.position,
          data.role_id,
          data.user_id,
        ],
        function (err, result) {
          if (err) {
            console.log(err);
            return callback("server error");
          }
          console.log(result);
          return callback("success");
        }
      );
    }
  });
};

const updateRole = (role, id, secid, callback, connection) => {
  const sql = "UPDATE users SET role = ? WHERE user_id = ?";
  connection.query(sql, [role, parseInt(id)], function (err, result) {
    if (err) {
      return callback("server error");
    }
    sectionUser.fetchSectionUsers(secid, callback);
    return callback("success");
  });
};

const updateStatus = (status, id, secid, callback, connection) => {
  const sql = "UPDATE users SET status = ? WHERE user_id = ?";
  connection.query(sql, [status, parseInt(id)], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    sectionUser.fetchSectionUsers(secid, callback);
    return callback("update success!");
  });
};

const transferOffice = (secid, id, callback, connection) => {
  const sql = "UPDATE users SET section = ? WHERE user_id = ?";
  connection.query(sql, [secid, parseInt(id)], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    // console.log(result);
    sectionUser.fetchSectionUsers(secid, callback);
    return callback("transfer success");
  });
};

const accntDeletion = (id, secid, callback, connection) => {
  const sql = "DELETE FROM users WHERE user_id = ?";
  connection.query(sql, [id], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    sectionUser.fetchSectionUsers(secid, callback);
    return callback("deleted");
  });
};

exports.accntDeletion = accntDeletion;
exports.transferOffice = transferOffice;
exports.updateStatus = updateStatus;
exports.updateRole = updateRole;
exports.updateUser = updateUser;
