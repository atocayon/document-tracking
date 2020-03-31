const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;

let User = new Schema(
  {
    employeeId: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    username: {
      type: String,
      default: ""
    },
    password: {
      type: String
    },
    contact: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: ""
    },
    division: {
      type: String,
      default: ""
    },
    section: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    gender: {
      type: String,
      default: ""
    },
    bdate: {
      type: Date,
      default: Date.now()
    }
  },
  {
    collection: "users"
  }
);

User.pre("save", function(next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(this.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

User.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model("User", User);
