const nodemailer = require("nodemailer");

const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);


//Queries
const user_login = require("./query/login");
const user_logout = require("./query/logout");
const active_user_list = require("./query/fetchActiveUserList");
const newUser = require("./query/addNewUser");
const fetchSystemUsers = require("./query/fetchAllUsers");
const fetchDocLogs = require("./query/fetchDocLogs");
const docNumber = require("./query/assignTrackingNum");
const newDocument = require("./query/insertNewDocument");
const processedDoc = require("./query/fetchProcessedDoc");
const expandLogs = require("./query/expandDocLogs");
const receiveDoc = require("./query/receiveDocument");
const track = require("./query/trackDocument");
const pending = require("./query/countPendingDoc");

const docCategory = require("./query/fetchDocCategory");

const docSubProcess = require("./query/fetchSubProcess");
const docSubDocument = require("./query/fetchSubDocument");

const userToken = require("./query/verifyToken");
const currentUser = require("./query/fetchCurrentUser");
const sectionUser = require("./query/fetchSectionUsers");
const userManagement = require("./query/userManagement");
const sections = require("./query/fetchSectionList");

const divisions = require("./query/fetchDivisions");

const docType = require("./query/fetchDocumentType");

const fetchDocument = require("./query/fetchDocumentById");
const fetchSectionDocuments = require("./query/fetchSectionDocuments");
const fetchPendingDocuments = require("./query/fetchPendingDocuments");

const afterDocumentReceive = require("./query/afterDocumentReceived");
const searchBySubj = require("./query/searchBySubject");
const email = require("./query/sendEmail");
//EndQueries

server.listen(PORT, () => {
  console.log("========================================================");
  console.log("SERVER IS RUNNING ON PORT: " + PORT);
  console.log("========================================================");
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  service: "gmail",
  auth: {
    user: "nationalmaritimepolytechnic@gmail.com",
    pass: "xgedzrlgfrelllhl",
  },
});

// ==========================================================================================
// ==========================================================================================
// Document Tracking System Users Data Control
//===========================================================================================
//===========================================================================================

