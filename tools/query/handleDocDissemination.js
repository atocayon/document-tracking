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

let today = new Date();
let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + " " + time;

const insertDocLogs = (
  userId,
  doc_id,
  docInfo,
  remarks,
  destination,
  callback
) => {
  let sql1 = "";
  sql1 += "INSERT INTO documentLogs ";
  sql1 += "(document_id, user_id, ";
  sql1 += "remarks, destinationType, destination, ";
  sql1 += "status, notification, date_time ) ";
  sql1 += "VALUES ? ";

  const values = [
    [doc_id, userId, remarks, "Internal", destination, "2", "0", dateTime],
  ];

  connection.query(sql1, [values], function (err, result) {
    if (err) {
      console.log(err);
    }
  });
};

const insertDocDestination = (
  userId,
  doc_id,
  docInfo,
  destination,
  callback
) => {
  let sql = "";
  sql += "INSERT INTO documents ";
  sql += "(documentID, creator, subject, doc_type, ";
  sql += "note, date_time_created, status, ref, category ) ";
  sql += "VALUES  ? ";
  const values = [
    [
      doc_id,
      userId,
      docInfo.subject,
      docInfo.docTypeId,
      docInfo.note,
      dateTime,
      "1",
      "0",
      docInfo.category,
    ],
  ];

  connection.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (destination.des.length > 1) {
      for (let i = 0; i < destination.des.length; i++) {
        insertDocLogs(
          userId,
          doc_id,
          docInfo,
          destination.remarks,
          destination.des[i],
          callback
        );
      }
    } else {
      insertDocLogs(
        userId,
        doc_id,
        docInfo,
        destination.remarks,
        destination.des[0],
        callback
      );
    }
  });
};

const dissemination = (userId, doc_id, docInfo, destination, callback) => {
  console.log(doc_id);
  insertDocDestination(userId, doc_id, docInfo, destination, callback);

  return callback("success");
};

exports.dissemination = dissemination;
