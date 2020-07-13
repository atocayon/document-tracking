const connection = require("../dbConnection/connection");
const fetchDocLogs = require("./fetchDocLogs");
const docNumber = require("./assignTrackingNum");
const processedDoc = require("./fetchProcessedDoc");
//Inserting new document
const insertDocument = (
  documentID,
  creator,
  subject,
  doc_type,
  note,
  action_req,
  documentLogs,
  category,
  callback,
  socket
) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;

  const check = "SELECT * FROM documents WHERE documentID = ?";
  connection.query(check, [parseInt(documentID)], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (rows.length === 0) {
      if (documentLogs.length > 1) {
        const sql1 =
          "INSERT INTO documents (documentID, creator, subject, doc_type, note, status, ref, category) VALUES ?";
        let values = [
          [documentID, creator, subject, doc_type, note, "1", "0", category],
        ];
        let destination = [];
        for (let i = 0; i < documentLogs.length; i++) {
          let inc = i + 1;
          values.push([
            documentID + "-" + inc,
            creator,
            subject,
            doc_type,
            note,
            "1",
            documentID,
            category,
          ]);

          destination.push([
            documentID + "-" + inc,
            documentLogs[i][1],
            documentLogs[i][2],
            documentLogs[i][3],
            documentLogs[i][4],
            documentLogs[i][5],
            documentLogs[i][6],
            dateTime,
          ]);
        }

        connection.query(sql1, [values], function (err, result) {
          if (err) {
            console.log(err);
          }

          const sql2 =
            "INSERT INTO document_action_req (documentID, action_req) VALUES ?";

          connection.query(sql2, [action_req], function (err, result) {
            if (err) {
              console.log(err);
            }

            const sql3 =
              "INSERT INTO documentLogs (document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";

            connection.query(sql3, [destination], function (err, result) {
              if (err) {
                console.log(err);
              }

              fetchDocLogs.getDocLogs();
              docNumber.assignTrackingNumber();
              processedDoc.fetchProcessedDoc(creator, callback, socket);
              return callback("success");
            });
          });
        });
      } else {
        const sql4 =
          "INSERT INTO documents (documentID, creator, subject, doc_type, note, status, ref, category) VALUES ?";
        let values4 = [
          [documentID, creator, subject, doc_type, note, "1", "0", category],
        ];

        connection.query(sql4, [values4], function (err, result) {
          if (err) {
            console.log(err);
          }

          const sql5 =
            "INSERT INTO document_action_req (documentID, action_req) VALUES ?";

          connection.query(sql5, [action_req], function (err, result) {
            if (err) {
              console.log(err);
            }

            const sql5 =
              "INSERT INTO documentLogs (document_id, user_id, remarks, destinationType, destination, status, notification, date_time) VALUES ?";
            const values5 = [
              [
                documentID,
                documentLogs[0][1],
                documentLogs[0][2],
                documentLogs[0][3],
                documentLogs[0][4],
                documentLogs[0][5],
                documentLogs[0][6],
                dateTime,
              ],
            ];
            connection.query(sql5, [values5], function (err, result) {
              if (err) {
                console.log(err);
              }

              fetchDocLogs.getDocLogs();
              docNumber.assignTrackingNumber();
              processedDoc.fetchProcessedDoc(creator, callback, socket);
              return callback("success");
            });
          });
        });
      }
    }
  });
};

exports.insertDocument = insertDocument;
