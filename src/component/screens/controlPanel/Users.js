import React, { useState } from "react";
import { withSnackbar } from "notistack";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import AddNewUser from "./AddNewUser";

function Users(props) {
  const users = props.systemUsers.filter(res => res.role !== "super_admin");

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AddNewUser open={open} handleClose={handleClose} />

      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button className={"btn btn-sm btn-success"} onClick={handleClickOpen}>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.employeeId}</td>
              <td>{user.name}</td>
              <td>{user.secshort}</td>
              <td>{user.position}</td>
              <td>{user.role}</td>
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
                  <button className={"btn btn-sm "}>
                    <EditIcon />
                  </button>
                  <button className={"btn btn-sm "}>
                    <DeleteOutlineIcon />
                  </button>
                </div>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default withSnackbar(Users);
