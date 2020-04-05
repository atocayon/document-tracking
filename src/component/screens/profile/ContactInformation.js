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
              {props.user.contact
                ? props.user.contact
                : "Not Available"}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td style={{ color: "#2196F3" }}>
              {props.user.email ? props.user.email : "Not Available"}
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td style={{ color: "#2196F3" }}>
              {props.user.address
                ? props.user.address
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
              {props.user.bdate ? props.user.bdate : "Not Available"}
            </td>
          </tr>
        <tr>
            <td>Gender</td>
            <td style={{ color: "#2196F3" }}>
                {props.user.gender ? props.user.gender: "Not Available"}
            </td>
        </tr>
        </tbody>
      </table>
    </>
  );
}
