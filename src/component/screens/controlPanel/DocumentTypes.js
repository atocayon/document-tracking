import React from "react";
import { withSnackbar } from "notistack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddNewDocumentType from "./AddNewDocumentType";
import EditDocumentType from "./EditDocumentType";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

function DocumentTypes(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
  return (
    <div style={{ paddingBottom: 200, height: "100vh", overflow: "auto" }}>
      <AddNewDocumentType
        open={props.openAddNewDocumentType}
        handleClose={props.handleClose}
        handleSubmitAddDocumentType={props.handleSubmitAddDocumentType}
        handleInputChangeAddDocumentType={
          props.handleInputChangeAddDocumentType
        }
        error={props.error}
      />

      <EditDocumentType
        open={props.openEditDocumentType}
        handleClose={props.handleClose}
        handleSaveEditDocumentType={props.handleSaveEditDocumentType}
        documentType={props.documentType}
        handleOnChangeEditDocumentType={props.handleOnChangeEditDocumentType}
      />

      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button
          className={"btn btn-sm btn-success"}
          onClick={props.handleClickOpenAddDocumentType}
        >
          Add New Document Type
        </button>
      </div>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow style={{ background: "#2196F3"}}>
                        <TableCell style={{color: "#fff" }}>#</TableCell>
                        <TableCell style={{color: "#fff" }}>Document Type</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.documentTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((document, index) => (
                        <TableRow key={index}>
                            <TableCell>{++index}</TableCell>
                            <TableCell>{document.type}</TableCell>
                            <TableCell>
                                <button
                                    className={"btn btn-sm "}
                                    onClick={props.handleEditDocumentType.bind(null, document.id)}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className={"btn btn-sm "}
                                    onClick={props.handleDeleteDocumentType.bind(null, {
                                        id: document.id,
                                        type: document.type
                                    })}
                                >
                                    <DeleteOutlineIcon />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30, 50, 70, 80, 100]}
                component="div"
                count={props.documentTypes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </TableContainer>

    </div>
  );
}

export default withSnackbar(DocumentTypes);
