import React from "react";
import { withSnackbar } from "notistack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddNewSection from "./AddNewSection";
import EditSection from "./EditSection";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

function Sections(props) {
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
      <AddNewSection
        open={props.openAddNewSection}
        handleClose={props.handleClose}
        divisions={props.divisions}
        handleInputChangeAddNewSection={props.handleInputChangeAddNewSection}
        handleSubmitAddNewSection={props.handleSubmitAddNewSection}
        error={props.error}
      />

      <EditSection
        open={props.openEditSection}
        handleClose={props.handleClose}
        section={props.section}
        divisions={props.divisions}
        handleOnChangeEditSection={props.handleOnChangeEditSection}
        handleSaveEditSection={props.handleSaveEditSection}
      />

      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button
          className={"btn btn-sm btn-success"}
          onClick={props.handleClickOpenAddNewSection}
        >
          Add New Section
        </button>
        <br/>
        <br/>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ background: "#2196F3" }}>
                <TableCell style={{ color: "#fff" }}>#</TableCell>
                <TableCell style={{ color: "#fff" }}>
                  Division / Department
                </TableCell>
                <TableCell style={{ color: "#fff" }}>Section</TableCell>
                <TableCell style={{ color: "#fff" }}>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.sections
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((res, index) => {
                  const division = props.divisions.filter(
                    (data) => data.depid === parseInt(res.divid)
                  );

                  return (
                    <TableRow key={index}>
                      <TableCell>{++index}</TableCell>
                      <TableCell>
                        {division.map((div) => (
                          <>{div.department}</>
                        ))}
                      </TableCell>
                      <TableCell>
                        {res.section} - ({res.secshort})
                      </TableCell>
                      <TableCell>
                        {res.active === 1 ? (
                          <span style={{ color: "green" }}>Active</span>
                        ) : (
                          <span style={{ color: "red" }}>Not Active</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <button
                          className={"btn btn-sm "}
                          onClick={props.handleEditSection.bind(
                            null,
                            res.secid
                          )}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className={"btn btn-sm "}
                          onClick={props.handleDeleteSection.bind(null, {
                            id: res.secid,
                            section: res.section,
                          })}
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 30, 50, 70, 80, 100]}
            component="div"
            count={props.sections.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div>
  );
}

export default withSnackbar(Sections);
