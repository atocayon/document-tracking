import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { getFromStorage } from "../../storage";
import { fetchSectionDocuments } from "../../../redux/actions/fetchSectionDocuments";
import { fetchUserById } from "../../../redux/actions/fetchUserById";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import DescriptionIcon from "@material-ui/icons/Description";
import TablePagination from "@material-ui/core/TablePagination";
import UserList from "../../common/userList/UserList";
import InputField from "../../common/textField/InputField";
import { handleSearchSectionDocuments } from "../../../redux/actions/handleSearchSectionDocuments";
import CircularProgress from "../../common/circularProgress/CircularProgressComponent";
import io from "socket.io-client";
function UserFolder(props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [userID, setUserID] = useState("");
  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      setUserID(token);
      async function fetch() {
        await props.fetchSectionDocuments(token, props.match.params.folder);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      {loading && <CircularProgress />}
      <div className={"row"}>
        <PrimarySearchAppBar />
        <div className={"col-md-2"}>
          <SideBarNavigation
            open={open}
            user={props.user}
            setOpen={setOpen}
            handleClick={handleClick}
          />
        </div>
        <div className={"col-md-8"}>
          {endSession && <Redirect to={"/"} />}
          <Paper
            elevation={3}
            style={{
              marginTop: "7vh",
              paddingTop: 0,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <div className={"jumbotron"} style={{ padding: 50 }}>
              <div className={"row"}>
                <div className={"col-md-4"}>
                  <InputField
                    name={"search"}
                    label={"Search"}
                    onChange={props.handleSearchSectionDocuments}
                  />
                </div>
                <div className={"col-md-6"}></div>
              </div>
            </div>

            <div className={"row"}>
              <div className={"col-md-10"} style={{ marginLeft: 20 }}>
                <table className={"table table-borderless"}>
                  <tbody>
                    <List>
                      {props.document.length > 0 &&
                        props.document
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((document) => {
                            let secondaryText =
                              document.creatorID === userID
                                ? "You"
                                : document.creator;
                            return (
                              <tr>
                                <td>
                                  <Link
                                    to={"/doc/" + document.documentID}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <ListItem>
                                      <ListItemAvatar>
                                        <Avatar>
                                          <DescriptionIcon />
                                        </Avatar>
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary={document.subject}
                                        secondary={
                                          document.docType +
                                          " by " +
                                          secondaryText
                                        }
                                      />
                                    </ListItem>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                    </List>
                  </tbody>
                </table>

                <div style={{ position: "fixed", bottom: 0, marginBottom: 20 }}>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      30,
                      50,
                      100,
                      200,
                      500,
                      1000,
                    ]}
                    component="div"
                    count={props.document.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </div>
              </div>
              <div className={"col-md-2"}></div>
            </div>
          </Paper>
        </div>
        <div className={"col-md-2"}>
          <UserList />
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    document: state.fetchSectionDocuments,
    user: state.fetchUserById,
  };
}

const mapDispatchToProps = {
  fetchSectionDocuments,
  fetchUserById,
  handleSearchSectionDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(UserFolder));
