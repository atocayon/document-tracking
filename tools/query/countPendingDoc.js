
//Count Pending
const countPending = (user_id, socket, connection) => {
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
