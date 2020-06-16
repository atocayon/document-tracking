import React, { Component, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { getFromStorage } from "../../storage";
import Paper from "@material-ui/core/Paper";
import { Link, Redirect } from "react-router-dom";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AddIcon from "@material-ui/icons/Add";
import InputField from "../../common/textField/InputField";
import io from "socket.io-client";
import endPoint from "../../endPoint";
import { addNewDocCategory } from "../../../redux/actions/manageDocumentCategory";
import { fetchDocCategory } from "../../../redux/actions/manageDocumentCategory";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
let socket;
const tableHead = ["Document Categories", ""];

function MyDocuments(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [page, setPage] = React.useState(0);
  const [category, setCategory] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [token, setToken] = useState("");
  useEffect(() => {
    socket = io(endPoint.ADDRESS);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      setToken(token);
      async function fetch() {
        await props.fetchDocCategory(token, socket);
      }
      fetch().catch((err) => {
        throw err;
      });
    }
    setEndSession(!(obj && obj.token));
  }, [socket]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOnChangeAddNewDocCategory = ({ target }) => {
    setCategory(target.value);
  };

  const handleSubmitNewDocumentCategory = async (e) => {
    e.preventDefault();
    await props.addNewDocCategory(token, category, socket);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container spacing={3}>
      <PrimarySearchAppBar />
      <Grid item xs={2}>
        <SideBarNavigation
          open={open}
          setOpen={setOpen}
          handleClick={handleClick}
        />
      </Grid>
      <Grid item xs={8}>
        {endSession && <Redirect to={"/"} />}
        <Paper
          elevation={3}
          style={{
            marginTop: 70,
            paddingTop: 0,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div className={"jumbotron"} style={{ padding: 50 }}>
            <div className={"row"}>
              <div className={"col-md-6"}></div>
              <div className={"col-md-6"}></div>
            </div>
          </div>

          <div style={{ marginLeft: 50, marginRight: 20 }}>
            <div className={"row"}>
              <div className={"col-md-6"}>
                <div style={{ padding: 20 }}>
                  <form onSubmit={handleSubmitNewDocumentCategory}>
                    <h6>
                      <AddIcon /> New Document Category
                    </h6>
                    <br />
                    <InputField
                      label={"Document Category"}
                      variant={"outlined"}
                      onChange={handleOnChangeAddNewDocCategory}
                      // error={error.email}
                      type={"search"}
                    />
                    <br />
                    <br />
                    <button
                      type={"submit"}
                      className={"btn btn-info"}
                      title={"Click to Save"}
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
              <div className={"col-md-6"}>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {tableHead.map((column, index) => (
                          <TableCell
                            style={{ color: "#2196F3", fontWeight: "bold" }}
                            key={index}
                          >
                            {index === 0 && <DescriptionIcon />} {column}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.doc_category.length > 0 &&
                        props.doc_category
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((data) => (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={data.category}
                            >
                              <TableCell key={data.category}>
                                {data.category}
                              </TableCell>
                              <TableCell key={data.category}>
                                <button className={"btn btn-sm"}>
                                  <EditIcon />
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <button className={"btn btn-sm"}>
                                  <DeleteIcon />
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={props.doc_category.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    doc_category: state.manageDocumentCategory,
    insert: state.addNewDocCategory,
  };
}

const mapDispatchToProps = {
  addNewDocCategory,
  fetchDocCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(MyDocuments));
