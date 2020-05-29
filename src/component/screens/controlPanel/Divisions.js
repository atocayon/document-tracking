import React from "react";
import { withSnackbar } from "notistack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddNewDivision from "./AddNewDivision";
import EditDivision from "./EditDivision";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

function Division(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ paddingBottom: 200, height: "100vh", overflow: "auto" }}>
      <AddNewDivision
        open={props.open}
        handleClose={props.handleClose}
        handleInputChangeAddNewDivision={props.handleInputChangeAddNewDivision}
        handleSubmitAddNewDivision={props.handleSubmitAddNewDivision}
        addNewDivisionInputValue={props.addNewDivisionInputValue}
        error={props.error}
      />

      <EditDivision
        open={props.openEditDivision}
        handleClose={props.handleClose}
        divisionInfo={props.divisionInfo}
        handleOnChangeEditDivision={props.handleOnChangeEditDivision}
        handleSaveEditDivision={props.handleSaveEditDivision}
      />
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button
          className={"btn btn-sm btn-success"}
          onClick={props.handleClickOpenAddNewDivision}
        >
          Add New Division
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#2196F3"}}>
              <TableCell style={{color: "#fff" }}>#</TableCell>
              <TableCell style={{color: "#fff" }}>Department</TableCell>
              <TableCell style={{color: "#fff" }}>Acronym</TableCell>
              <TableCell style={{color: "#fff" }}>Payroll name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.divisions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((division, index) => (
                <TableRow key={index}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>{division.department}</TableCell>
                  <TableCell>{division.depshort}</TableCell>
                  <TableCell>{division.payrollshort}</TableCell>
                  <TableCell>
                    <button
                      className={"btn btn-sm "}
                      onClick={props.handleEditDivision.bind(null, {
                        depid: division.depid,
                        depshort: division.depshort,
                      })}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className={"btn btn-sm "}
                      onClick={props.handleDeleteDivision.bind(null, {
                        depid: division.depid,
                        depshort: division.depshort,
                      })}
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 30, 50, 70, 80, 100]}
          component="div"
          count={props.divisions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default withSnackbar(Division);
