import React from "react";
import { withSnackbar } from "notistack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddNewSection from "./AddNewSection";

function Sections(props) {
  return (
    <div style={{ paddingBottom: 200, height: "100vh", overflow: "auto" }}>
      <AddNewSection
        open={props.openAddNewSection}
        handleClose={props.handleClose}
        divisions={props.divisions}
        handleInputChangeAddNewSection={props.handleInputChangeAddNewSection}
        handleSubmitAddNewSection={props.handleSubmitAddNewSection}
        error={props.error}
      />

      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button
          className={"btn btn-sm btn-success"}
          onClick={props.handleClickOpenAddNewSection}
        >
          Add New Section
        </button>

        <table className={"table table-striped"}>
          <thead>
            <tr style={{ background: "#2196F3", color: "#fff" }}>
              <th>Division / Department</th>
              <th>Section</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.sections.map((res, index) => {
              const division = props.divisions.filter(
                data => data.depid === parseInt(res.divid)
              );

              return (
                <tr key={index}>
                  <td>
                    {division.map(div => (
                      <>{div.department}</>
                    ))}
                  </td>
                  <td>
                    {res.section} - ({res.secshort})
                  </td>
                  <td>
                    {res.active === 1 ? (
                      <span style={{ color: "green" }}>Active</span>
                    ) : (
                      <span style={{ color: "red" }}>Not Active</span>
                    )}
                  </td>
                  <td>
                    <button className={"btn btn-sm "}>
                      <EditIcon />
                    </button>
                    <button className={"btn btn-sm "}>
                      <DeleteOutlineIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withSnackbar(Sections);
