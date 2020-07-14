
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fetchSystemUsers = require("./fetchAllUsers");
//Add User
const addUser = (
  role,
  employeeId,
  name,
  username,
  password,
  contact,
  email,
  section,
  position,
  callback,
  connection
) => {
  email = email.toLowerCase();
  email = email.trim();

  const sql = "SELECT * FROM users WHERE email = ?";
  connection.query(sql, [email, username], function (err, rows, fields) {
    if (err) {
      console.log(err);
    }
    console.log(rows);
    if (rows.length > 0) {
      // res.status(200).send({ success: "failed" });
      console.log("failed");
      return callback("email taken");
    } else {
      const checkUsername = "SELECT * FROM users WHERE username = ?";
      connection.query(checkUsername, [username], function (err, rows, fields) {
        if (err) {
          console.log(err);
          // res.status(500).send(err);
          return callback("error");
        }

        if (rows.length > 0) {
          return callback("username taken");
        } else {
          bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
              console.log(err);
              // res.status(500).send(err);
              return callback("error");
            }
            let sql1 = "";
            sql1 += "INSERT INTO users ";
            sql1 +=
              "(employeeId, name, username, password, contact, email, section, position, role, status) ";
            sql1 += "VALUES ?";

            const values = [
              [
                employeeId,
                name,
                username,
                hash,
                contact,
                email,
                section,
                position,
                role,
                "1",
              ],
            ];
            connection.query(sql1, [values], function (err, result) {
              if (err) {
                console.log(err);
                return callback("error");
                // res.status(500).send(err);
              }
              console.log(result);
              // res.status(200).send({ success: "success" });
              fetchSystemUsers.Users();
              return callback("success");
            });
          });
        }
      });
    }
  });
};

exports.addUser = addUser;
