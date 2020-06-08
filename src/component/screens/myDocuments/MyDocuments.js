import React, { Component, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { getFromStorage } from "../../storage";
import Paper from "@material-ui/core/Paper";
import { Link, Redirect } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import axios from "axios";
import Reactotron from "reactotron-react-js";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { fetchUserDocuments } from "../../../redux/actions/fetchUserDocuments";
import { handleSearchUserDocuments } from "../../../redux/actions/handleSearchUserDocuments";
import TablePagination from "@material-ui/core/TablePagination";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

function MyDocuments(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      async function fetch() {
        await props.fetchUserDocuments(token);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeSearch = ({ target }) => {
    setSearch(target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search !== "") {
      await props.handleSearchUserDocuments(search);
    }
  };

  const handleClearSearch = (e) => {
    e.preventDefault();
    window.location.reload(true);
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
              <div className={"col-md-6"}>
                <form onSubmit={handleSearch}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Search by subject and press enter
                    </InputLabel>
                    <Input
                      label={"Search by subject and press enter"}
                      variant={"outlined"}
                      onChange={onChangeSearch}
                      type={"text"}
                      endAdornment={
                        search !== "" ? (
                          <InputAdornment position="end">
                            <IconButton
                              title={"clear"}
                              aria-label="toggle password visibility"
                              onClick={handleClearSearch}
                              onMouseDown={handleClearSearch}
                              edge="end"
                            >
                              <HighlightOffRoundedIcon />
                            </IconButton>
                          </InputAdornment>
                        ) : (
                          ""
                        )
                      }
                    />
                  </FormControl>
                </form>
              </div>
              <div className={"col-md-6"}></div>
            </div>
          </div>

          {props.userDocument.length === 0 && (
            <div style={{ textAlign: "center", marginTop: 200 }}>
              <h6 style={{ color: "#9E9E9E" }}>
                No documents found
              </h6>
            </div>
          )}

          <div style={{ marginLeft: 50, marginRight: 10 }}>
            <div className={"row"}>
              <div className={"col-md-10"} style={{ paddingBottom: 200 }}>
                <List>
                  {props.userDocument.length > 0 &&
                    props.userDocument
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((document) => {
                        let doc =
                          document.maxStatus === "forwarded"
                            ? document.maxStatus + " to " + document.destination
                            : document.maxStatus + " by " + document.name;
                        return (
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
                                secondary={document.type + " - Status: " + doc}
                              />
                            </ListItem>
                          </Link>
                        );
                      })}
                </List>
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
                    count={props.userDocument.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </div>
              </div>
              <div className={"col-md-2"}></div>
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
    userDocument: state.fetchUserDocuments,
  };
}

const mapDispatchToProps = {
  fetchUserDocuments,
  handleSearchUserDocuments,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(MyDocuments));
