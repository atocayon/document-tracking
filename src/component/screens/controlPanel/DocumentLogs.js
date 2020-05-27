import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import endPoint from "../../endPoint";
let socket;
function DocumentLogs() {
  const [doc, setDoc] = useState([]);

  useEffect(() => {
    socket = io(endPoint.ADDRESS);

    socket.emit("getDocumentLogs");
    socket.on("docLogs", (data) => {
      setDoc([...doc, ...data]);
    });


    return () => {
      socket.off("getDocumentLogs");
    }
  }, []);

  return (
    <div style={{ paddingBottom: 200, height: "100vh", overflow: "auto" }}>
      <table className={"table table-striped table-bordered"}>
        <thead>
          <tr style={{ background: "#2196F3", color: "#fff" }}>
            <th>Tracking #</th>
            <th>User</th>
            <th>Remarks</th>
            <th>Destination Type</th>
            <th>Status</th>
            <th>Destination</th>

            <th>Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {doc.map((data, index) => (
            <tr key={index} style={index === 0 ? { color: "#4CAF50", fontWeight: "bold"} : null}>
              <td>{data.trans_id}</td>
              <td>{data.name}</td>
              <td>{data.remarks}</td>
              <td>{data.destinationType}</td>
              <td>{data.status}</td>
              <td>{data.destination}</td>

              <td>{data.date_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DocumentLogs;
