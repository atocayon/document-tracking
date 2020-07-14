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
//Fetch Document Category
const fetchDocumentCategory = (token, callback, socket) => {
  const fetchSection = "SELECT a.section FROM users a WHERE a.user_id = ?";
  connection.query(fetchSection, [token], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    const fetchSectionCategory =
      "SELECT a.category AS category, a.id AS id FROM doc_category a WHERE a.section_id = ?";

    connection.query(fetchSectionCategory, [rows[0].section], function (
      err,
      rows,
      fields
    ) {
      if (err) {
        console.log(err);
        return callback("server error");
      }
      console.log(rows);
      socket.emit("sectionDocCategory", rows);
    });
  });
};

//Add New Document Category
const addNewDocCategory = (token, category, callback, socket) => {
  const fetchSection = "SELECT a.section FROM users a WHERE a.user_id = ?";
  connection.query(fetchSection, [token], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    const sql = "INSERT INTO doc_category(section_id, category) VALUES ?";
    const value = [[rows[0].section, category]];
    connection.query(sql, [value], function (err, result) {
      if (err) {
        console.log(err);
        return callback("server error");
      }
     fetchDocumentCategory(token, callback, socket);
      return callback("inserted");
    });
  });
};

const updateDocumentCategory = (data, token, callback, socket) => {
  for (let i = 0; i < data.length; i++) {
    const sql = "UPDATE doc_category SET category = ? WHERE id = ?";
    connection.query(sql, [data[i].category, parseInt(data[i].id)], function (
        err,
        result
    ) {
      if (err) {
        return callback(err);
      }
      fetchDocumentCategory(token, callback, socket);
      return callback("success");
    });
  }
};

//Delete Doc Category
const deleteDocCategory = (id, token, callback, socket) => {
  const sql = "DELETE FROM doc_category WHERE id = ?";
  connection.query(sql, [parseInt(id)], function (err, result) {
    if (err) {
      return callback(err);
    }

   fetchDocumentCategory(token, callback, socket);
    return callback("success");
  });
};

exports.deleteDocCategory = deleteDocCategory;
exports.updateDocumentCategory = updateDocumentCategory;
exports.addNewDocCategory = addNewDocCategory;
exports.fetchDocumentCategory = fetchDocumentCategory;
