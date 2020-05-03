import React, { useState } from "react";
import { withSnackbar } from "notistack";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import AddNewUser from "./AddNewUser";
import Reactotron from "reactotron-react-js";
import EditUser from "./EditUser";
function Users(props) {
  const users = props.systemUsers.filter(res => res.user_id !== parseInt(props.token));

  return (
    <div style={{ paddingBottom: 200, height: "100vh", overflow: "auto" }}>
      <AddNewUser
        open={props.open}
        handleClose={props.handleClose}
        sections={props.sections}
        handleInputChange={props.handleInputChange}
        handleSubmitUserRegistration={props.handleSubmitUserRegistration}
        error={props.error}
      />

      <EditUser
        open={props.openEditUser}
        handleClose={props.handleClose}
        userInfo={props.userInfo}
        sections={props.sections}
        handleSaveEditUser={props.handleSaveEditUser}
        handleOnChangeEditUser={props.handleOnChangeEditUser}
      />

      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button
          className={"btn btn-sm btn-success"}
          onClick={props.handleClickOpen}
        >
          Add New User
        </button>
      </div>

      <table className={"table table-striped"}>
        <thead>
          <tr style={{ background: "#2196F3", color: "#fff" }}>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Section</th>
            <th>Position</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            const sec = props.sections.filter(
              sec => sec.id === parseInt(user.secid)
            );

            return (
              <tr key={index}>
                <td>{user.employeeId}</td>
                <td>{user.name}</td>
                <td>
                  {sec.map(_sec => (
                    <>{_sec.type}</>
                  ))}
                </td>
                <td>{user.position}</td>
                <td>{user.role_id === "1"?"Admin": user.role_id === "2" ? "Member": "Super Admin"}</td>
                <td>
                  {user.accnt_status === "deleted" ? (
                    <span style={{ color: "red" }}>Deleted</span>
                  ) : user.accnt_status === "deactivated" ? (
                    <span style={{ color: "orange" }}>Deactivated</span>
                  ) : (
                    <span style={{ color: "green" }}>Active</span>
                  )}
                </td>
                <td>
                  <div>
                    <button
                      className={"btn btn-sm "}
                      onClick={props.handleEditUser.bind(null, user.user_id)}
                    >
                      <EditIcon />
                    </button>
                    <button className={"btn btn-sm "}>
                      <DeleteOutlineIcon
                        onClick={props.handleDeleteUser.bind(
                          null,
                            {id : user.user_id, name: user.name}
                        )}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default withSnackbar(Users);
