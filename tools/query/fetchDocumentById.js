const connection = require("../dbConnection/connection");

const fetchDocument = (docId, callback) => {
  let sql = "";
  sql += "SELECT a.subject as subject, ";
  sql += "a.note, ";
  sql +=
    "DATE_FORMAT(a.date_time_created, '%M %d, %Y @ %h:%i %p') AS date_time_created, ";
  sql += "b.id as docType_id, ";
  sql += "b.type as type, ";
  sql += "c.name AS creator, ";
  sql += "c.position AS creatorPosition, ";
  sql += "d.secshort AS creatorSection ";
  sql += "FROM documents a ";
  sql += "JOIN document_type b ";
  sql += "ON a.doc_type = b.id ";
  sql += "JOIN users c ";
  sql += "ON a.creator = c.user_id ";
  sql += "JOIN sections d ";
  sql += "ON c.section = d.secid ";
  sql += "WHERE a.documentID = ? ";
  connection.query(sql, [docId], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows[0]);
  });
};

const fetchActionReq = (docId, callback) => {
  const sql = "SELECT * FROM document_action_req WHERE documentID = ?";
  connection.query(sql, [docId], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows);
  });
};

const fetchDocumentDestination = (docId, callback) => {
  let sql = "";
  sql += "SELECT a.remarks AS remarks, a.document_id AS document_id, ";
  sql += "DATE_FORMAT(a.date_time, '%c/%d/%y %h:%i %p') AS date_time_receive, ";
  sql += "b.name AS receiver, ";
  sql += "a.user_id AS receiver_id, ";
  sql += "c.secshort AS section ";
  sql += "FROM documentLogs a ";
  sql += "JOIN users b ";
  sql += "ON a.user_id = b.user_id ";
  sql += "JOIN sections c ";
  sql += "ON b.section = c.secid ";
  sql += "WHERE a.document_id = ? ";
  sql += "AND a.status = ?";

  connection.query(sql, [docId, "1"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows);
  });
};

const fetchDateTimeReleased = (receiver_id, docId, callback) => {
  let sql = "";
  sql +=
    "SELECT DATE_FORMAT(date_time, '%c/%d/%y %h:%i %p') AS date_time_released ";
  sql += "FROM documentLogs ";
  sql += "WHERE user_id = ? AND document_id = ? AND (status = ? || status =?)";
  connection.query(sql, [receiver_id, docId, "2", "4"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows[0]);
  });
};

const fetchActionTaken = (receiver_id, docId, callback) => {
  const sql =
    "SELECT remarks FROM documentLogs WHERE user_id = ? AND document_id = ? AND (status = ? || status = ?)";
  connection.query(sql, [receiver_id, docId, "2", "4"], function (
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
      return callback("server error");
    }
    return callback(rows[0]);
  });
};

const fetchDocumentBarcodes = (docId, callback) => {
  let sql = " ";
  sql += "SELECT ";
  sql += "a.documentID, ";
  sql += "b.destination ";
  sql += "FROM documents a ";
  sql += "JOIN documentLogs b ON a.documentID = b.document_id ";
  sql += "WHERE a.ref = ? AND b.status = ? ";
  connection.query(sql, [docId, "2"], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows);
  });
};

const fetchDocumentBarcode = (docId, callback) => {
  let sql = "";
  sql += "SELECT ";
  sql += "a.documentID ";
  sql += "FROM documents a ";
  sql += "WHERE a.documentID = ? ";

  connection.query(sql, [docId], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows);
  });
};

const fetchDocumentRouteType = (docId, callback) => {
  let sql = "";
  sql +=
      "SELECT a.creator AS creator, a.subject AS subject, a.doc_type AS doc_type, a.note AS note ";
  sql += "FROM documents a WHERE a.ref = ? ";
  connection.query(sql, [docId], function (err, rows, fields) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    return callback(rows);
  });
};

exports.fetchDocumentRouteType = fetchDocumentRouteType;
exports.fetchDocumentBarcode = fetchDocumentBarcode;
exports.fetchDocumentBarcodes = fetchDocumentBarcodes;
exports.fetchActionTaken = fetchActionTaken;
exports.fetchDateTimeReleased = fetchDateTimeReleased;
exports.fetchDocumentDestination = fetchDocumentDestination;
exports.fetchActionReq = fetchActionReq;
exports.fetchDocument = fetchDocument;
