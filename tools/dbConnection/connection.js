const mysql = require("mysql");

const connection = mysql.createConnection({
  user: "jarydd",
  password: "Zilong123@098",
  database: "documentTracking",
  host: "localhost",
  port: "3306",
});

connection.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("MySQL database connection established successfully!!!");
});

exports.connection = connection;
