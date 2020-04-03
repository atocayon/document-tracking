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
              {props.user[0].data.contact
                ? props.user[0].data.contact
                : "Not Available"}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td style={{ color: "#2196F3" }}>
              {props.user[0].data.email ? props.user[0].data.email : "Not Available"}
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td style={{ color: "#2196F3" }}>
              {props.user[0].data.address
                ? props.user[0].data.address
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
              {props.user[0].data.bdate ? props.user[0].data.bdate : "Not Available"}
            </td>
          </tr>
        <tr>
            <td>Gender</td>
            <td style={{ color: "#2196F3" }}>
                {props.user[0].data.gender ? props.user[0].data.gender: "Not Available"}
            </td>
        </tr>
        </tbody>
      </table>
    </>
  );
}
