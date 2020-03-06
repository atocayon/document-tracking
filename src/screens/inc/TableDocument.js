import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import HelpIcon from "@material-ui/icons/Help";

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

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData(123456789, "sample", "sample", "sample"),
  createData(123456789, "sample", "sample", "sample"),
  createData(123456789, "sample", "sample", "sample"),
  createData(123456789, "sample", "sample", "sample"),
  createData(123456789, "sample", "sample", "sample"),
  createData(123456789, "sample", "sample", "sample")
];

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function CustomizedTables(props) {
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

  return (
    <React.Fragment>
      {props.tableTitle === "Incoming Documents" ? (
        <Box display="flex" flexDirection="row">
          <h3 style={{ color: "#2196F3" }}>Incoming Documents</h3>
          <div style={{ flexGrow: 1 }}></div>
          <HelpIcon style={{ marginTop: "2vh", color: "#2196F3" }} />
        </Box>
      ) : (
          <Box display="flex" flexDirection="row">
            <h3 style={{ color: "#FF9800" }}>Outgoing Documents</h3>
              <div style={{ flexGrow: 1 }}></div>
              <HelpIcon style={{ marginTop: "2vh", color: "#FF9800" }} />
          </Box>

      )}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transaction ID</StyledTableCell>
              <StyledTableCell align="right">Subject</StyledTableCell>
              <StyledTableCell align="right">Action Required</StyledTableCell>
              <StyledTableCell align="right">Date & Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    <Alert
                      icon={false}
                      onClose={() => {}}
                      severity={
                        props.tableTitle === "Incoming Documents"
                          ? "info"
                          : "warning"
                      }
                    >
                      <Button component="span">{row.name}</Button>
                    </Alert>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.calories}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
