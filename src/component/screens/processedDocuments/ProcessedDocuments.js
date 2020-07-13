import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { getFromStorage } from "../../storage";
import { connect } from "react-redux";
import io from "socket.io-client";
import endPoint from "../../endPoint";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { withSnackbar } from "notistack";
import { fetchProcessedDocument } from "../../../redux/actions/fetchProcessedDocument";
import {fetchUserById} from "../../../redux/actions/fetchUserById";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import DescriptionIcon from "@material-ui/icons/Description";
import UserList from "../../common/userList/UserList";
let socket;
const columns = [
  "Tracking #",
  "Subject",
  "Type",
  "Status",
  "Date/Time Processed",
];
function ProcessedDocuments(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [date, setDate] = useState({
    _date: new Date(),
  });
  useEffect(() => {
    const timeID = setInterval(() => tick(), 1000);
    socket = io(endPoint.ADDRESS);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      async function fetch() {
        await props.fetchProcessedDocument(obj.token, socket);
        await props.fetchUserById(obj.token, socket);
      }

      fetch().catch((err) => {
        throw err;
      });
    }
    setEndSession(!(obj && obj.token));
    return () => {
      clearInterval(timeID);
    };
  }, []);

  const tick = () => {
    setDate({
      ...date,
      _date: new Date(),
    });
  };
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
              <div className={"col-md-8"}>
                <h5>
                  {" "}
                  <DescriptionIcon
                    fontSize={"medium"}
                    style={{ color: "#2196F3" }}
                  />{" "}
                  Received and{" "}
                  <span style={{ color: "#2196F3" }}>released documents</span>
                </h5>
              </div>
              <div className={"col-md-4"}>
                <div style={{ textAlign: "right" }}>
                  <span>
                    <small>
                      {date._date.toLocaleDateString() +
                        " " +
                        date._date.toLocaleTimeString()}
                    </small>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={"row"}>
            <div
              className={"col-md-12"}
              style={{ paddingLeft: 50, paddingRight: 50 }}
            >
              <TableContainer>
                <Table aria-label="sticky table">
                  <TableHead style={{ background: "#2196F3" }}>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell style={{ color: "#fff" }} key={column}>
                          {column}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.processedDoc.length > 0 &&
                      props.processedDoc
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((data) => (
                          <TableRow key={data.document_id}>
                            <TableCell style={{ color: "#2196F3" }}>
                              {data.document_id}
                            </TableCell>
                            <TableCell>{data.subject}</TableCell>
                            <TableCell>{data.type}</TableCell>
                            <TableCell>{data.status}</TableCell>
                            <TableCell>{data.date_time}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.processedDoc.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <UserList />
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    processedDoc: state.fetchProcessedDocument,
    user: state.fetchUserById
  };
}

const mapDispatchToProps = {
  fetchProcessedDocument,
  fetchUserById
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ProcessedDocuments));
