import React from "react";
import { withSnackbar } from "notistack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddNewDivision from "./AddNewDivision";
import EditDivision from "./EditDivision";

function Division(props) {
  return (
    <div style={{ paddingBottom: 200, height: "100vh", overflow: "auto" }}>
      <AddNewDivision
        open={props.open}
        handleClose={props.handleClose}
        handleInputChangeAddNewDivision={props.handleInputChangeAddNewDivision}
        handleSubmitAddNewDivision={props.handleSubmitAddNewDivision}
        addNewDivisionInputValue={props.addNewDivisionInputValue}
        error={props.error}
      />

      <EditDivision
        open={props.openEditDivision}
        handleClose={props.handleClose}
        divisionInfo={props.divisionInfo}
        handleOnChangeEditDivision={props.handleOnChangeEditDivision}
        handleSaveEditDivision={props.handleSaveEditDivision}
      />
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button
          className={"btn btn-sm btn-success"}
          onClick={props.handleClickOpenAddNewDivision}
        >
          Add New Division
        </button>
      </div>

      <table className={"table table-striped table-bordered"}>
        <thead>
          <tr style={{ background: "#2196F3", color: "#fff" }}>
              <th>#</th>
            <th>Department</th>
            <th>Acronym</th>
            <th>Payroll name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.divisions.map((division, index) => (
            <tr key={index}>
                <td>{++index}</td>
              <td>{division.department}</td>
              <td>{division.depshort}</td>
              <td>{division.payrollshort}</td>
              <td>
                <button
                  className={"btn btn-sm "}
                  onClick={props.handleEditDivision.bind(null, {
                    depid: division.depid,
                    depshort: division.depshort
                  })}
                >
                  <EditIcon />
                </button>
                <button
                  className={"btn btn-sm "}
                  onClick={props.handleDeleteDivision.bind(null, {
                    depid: division.depid,
                    depshort: division.depshort
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

export default withSnackbar(Division);
