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
      async function fetch() {}
      fetch().catch((err) => {
        throw err;
      });
    }
    setEndSession(!(obj && obj.token));

    if (props.insert !== ""){
      if (props.insert === "success"){}
    }
  }, [props.insert]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOnChangeAddNewDocCategory = ({ target }) => {
    setCategory(target.value);
  };

  const handleSubmitNewDocumentCategory = async (e) => {
    e.preventDefault();
    await props.addNewDocCategory(token, category,socket);
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
                      type={"text"}
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
                          <TableCell key={index}>{column}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
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
    insert: state.addNewDocCategory
  };
}

const mapDispatchToProps = {
  addNewDocCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(MyDocuments));
