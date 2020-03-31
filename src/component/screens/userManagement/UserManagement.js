import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadUsers } from "../../../redux/actions/fetchUsersBySection";
import TableDocument from "./TableDocument";
import { Paper } from "@material-ui/core";
import Reactotron from "reactotron-react-js";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import HelpIcon from "@material-ui/icons/Help";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    }
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
});

function UserManagement({ match, sectionUsers, loadUsers }) {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  useEffect(() => {
    loadUsers(match.params.section).catch(err => {
      throw err;
    });
  });
  return (
    <>
      <Paper
        elevation={3}
        style={{
          paddingLeft: "2vw",
          paddingRight: "2vw",
          paddingTop: "5vh",
          marginBottom: 0,
          bottom: 0,
          height: "100vh"
        }}
      >
          <React.Fragment>
              <Box display="flex" flexDirection="row">
                  <h3 style={{ color: "#FF9800" }}>Outgoing Documents</h3>
                  <div style={{ flexGrow: 1 }}></div>
                  <HelpIcon style={{ marginTop: "2vh", color: "#FF9800" }} />
              </Box>

              <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                      <TableHead>
                          <TableRow>
                              <StyledTableCell>Name</StyledTableCell>
                              <StyledTableCell align="right">Position</StyledTableCell>
                              <StyledTableCell align="right"></StyledTableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {sectionUsers
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                                  <StyledTableRow key={row.data._id}>
                                      <StyledTableCell component="th" scope="row">
                                          <Alert icon={false} onClose={() => {}} severity={"info"}>
                                              <Button component="span">{row.data.fname}</Button>
                                          </Alert>
                                      </StyledTableCell>

                                      <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                  </StyledTableRow>
                              ))}
                      </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={sectionUsers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
              />
          </React.Fragment>
      </Paper>
    </>
  );
}

function mapStateToProps(state) {
  return { sectionUsers: state.sectionUsers };
}

const mapDispatchToProps = {
  loadUsers
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
