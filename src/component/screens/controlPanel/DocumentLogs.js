import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import endPoint from "../../endPoint";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { Link } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Reactotron from "reactotron-react-js";
import { connect } from "react-redux";
import { expandDocLogs } from "../../../redux/actions/expandDocLogs";
import { clearExpandLogs } from "../../../redux/actions/expandDocLogs";

let socket;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2196F3",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "theme.palette.background.default",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState({});
  const classes = useRowStyles();

  const handleExpandMore = async (val) => {
    if (props.expand_info.length === 0 ) {
      await props.expandDocLogs(val, props.socket);
      setOpen({ ...open, [val.doc_id]: true });
    }
    if (Object.keys(open).length > 0) {
      setOpen({});
      await props.clearExpandLogs();
    }
  };

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleExpandMore.bind(null, {
              doc_id: row.trans_id,
              status: row.status,
            })}
          >
            {open[row.trans_id] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{row.trans_id}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.remarks}</TableCell>
        <TableCell>{row.destinationType}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.destination}</TableCell>

        <TableCell>{row.date_time}</TableCell>
      </TableRow>
      <StyledTableRow>
        <TableCell colSpan={8}>
          <Collapse in={open[row.trans_id]} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table>
                <TableBody>
                  {props.expand_info.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell></TableCell>
                      <TableCell>{data.trans_id}</TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell>{data.remarks}</TableCell>
                      <TableCell>{data.destinationType}</TableCell>
                      <TableCell>{data.status}</TableCell>
                      <TableCell>{data.destination}</TableCell>
                      <TableCell>{data.date_time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </>
  );
}

function DocumentLogs(props) {
  const [doc, setDoc] = useState({
    columns: [
      "",
      "Tracking #",
      "User",
      "Remarks",
      "Destination Type",
      "Status",
      "Destination",
      "Date and Time",
    ],
    rows: [],
  });

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    socket = io(endPoint.ADDRESS);

    socket.emit("getDocumentLogs");
    socket.on("docLogs", (data) => {
      setDoc({ ...doc, rows: data });
    });

    return () => {
      socket.off("getDocumentLogs");
    };
  }, []);

  return (
    <div style={{ paddingBottom: 200, height: "100vh", overflow: "auto" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {doc.columns.map((th, index) => (
                <StyledTableCell key={index}>{th}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {doc.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Row
                  index={index}
                  row={row}
                  socket={socket}
                  expandDocLogs={props.expandDocLogs}
                  expand_info={props.expand_info}
                  clearExpandLogs={props.clearExpandLogs}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 30, 50, 70, 80, 100]}
        component="div"
        count={doc.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    expand_info: state.expandDocLogs,
  };
}

const mapDispatchToProps = {
  expandDocLogs,
  clearExpandLogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentLogs);
