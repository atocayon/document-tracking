
const bcrypt = require("bcrypt");
const activeList = require("./fetchActiveUserList");
const login = (emailOrPassword, password, callback, connection) => {
    console.log(connection);
    let sql = "";
    sql += "SELECT ";
    sql += "a.user_id AS user_id, ";
    sql += "a.name AS name, ";
    sql += "a.password AS password, ";
    sql += "b.role AS role ";
    sql += "FROM users a ";
    sql += "JOIN users_role b ";
    sql += "ON a.role = b.role_id ";
    sql += "WHERE email = ? OR username = ?";

    connection.query(sql, [emailOrPassword, emailOrPassword], function (
        err,
        rows,
        fields
    ) {
        if (err) {
            console.log(err);
            return callback("server error");
        }
        console.log(rows);
        if (rows.length === 0) {
            return callback("unrecognize email");
        }

        if (rows.length > 0) {
            bcrypt.compare(password, rows[0].password, function (err, result) {
                if (err) {
                    console.log(err);
                    return callback("server error");
                }

                if (!result) {
                    console.log(result);
                    return callback("incorrect password");
                }

                console.log(result);

                const id = rows[0].user_id;
                const role = rows[0].role;
                const name = rows[0].name;
                const data = { id, name };
                const check_session_query =
                    "SELECT * FROM users_session WHERE userId = ?";
                connection.query(check_session_query, [id], function (
                    err,
                    rows,
                    fields
                ) {
                    if (err) {
                        console.log(err);
                        return callback("server error");
                    }
                    console.log(rows);
                    if (rows.length === 0) {
                        const sql1 =
                            "INSERT INTO users_session (userId, isDeleted) VALUES ?";
                        const values = [[id, 0]];
                        connection.query(sql1, [values], function (err, result) {
                            if (err) {
                                console.log(err);
                                return callback("server error");
                            }
                            activeList.fetchUserActiveList();
                            return callback(data);
                        });
                    }

                    if (rows) {
                        const update_session =
                            "UPDATE users_session SET isDeleted = ? WHERE userId = ?";
                        connection.query(update_session, [0, id], function (err, result) {
                            if (err) {
                                console.log(err);
                                return callback("server error");
                            }
                            console.log(result);
                            if (result) {
                                activeList.fetchUserActiveList();
                                return callback(data);
                            }
                        });
                    }
                });
            });
        }
    });
};

exports.login = login;