io.on("connection", (socket) => {
  //Login
  socket.on("login", (emailOrPassword, password, callback) => {
    user_login.login(emailOrPassword, password, callback);
  });

  //Logout
  socket.on("logout", (id, callback) => {
    user_logout.logout(id, callback);
  });

  //active users list
  socket.on("active_users", () => {
    active_user_list.fetchUserActiveList();
  });

  //Add User
  socket.on(
    "addUser",
    (
      role,
      employeeId,
      name,
      username,
      password,
      contact,
      email,
      section,
      position,
      callback
    ) => {
      newUser.addUser(
        role,
        employeeId,
        name,
        username,
        password,
        contact,
        email,
        section,
        position,
        callback
      );
    }
  );

  //Fetch All Users
  socket.on("getAllUsers", () => {
    fetchSystemUsers.Users();
  });

  //Fetch document Logs
  socket.on("getDocumentLogs", () => {
    fetchDocLogs.getDocLogs();
  });

  //Assign Document tracking number
  socket.on("assignTrackingNum", () => {
    docNumber.assignTrackingNumber();
  });

  //Insert Document
  socket.on(
    "addDocument",
    (
      documentID,
      creator,
      subject,
      doc_type,
      note,
      action_req,
      documentLogs,
      category,
      callback
    ) => {
      newDocument.insertDocument(
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
      );
    }
  );

  //Expand/dropdown in doc logs
  socket.on("expandDocLogs", (doc_id, status) => {
    expandLogs.expandDocLogs(doc_id, status, socket);
  });

  //Receive Documents
  socket.on(
    "receiveDocument",
    (documentTracking, user_id, user_section, callback) => {
      receiveDoc.receiveDocument(
        documentTracking,
        user_id,
        user_section,
        callback,
        socket,
        transporter
      );
    }
  );

  //Track Document
  socket.on("tracking", (data) => {
    track.trackDocument(data, socket);
  });

  //Count Pending
  socket.on("countPending", (user_id) => {
    pending.countPending(user_id, socket);
  });

  //Fetch Document Category
  socket.on("fetchDocumentCategory", (token, callback) => {
    docCategory.fetchDocumentCategory(token, callback, socket);
  });

  //Add New Document Category
  socket.on("addNewDocumentCategory", (token, category, callback) => {
    docCategory.addNewDocCategory(
      token,
      category,
      callback,
      socket
    );
  });

  //Update Doc Category
  socket.on("updateDocumentCategory", (data, token, callback) => {
    docCategory.updateDocumentCategory(
      data,
      token,
      callback,
      socket
    );
  });

  //Delete Doc Category
  socket.on("deleteDocCategory", (id, token, callback) => {
    docCategory.deleteDocCategory(id, token, callback, socket);
  });

  //Fetch Processed doc
  socket.on("fetchProcessedDoc", (token, callback) => {
    processedDoc.fetchProcessedDoc(token, callback, socket);
  });

  //Fetch SubProcess
  socket.on("fetchSubProcess", (tracking, callback) => {
    docSubProcess.fetchSubProcess(tracking, callback);
  });

  //Fetch Sub Document
  socket.on("fetchSubDocument", (tracking, callback) => {
    docSubDocument.fetchSubDocument(tracking, callback);
  });

  //Verify User Token
  socket.on("verifyToken", (token, callback) => {
    userToken.verifyToken(token, callback);
  });

  //Fetch user
  socket.on("user", (token, callback) => {
    currentUser.fetchCurrentUser(token, callback);
  });

  //Fetch Section Users
  socket.on("sectionUser", (secid, callback) => {
    sectionUser.fetchSectionUsers(secid, callback);
  });

  //Update User
  socket.on("updateUser", (data, callback) => {
    userManagement.updateUser(data, callback);
  });

  //Update User Role
  socket.on("updateRole", (role, id, secid, callback) => {
    userManagement.updateRole(role, id, secid, callback);
  });

  //Update Status
  socket.on("updateStatus", (status, id, secid, callback) => {
    userManagement.updateStatus(status, id, secid, callback);
  });

  //user Transfer office
  socket.on("transferOffice", (secid, id, callback) => {
    userManagement.transferOffice(secid, id, callback);
  });

  //User accnt deletion
  socket.on("deleteUser", (id, secid, callback) => {
    userManagement.accntDeletion(id, secid, callback);
  });

  //Fetch Sections List
  socket.on("sections", (callback) => {
    sections.fetchSectionList(callback);
  });

  //Fetch Section By ID
  socket.on("section", (secid, callback) => {
    sections.fetchSectionById(secid, callback);
  });

  //Add new section
  socket.on("addNewSection", (division, section, secshort, callback) => {
    sections.addNewSection(division, section, secshort, callback);
  });

  //Update Section
  socket.on("updateSection", (data, callback) => {
    sections.updateSection(data, callback);
  });

  //Delete Section
  socket.on("deleteSection", (secid, callback) => {
    sections.deleteSection(secid, callback);
  });

  //Fetch Division
  socket.on("fetchDivisions", (callback) => {
    divisions.fetchDivisions(callback);
  });

  //Fetch division by id
  socket.on("fetchDivisionById", (divid, callback) => {
    divisions.byId(divid, callback);
  });

  //Add New Division
  socket.on("addDivision", (data, callback) => {
    divisions.addNewDivision(data, callback);
  });

  //Update Division
  socket.on("updateDivision", (data, callback) => {
    divisions.updateDivision(data, callback);
  });

  //Delete Division
  socket.on("deleteDivision", (divid, callback) => {
    divisions.deleteDivision(divid, callback);
  });

  //fetch document Type
  socket.on("documentType", (callback) => {
    docType.fetchDocumentType(callback);
  });

  //fetch document type by id
  socket.on("fetchDocumentType", (docTypeId, callback) => {
    docType.fetchDocumentTypeById(docTypeId, callback);
  });

  //add new document type
  socket.on("addDocumentType", (type, callback) => {
    docType.addNewDocumentType(type, callback);
  });

  //update document type
  socket.on("updateDocumentType", (data, callback) => {
    docType.updateDocumentType(data, callback);
  });

  //delete document type
  socket.on("deleteDocumentType", (docTypeId, callback) => {
    docType.deleteDocumentType(docTypeId, callback);
  });

  //fetch document by id
  socket.on("fetchDocument", (docId, callback) => {
    fetchDocument.fetchDocument(docId, callback);
  });

  //fetch action required
  socket.on("fetchActionReq", (docId, callback) => {
    fetchDocument.fetchActionReq(docId, callback);
  });

  //fetch document destination
  socket.on("fetchDocumentDestination", (docId, callback) => {
    fetchDocument.fetchDocumentDestination(docId, callback);
  });

  //fetch document DateTimeReleased
  socket.on("fetchDateTimeReleased", (receiver_id, docId, callback) => {
    fetchDocument.fetchDateTimeReleased(
      receiver_id,
      docId,
      callback
    );
  });

  //fetch document ActionTaken
  socket.on("fetchActionTaken", (receiver_id, docId, callback) => {
    fetchDocument.fetchActionTaken(receiver_id, docId, callback);
  });

  //fetch fetchDocumentBarcodes
  socket.on("fetchDocumentBarcodes", (docId, callback) => {
    fetchDocument.fetchDocumentBarcodes(docId, callback);
  });

  //fetch fetchDocumentBarcode
  socket.on("fetchDocumentBarcode", (docId, callback) => {
    fetchDocument.fetchDocumentBarcode(docId, callback);
  });

  socket.on("fetchDocumentRouteType", (docId, callback) => {
    fetchDocument.fetchDocumentRouteType(docId, callback);
  });

  //fetch section documents
  socket.on("fetchSectionDocuments", (token, folder, callback) => {
    fetchSectionDocuments.fetchSectionDocuments(
      token,
      folder,
      callback
    );
  });

  //fetch pending documents
  socket.on("fetchPendingDocuments", (userId, callback) => {
    fetchPendingDocuments.fetchPendingDocument(userId, callback);
  });

  //after document received
  socket.on(
    "afterDocumentReceive",
    (
      documentId,
      user_id,
      remarks,
      destinationType,
      destination,
      status,
      callback
    ) => {
      afterDocumentReceive.afterDocumentReceive(
        documentId,
        user_id,
        remarks,
        destinationType,
        destination,
        status,
        callback
      );
    }
  );

  //Search by subject
  socket.on("searchBySubject", (subj, callback) => {
    searchBySubj.search(subj, callback);
  });

  //send email notification on add document
  socket.on("sendEmail", (user_id, subject, destination, callback) => {
    email.sendEmail(
      user_id,
      subject,
      destination,
      callback,
      transporter
    );
  });

  socket.on("disconnect", () => {
    console.log("Waiting for socket data connection...");
  });
});

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

