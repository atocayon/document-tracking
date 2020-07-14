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
//Fetch Processed Doc
const fetchProcessedDoc = (token, callback, socket) => {
    let sql = "";
    sql += "SELECT DISTINCT a.document_id AS document_id, ";
    sql += "DATE_FORMAT(a.date_time, '%M %d, %Y @ %h:%i:%s %p ') AS date_time, ";
    sql += "b.subject AS subject, ";
    sql += "c.type AS type, ";
    sql += "d.status AS status ";
    sql += "FROM documentLogs a ";
    sql += "LEFT JOIN documents b ON a.document_id = b.documentID ";
    sql += "LEFT JOIN document_type c ON b.doc_type = c.id ";
    sql += "LEFT JOIN documentStatus d ON a.status = d.statid ";
    sql += "WHERE a.user_id = ? ";
    sql += "AND (a.status = ? OR a.status = ?) ";
    sql += "ORDER BY date_time DESC";
    connection.query(sql, [token, "2", "1"], function (err, rows, fields) {
        if (err) {
            return callback(err);
        }

        socket.emit("processedDocument", rows);
    });
};

exports.fetchProcessedDoc = fetchProcessedDoc;