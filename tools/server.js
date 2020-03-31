const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();
const PORT = 4000;

const User = require("./users.model");
const UserSession = require("./UserSession");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/dts", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("========================================================");
  console.log("MongoDB database connection established successfully!!!");
  console.log("========================================================");
});

// ==========================================================================================
// ==========================================================================================
// Document Tracking System Users Data Control
//===========================================================================================
//===========================================================================================

//Add User
router.route("/addUser").post(function(req, res) {
  const { body } = req;
  let {employeeId,name,username,password,contact, email,division,section,position,address,gender } = body;

  email = email.toLowerCase();
  email = email.trim();

  User.findOne({ email: email }, function(err, previousUsers) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }

    if (previousUsers) {
      return res.status(409).json({
        success: false,
        message:
          "Error: Sorry, User email is already in use.You can try another one..."
      });
    }

    if (!previousUsers) {
      const user = new User({employeeId,name,username,password,contact, email,division,section,position,address,gender});

      user
        .save()
        .then(user => {
          res.status(200).json({ success: true, message: "Signed up" });
        })
        .catch(err => {
          res.status(500).json({ success: false, message: err });
        });
    }
  });
});

//Login
router.route("/login/:email/:password").post(function(req, res) {
  let email = req.params.email;
  let password = req.params.password;

  User.findOne({ email: email }, function(err, user) {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal Error Please Try Again" });
    } else if (!user) {
      res.status(404).json({ success: false, message: "Email unrecognized" });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal Error Please Try Again"
          });
        } else if (!same) {
          res.status(404).json({
            success: false,
            message: "Incorrect Password"
          });
        } else {
          console.log(user._id);
          const userSession = new UserSession();
          userSession.userId = user._id;
          userSession
            .save()
            .then(doc => {
              res.status(200).json({
                success: true,
                message: "Valid Sign in",
                token: doc.userId
              });
            })
            .catch(err => {
              throw err;
            });
        }
      });
    }
  });
});

router.route("/varifyToken/:token").get(function(req, res) {
  let token = req.params.token;
  UserSession.find({ userId: token, isDeleted: false }, function(err, session) {
    if (err) {
      res.status(500).json({ success: false, message: "Error: Server Error" });
    }

    if (session) {
      res.status(200).json({ success: true, message: "Valid" });
    } else {
      res.status(404).json({ success: false, message: "Invalid" });
    }
  });
});

//Fetch all users
router.route("/getUsers").get(function(req, res) {
  connection.db.collection("users", function(err, collection) {
    collection.find({}).toArray(function(err, users) {
      if (err) {
        res.status(500).send("Error: Server Error");
      } else {
        res.json(users);
      }
    });
  });
});

//Fetch All users by section
router.route("/sectionUser/:section").get(function(req, res) {
  let section = req.params.section;
  User.find({ section: section }, function(err, users) {
    if (!users) {
      res.status(404).send("Data Not Found");
    } else {
      res.json(users);
    }
  });
});

//Fetch Users Data By ID
router.route("/user/:id").get(function(req, res) {
  let id = req.params.id;
  User.find({ _id: id }, function(err, user) {
    if (err) {
      res.status(500).json({ success: false, message: "Error: Server Error" });
    }

    if (!user) {
      res.status(404).json({ success: false, message: "Data Not Found" });
    }

    res.status(200).json(user);
  });
});

//Update Users Info
router.route("/updateUser/:id").post(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    if (!user) {
      res.status(404).send("Data Not Found");
    } else {
      user.employeeId = req.body.employeeId;
      user.name = req.body.name;
      user.username = req.body.username;
      user.password = req.body.password;
      user.contact = req.body.contact;
      user.email = req.body.email;
      user.division = req.body.division;
      user.section = req.body.section;
      user.position = req.body.position;
      user.address = req.body.address;
      user.gender = req.body.gender;

      user
        .save()
        .then(user => {
          res
            .status(200)
            .json({ success: true, message: "Data updated successfully..." });
        })
        .catch(err => {
          res
            .status(500)
            .json({ success: false, message: "Error: Update failed" });
        });
    }
  });
});
// ==========================================================================================
// ==========================================================================================
// End Users Data Control
//===========================================================================================
//===========================================================================================

app.use("/dts", router);
app.listen(PORT, () => {
  console.log("========================================================");
  console.log("SERVER IS RUNNING ON PORT: " + PORT);
  console.log("========================================================");
});
