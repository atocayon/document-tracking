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
const afterDocumentReceive = (
  documentId,
  user_id,
  remarks,
  destinationType,
  destination,
  status,
  callback
) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  const level =
    "SELECT * FROM documentLogs WHERE document_id = ? AND status = ? AND user_id = ? AND notification = ?";
  connection.query(level, [documentId, "1", user_id, "0"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (status === "2") {
      if (typeof destination === "string") {
        const insertLogs2 =
          "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
        const valInsertLogs2 = [
          [
            documentId,
            user_id,
            remarks,
            destinationType,
            destination,
            status,
            "0",
            dateTime,
          ],
        ];
        connection.query(insertLogs2, [valInsertLogs2], function (err, result) {
          if (err) {
            console.log(err);
            return callback("server error");
          }
          let updateLogs2 = "";
          updateLogs2 += "UPDATE documentLogs SET ";
          updateLogs2 += "notification   = ? ";
          updateLogs2 += "WHERE document_id = ? ";
          updateLogs2 += "AND user_id = ? ";
          updateLogs2 += "AND status = ? ";
          connection.query(
            updateLogs2,
            ["1", documentId, user_id, "1"],
            function (err, result) {
              if (err) {
                console.log(err);
                return callback("server error");
              }

              return callback(result);
            }
          );
        });
      } else {
        if (destination.length > 1) {
          const sql =
            "SELECT a.documentID AS documentId, a.subject AS subject, a.doc_type AS doc_type, a.note AS note FROM documents a WHERE a.documentID =?";
          connection.query(sql, documentId, function (err, doc, fields) {
            if (err) {
              console.log(err);
              return callback("server error");
            }
            let forwardArr = [];
            let insertLogsVal = [];
            for (let i = 0; i < destination.length; i++) {
              let inc = i + 1;
              forwardArr.push([
                documentId + "-" + inc,
                user_id,
                doc[0].subject,
                doc[0].doc_type,
                doc[0].note,
                "1",
                documentId,
              ]);

              insertLogsVal.push([
                documentId + "-" + inc,
                user_id,
                remarks,
                destinationType,
                destination[i],
                status,
                "0",
                dateTime,
              ]);
            }

            const insert =
              "INSERT INTO documents(documentID, creator, subject,doc_type, note, status, ref) VALUES ?";

            connection.query(insert, [forwardArr], function (err, result) {
              if (err) {
                console.log(err);
                return callback("server error");
              }

              const insertLogs =
                "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";

              connection.query(insertLogs, [insertLogsVal], function (
                err,
                result
              ) {
                if (err) {
                  console.log(err);
                  return callback("server error");
                }
                let updateLogs = "";
                updateLogs += "UPDATE documentLogs SET ";
                updateLogs += "notification   = ? ";
                updateLogs += "WHERE document_id = ? ";
                updateLogs += "AND user_id = ? ";
                updateLogs += "AND status = ? ";
                connection.query(
                  updateLogs,
                  ["1", documentId, user_id, "1"],
                  function (err, result) {
                    if (err) {
                      console.log(err);
                      return callback("server error");
                    }

                    return callback(result);
                  }
                );
              });
            });
          });
        }
      }
    } else {
      const insertLogs3 =
        "INSERT INTO documentLogs(document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
      const values = [
        [
          documentId,
          user_id,
          remarks,
          destinationType,
          destination,
          status,
          "0",
          dateTime,
        ],
      ];

      connection.query(insertLogs3, [values], function (err, result) {
        if (err) {
          console.log(err);
          return callback("server error");
        }

        let updateLogs3 = "";
        updateLogs3 += "UPDATE documentLogs SET ";
        updateLogs3 += "notification   = ? ";
        updateLogs3 += "WHERE document_id = ? ";
        updateLogs3 += "AND user_id = ? ";
        updateLogs3 += "AND status = ? ";
        connection.query(
          updateLogs3,
          ["1", documentId, user_id, "1"],
          function (err, result) {
            if (err) {
              console.log(err);
              return callback("server error");
            }

            return callback(result);
          }
        );
      });
    }
  });
};


exports.afterDocumentReceive = afterDocumentReceive;