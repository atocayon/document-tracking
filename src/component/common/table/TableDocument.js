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
import {Link} from "react-router-dom";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor:  "#2196F3",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "theme.palette.background.default"
    }
  }
}))(TableRow);

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
      <Box display="flex" flexDirection="row">
        <h3 style={{ color: "#2196F3" }}>{props.title}</h3>
        <div style={{ flexGrow: 1 }}></div>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {props.head.map(th => (
                <StyledTableCell key={th}>{th}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.content
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={row.documentID}>
                  <StyledTableCell component="th" scope="row">
                    {row.documentID}
                  </StyledTableCell>
                  <StyledTableCell>{row.subject}</StyledTableCell>
                  <StyledTableCell>{row.doc_type}</StyledTableCell>
                  <StyledTableCell>
                    <Link to={"/addDocument/"+row.documentID} >View Document</Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30, 50, 70, 80, 100]}
        component="div"
        count={props.content.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
