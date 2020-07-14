
const sendEmail = (user_id, subject, destination, callback, connection, transporter) => {
  let selectSender = "";
  selectSender += "SELECT ";
  selectSender += "a.name, ";
  selectSender += "b.secshort ";
  selectSender += "FROM users a ";
  selectSender += "JOIN sections b ON a.section = b.secid ";
  selectSender += "WHERE a.user_id = ? ";
  connection.query(selectSender, [parseInt(user_id)], function (
    err,
    res_sender,
    fields
  ) {
    if (err) {
      console.log(err);
      return callback("server error");
    }

    if (destination.length > 1) {
      for (let des = 0; des < destination.length; des++) {
        let selectDestination = "";
        selectDestination += "SELECT ";
        selectDestination += "a.email ";
        selectDestination += "FROM users a ";
        selectDestination += "JOIN sections b ON a.section = b.secid ";
        selectDestination += "WHERE b.secshort = ? ";

        connection.query(selectDestination, [destination[des][4]], function (
          err,
          res_destination,
          fields
        ) {
          if (err) {
            console.log(err);
            return callback("server error");
          }

          if (res_destination.length > 0) {
            for (
              let emailDes = 0;
              emailDes < res_destination.length;
              emailDes++
            ) {
              let mailOptions = {
                from: "nationalmaritimepolytechnic@gmail.com",
                to: res_destination[emailDes].email,
                subject: "NMP|DTS Notification",
                text:
                  res_sender[0].secshort +
                  " forwarded a document to your office/unit/section with a subject " +
                  subject,
              };

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  return callback("server error");
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            }
          }
        });
      }
    }

    if (destination.length > 0) {
      let selectDestination = "";
      selectDestination += "SELECT ";
      selectDestination += "a.email ";
      selectDestination += "FROM users a ";
      selectDestination += "JOIN sections b ON a.section = b.secid ";
      selectDestination += "WHERE b.secshort = ? ";

      connection.query(selectDestination, [destination[0][4]], function (
        err,
        rows,
        fields
      ) {
        if (err) {
          console.log(err);
          return callback("server error");
        }

        if (rows.length > 0) {
          let mailOptions = {
            from: "nationalmaritimepolytechnic@gmail.com",
            to: rows[0].email,
            subject: "NMP|DTS Notification",
            text:
              res_sender[0].secshort +
              " forwarded a document to your office/unit/section with a subject " +
              subject,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return callback("server error");
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      });
    }
  });
};

exports.sendEmail = sendEmail;
