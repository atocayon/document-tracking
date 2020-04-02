import React from "react";

export default function ContactInformation(props) {
  return (
    <>
      <p style={{ color: "#607D8B" }}>
        <small>CONTACT INFORMATION</small>
      </p>
      <table className={"table table-borderless"} style={{ fontSize: "0.8vw" }}>
        <tbody>
          <tr>
            <td>Phone</td>

            <td style={{ color: "#2196F3" }}>
              {props.user[0].contact
                ? props.user[0].contact
                : "Not Available"}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td style={{ color: "#2196F3" }}>
              {props.user[0].email ? props.user[0].email : "Not Available"}
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td style={{ color: "#2196F3" }}>
              {props.user[0].address
                ? props.user[0].address
                : "Not Available"}
            </td>
          </tr>
        </tbody>
      </table>
      <hr />

      <p style={{ color: "#607D8B" }}>
        <small>OTHER INFORMATION</small>
      </p>
      <table className={"table table-borderless"} style={{ fontSize: "0.8vw" }}>
        <tbody>
          <tr>
            <td>Birthday</td>
            <td style={{ color: "#2196F3" }}>
              {props.user[0].bdate ? props.user[0].bdate : "Not Available"}
            </td>
          </tr>
        <tr>
            <td>Gender</td>
            <td style={{ color: "#2196F3" }}>
                {props.user[0].gender ? props.user[0].gender: "Not Available"}
            </td>
        </tr>
        </tbody>
      </table>
    </>
  );
}