// ==========================================================================================
// ==========================================================================================
// End Users Data Control
//===========================================================================================
//===========================================================================================

// ==========================================================================================
// ==========================================================================================
// Document Data Control
//===========================================================================================
//===========================================================================================

// //Insert Draft
// router.route("/draft").post(function (req, res) {
//   const { documentID, creator, subject, doc_type, note, action_req } = req.body;
//   const sql =
//     "INSERT INTO documents (documentID, creator, subject, doc_type, note, status) VALUES ?";
//   const values = [[documentID, creator, subject, doc_type, note, "0"]];
//   connection.query(sql, [values], function (err, result) {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//
//     const sql_action_req =
//       "INSERT INTO document_action_req (documentID, action_req) VALUES ?";
//     connection.query(sql_action_req, [action_req], function (err, result) {
//       if (err) {
//         console.log(err);
//         res.status(500).send(err);
//       }
//
//       res.status(200).send(result);
//     });
//   });
// });
//
// //Get draft by user
// router.route("/getDrafts/:user").get(function (req, res) {
//   const userID = req.params.user;
//   let sql = "";
//   sql += "SELECT a.documentID as documentID, ";
//   sql += "a.subject as subject, ";
//   sql += "b.type as doc_type ";
//   sql += "FROM documents a ";
//   sql += "JOIN document_type b ";
//   sql += "ON a.doc_type = b.id ";
//   sql += "WHERE a.creator = ? ";
//   sql += "AND a.status = ? ";
//   sql += "ORDER BY a.date_time_created DESC ";
//
//   connection.query(sql, [userID, "0"], function (err, rows, fields) {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//
//     res.status(200).send(rows);
//   });
// });

//Fetch the last person/office/user document forwarder
// router.route("/lastForwarder/:doc_id").get(function (req, res) {
//   let sql = "";
//   sql += "SELECT  ";
//   sql += "a.remarks AS remarks, ";
//   sql += "a.destinationType AS destinationType ";
//   sql += "b.name AS sender, ";
//   sql += "b.position AS senderPosition, ";
//   sql += "c.secshort AS senderSection ";
//   sql += "FROM documentLogs a ";
//   sql += "JOIN users b ";
//   sql += "ON a.user_id = b.user_id ";
//   sql += "JOIN sections c ";
//   sql += "ON b.section = c.secid ";
//   sql += "WHERE a.document_id = ? ";
//   sql += "AND a.status = ? ";
//   sql += "ORDER BY a.date_time DESC LIMIT 1";
//
//   connection.query(sql, [req.params.doc_id, "2"], function (err, rows, fields) {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//     console.log(rows[0]);
//     res.status(200).send(rows[0]);
//   });
// });

//notification
// router.route("/notification/:user_section").get(function (req, res) {
//   const section = req.params.user_section;
//   let sql = "";
//   sql += "SELECT a.subject AS subject, ";
//   sql += "b.name AS creator, ";
//   sql += "d.type AS doc_type, ";
//   sql += "e.document_id AS documentId ";
//   sql += "FROM documents a ";
//   sql += "JOIN users b ";
//   sql += "ON a.creator = b.user_id ";
//   sql += "JOIN document_type d ";
//   sql += "ON a.doc_type = d.id ";
//   sql += "JOIN documentLogs e ";
//   sql += "ON a.documentID = e.document_id ";
//   sql += "WHERE e.destination = ? ";
//   sql += "AND e.notification = ? ";
//   connection.query(sql, [section, "0"], function (err, rows, fields) {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//
//     res.status(200).send(rows);
//   });
// });

// ==========================================================================================
// ==========================================================================================
// End Document Data Control
//===========================================================================================
//===========================================================================================
