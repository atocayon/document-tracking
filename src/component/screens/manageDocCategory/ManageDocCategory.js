import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { getFromStorage } from "../../storage";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";
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
import { addNewDocCategory } from "../../../redux/actions/manageDocumentCategory";
import { fetchDocCategory } from "../../../redux/actions/manageDocumentCategory";
import { fetchUserById } from "../../../redux/actions/fetchUserById";
import { onChangeEditDocCategory } from "../../../redux/actions/manageDocumentCategory";
import { saveEditDocCategory } from "../../../redux/actions/manageDocumentCategory";
import { deleteDocCategory } from "../../../redux/actions/manageDocumentCategory";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
import CheckIcon from "@material-ui/icons/Check";
import UserList from "../../common/userList/UserList";
import CircularProgress from "../../common/circularProgress/CircularProgressComponent";
const tableHead = ["Document Categories", ""];

function ManageDocCategory(props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [page, setPage] = React.useState(0);
  const [category, setCategory] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [token, setToken] = useState("");
  const [editDocCategory, setEditDocCategory] = useState({});
  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      setToken(token);
      async function fetch() {
        await props.fetchDocCategory(token);
        await props.fetchUserById(token);
      }
      fetch().catch((err) => {
        throw err;
      });
    }
    setEndSession(!(obj && obj.token));
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOnChangeAddNewDocCategory = ({ target }) => {
    setCategory(target.value);
  };

  const handleSubmitNewDocumentCategory = async (e) => {
    e.preventDefault();
    await props.addNewDocCategory(token, category);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (val) => {
    setEditDocCategory({ ...editDocCategory, [val]: !editDocCategory[val] });
  };

  const handleSave = async () => {
    setEditDocCategory({});
    await props.saveEditDocCategory(props.doc_category, token);
  };

  const handleDelete = async (val) => {
    await props.deleteDocCategory(val, token);
  };

  return (
    <>
      {loading && <CircularProgress />}
      <Grid container>
        <PrimarySearchAppBar />
        <Grid item xs={2}>
          <SideBarNavigation
            open={open}
            user={props.user}
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
                              key={column}
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
                            .map((data, index) => (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={data.id}
                              >
                                <TableCell>
                                  <input
                                    className={"form-control"}
                                    type={"text"}
                                    name={data.id}
                                    style={{
                                      border: "1px solid white",
                                      padding: 10,
                                      background: "#fff",
                                    }}
                                    value={data.category}
                                    disabled={!editDocCategory[data.id]}
                                    onChange={props.onChangeEditDocCategory}
                                  />
                                </TableCell>
                                <TableCell>
                                  {!editDocCategory[data.id] && (
                                    <button
                                      title={"Click to edit"}
                                      className={"btn btn-sm"}
                                      onClick={handleEdit.bind(null, data.id)}
                                    >
                                      <EditIcon />
                                    </button>
                                  )}
                                  {editDocCategory[data.id] && (
                                    <button
                                      title={"Click to save changes"}
                                      className={"btn btn-sm"}
                                      onClick={handleSave}
                                    >
                                      <CheckIcon />
                                    </button>
                                  )}
                                  &nbsp;&nbsp;&nbsp;
                                  <button
                                    title={"Click to delete"}
                                    className={"btn btn-sm"}
                                    onClick={handleDelete.bind(null, data.id)}
                                  >
                                    <DeleteIcon />
                                  </button>
                                </TableCell>
                              </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
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
        <Grid item xs={2}>
          <UserList />
        </Grid>
      </Grid>
    </>
  );
}

function mapStateToProps(state) {
  return {
    doc_category: state.manageDocumentCategory,
    insert: state.addNewDocCategory,
    user: state.fetchUserById,
  };
}

const mapDispatchToProps = {
  addNewDocCategory,
  fetchDocCategory,
  onChangeEditDocCategory,
  saveEditDocCategory,
  deleteDocCategory,
  fetchUserById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ManageDocCategory));
