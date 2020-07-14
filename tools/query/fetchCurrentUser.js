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
const fetchCurrentUser = (token, callback) => {
  let sql = "";
  sql += "SELECT a.user_id AS user_id, ";
  sql += "a.employeeId AS employeeId, ";
  sql += "a.name AS name, ";
  sql += "a.username AS username, ";
  sql += "a.password AS password, ";
  sql += "a.contact AS contact, ";
  sql += "a.email AS email, ";
  sql += "a.section AS secid, ";
  sql += "a.position AS position, ";
  sql += "d.role AS role, ";
  sql += "d.role_id AS role_id, ";
  sql += "a.status AS status, ";
  sql += "b.section AS section, ";
  sql += "b.secshort AS secshort, ";
  sql += "c.department AS department, ";
  sql += "c.depshort AS depshort ";
  sql += "FROM users a ";
  sql += "JOIN sections b ";
  sql += "ON a.section = b.secid ";
  sql += "JOIN divisions c ";
  sql += "ON b.divid = c.depid ";
  sql += "JOIN users_role d ";
  sql += "ON a.role = d.role_id ";
  sql += "WHERE a.user_id = ? ";
  connection.query(sql, [parseInt(token)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    console.log(rows);
    return callback(rows[0]);
  });
};

exports.fetchCurrentUser = fetchCurrentUser;
