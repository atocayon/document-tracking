import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import Grid from "@material-ui/core/Grid";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { getFromStorage } from "../../storage";
import { withSnackbar } from "notistack";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { fetchSectionDocuments } from "../../../redux/actions/fetchSectionDocuments";
import { handleSearchSectionDocuments } from "../../../redux/actions/handleSearchSectionDocuments";
import TablePagination from "@material-ui/core/TablePagination";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

function SectionDocuments(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [userID, setUserID] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      setUserID(token);
      async function fetch() {
        await props.fetchSectionDocuments(token);
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
      await props.handleSearchSectionDocuments(search);
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

          {props.sectionDocuments.length === 0 && (
            <div style={{ textAlign: "center", marginTop: 200 }}>
              <h6 style={{ color: "#9E9E9E" }}>No documents found</h6>
            </div>
          )}
          <div style={{ marginLeft: 50, marginRight: 10 }}>
            <div className={"row"}>
              <div className={"col-md-10"}>
                <List>
                  {props.sectionDocuments.length > 0 &&
                    props.sectionDocuments
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
                                  document.docType + " by " + secondaryText
                                }
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
                    count={props.sectionDocuments.length}
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
    sectionDocuments: state.fetchSectionDocuments,
  };
}

const mapDispatchToProps = {
  fetchSectionDocuments,
  handleSearchSectionDocuments,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(SectionDocuments));
