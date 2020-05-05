import React from "react";
import { withSnackbar } from "notistack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddNewDocumentType from "./AddNewDocumentType";
import EditDocumentType from "./EditDocumentType";

function DocumentTypes(props) {
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

      <table className={"table table-striped table-bordered"}>
        <thead>
          <tr style={{ background: "#2196F3", color: "#fff" }}>
            <th>#</th>
            <th>Document Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.documentTypes.map((document, index) => (
            <tr key={index}>
              <td>{++index}</td>
              <td>{document.type}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withSnackbar(DocumentTypes);
