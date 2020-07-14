
const fetchSectionDocuments = (userId, folder, callback, connection) => {
  const fetchUser = "SELECT * FROM users WHERE user_id = ?";
  connection.query(fetchUser, [parseInt(userId)], function (
    err,
    user_id,
    fields
  ) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    const fetchCategory =
      "SELECT a.id AS id,a.category AS category FROM doc_category a WHERE a.section_id = ? AND a.category = ?";
    connection.query(fetchCategory, [user_id[0].section, folder], function (
      err,
      category,
      fields
    ) {
      if (err) {
        console.log(err);
        return callback("server error");
      }
      let sql = "";
      sql += "SELECT a.documentID as documentID, ";
      sql += "a.subject as subject, ";
      sql += "a.doc_type as docType_id, ";
      sql += "a.note as note, ";
      sql += "b.type as docType, ";
      sql += "a.creator as creatorID, ";
      sql += "d.name as creator ";
      sql += "FROM documents a ";
      sql += "JOIN document_type b ";
      sql += "ON a.doc_type = b.id ";
      sql += "JOIN users d ";
      sql += "ON a.creator = d.user_id ";
      sql += "WHERE d.section = ? ";
      sql += "AND a.status = ? ";
      sql += "AND a.ref = ? ";
      sql += "AND a.category = ? ";
      sql += "ORDER BY a.date_time_created DESC ";
      connection.query(
        sql,
        [user_id[0].section, "1", "0", category[0].id],
        function (err, rows, fields) {
          if (err) {
            console.log(err);
            return callback("server error");
          }

          console.log(rows);
          return callback(rows);
        }
      );
    });
  });
};

exports.fetchSectionDocuments = fetchSectionDocuments;
