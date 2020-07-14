
const search = (subj, callback, connection) => {
  let sql = "";
  sql += "SELECT a.documentId AS documentId, a.subject AS subject, ";
  sql += "b.name AS creator, ";
  sql += "b.position AS creatorPosition, ";
  sql += "d.secshort AS creatorSection ";
  sql += "FROM documents a ";
  sql += "JOIN users b ";
  sql += "ON a.creator = b.user_id ";
  sql += "JOIN sections d ";
  sql += "ON b.section = d.secid ";
  sql += "WHERE a.subject LIKE ? ORDER BY a.date_time_created DESC";

  connection.query(sql, ["%" + subj + "%"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows);
  });
};

exports.search = search;
