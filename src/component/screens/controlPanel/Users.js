import React, { useState } from "react";
import { withSnackbar } from "notistack";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import AddNewUser from "./AddNewUser";
import Reactotron from "reactotron-react-js";
import EditUser from "./EditUser";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";

function Users(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const users = props.systemUsers.filter(
    (res) => res.user_id !== parseInt(props.token)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#2196F3"}}>
              <TableCell style={{color: "#fff" }}>#</TableCell>
              <TableCell style={{color: "#fff" }}>Employee ID</TableCell>
              <TableCell style={{color: "#fff" }}>Name</TableCell>
              <TableCell style={{color: "#fff" }}>Section</TableCell>
              <TableCell style={{color: "#fff" }}>Position</TableCell>
              <TableCell style={{color: "#fff" }}>Role</TableCell>
              <TableCell style={{color: "#fff" }}>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
              const sec = props.sections.filter(
                (sec) => sec.id === parseInt(user.secid)
              );
              return (
                <TableRow key={index}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>{user.employeeId}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {sec.map((_sec) => (
                      <>{_sec.type}</>
                    ))}
                  </TableCell>
                  <TableCell>{user.position}</TableCell>
                  <TableCell>
                    {user.role_id === "1"
                      ? "Admin"
                      : user.role_id === "2"
                      ? "Member"
                      : "Super Admin"}
                  </TableCell>
                  <TableCell>
                    {user.accnt_status === "deleted" ? (
                      <span style={{ color: "red" }}>Deleted</span>
                    ) : user.accnt_status === "deactivated" ? (
                      <span style={{ color: "orange" }}>Deactivated</span>
                    ) : (
                      <span style={{ color: "green" }}>Active</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <button
                        className={"btn btn-sm "}
                        onClick={props.handleEditUser.bind(null, user.user_id)}
                      >
                        <EditIcon />
                      </button>
                      <button className={"btn btn-sm "}>
                        <DeleteOutlineIcon
                          onClick={props.handleDeleteUser.bind(null, {
                            id: user.user_id,
                            name: user.name,
                          })}
                        />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 30, 50, 70, 80, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default withSnackbar(Users);
