import React, { useEffect, useState } from "react";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import Grid from "@material-ui/core/Grid";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { Link, Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { getFromStorage } from "../../storage";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { handleSearchSectionDocuments } from "../../../redux/actions/handleSearchSectionDocuments";
import { fetchDocCategory } from "../../../redux/actions/manageDocumentCategory";
import io from "socket.io-client";
import endPoint from "../../endPoint";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
let socket;

function SectionDocuments(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  useEffect(() => {
    socket = io(endPoint.ADDRESS);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      async function fetch() {
        await props.fetchDocCategory(token, socket);
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
                {/*<form onSubmit={handleSearch}>*/}
                {/*  <FormControl fullWidth>*/}
                {/*    <InputLabel htmlFor="outlined-adornment-amount">*/}
                {/*      Search by subject and press enter*/}
                {/*    </InputLabel>*/}
                {/*    <Input*/}
                {/*      label={"Search by subject and press enter"}*/}
                {/*      variant={"outlined"}*/}
                {/*      onChange={onChangeSearch}*/}
                {/*      type={"text"}*/}
                {/*      endAdornment={*/}
                {/*        search !== "" ? (*/}
                {/*          <InputAdornment position="end">*/}
                {/*            <IconButton*/}
                {/*              title={"clear"}*/}
                {/*              aria-label="toggle password visibility"*/}
                {/*              onClick={handleClearSearch}*/}
                {/*              onMouseDown={handleClearSearch}*/}
                {/*              edge="end"*/}
                {/*            >*/}
                {/*              <HighlightOffRoundedIcon />*/}
                {/*            </IconButton>*/}
                {/*          </InputAdornment>*/}
                {/*        ) : (*/}
                {/*          ""*/}
                {/*        )*/}
                {/*      }*/}
                {/*    />*/}
                {/*  </FormControl>*/}
                {/*</form>*/}
              </div>
              <div className={"col-md-6"}></div>
            </div>
          </div>

          {/*{props.sectionDocuments.length === 0 && (*/}
          {/*  <div style={{ textAlign: "center", marginTop: 200 }}>*/}
          {/*    <h6 style={{ color: "#9E9E9E" }}>No documents found</h6>*/}
          {/*  </div>*/}
          {/*)}*/}
          <div style={{ marginLeft: 50, marginRight: 10 }}>
            <div className={"row"}>
              {props.doc_category.length > 0 &&
                props.doc_category.map((data) => (
                  <div className={"col-md-3"} style={{ paddingLeft: 20 }}>
                    <List>
                      <Link
                        to={"/folder/" + data.category}
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar variant={"rounded"}>
                              <FolderOpenIcon fontSize={"large"} />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={data.category}
                            secondary={"Folder"}
                          />
                        </ListItem>
                      </Link>
                    </List>
                  </div>
                ))}
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
  };
}

const mapDispatchToProps = {
  handleSearchSectionDocuments,
  fetchDocCategory,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(SectionDocuments));
