import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Reactotron from "reactotron-react-js";
function DocumentTrack(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-2"}></div>
      <div className={"col-md-8"} style={{ paddingBottom: 100 }}>
        <Stepper orientation="vertical">
          {props.track.map((doc) => {
              return Reactotron.log(doc);
            // let transaction = doc.transactions.split("*");
            // let remarks = doc.remarks.split("*");
            // let destination = doc.destination.split("*");
            // let arr_remarks = remarks.filter((data) => data !== "none");
            // return (
            //   <Step active={true}>
            //     <StepLabel
            //       StepIconComponent={FiberManualRecordIcon}
            //       style={{ color: "#2196F3" }}
            //     >
            //       {doc.name}
            //       <br />
            //       <small>{doc.position}</small>
            //     </StepLabel>
            //     <StepContent last={false}>
            //       <Typography>
            //         {transaction.map((data, index_trans) => (
            //           <Stepper orientation="vertical" key={index_trans}>
            //             <Step active={true}>
            //               <StepLabel
            //                 StepIconComponent={FiberManualRecordIcon}
            //                 style={{ color: "#2196F3" }}
            //               >
            //                 {data}
            //               </StepLabel>
            //               <StepContent last={false}>
            //                 <Typography>
            //                   {destination.map(
            //                     (_destination, index_destination) => (
            //                       <small key={index_destination}>
            //                         {index_destination === index_trans &&
            //                           "Destination: " + _destination}
            //                       </small>
            //                     )
            //                   )}
            //                   <br />
            //                   {remarks.map((remarks, index_remarks) => (
            //                     <small key={index_remarks}>
            //                       {index_remarks === index_trans &&
            //                         "Remarks: " + remarks}
            //                     </small>
            //                   ))}
            //                 </Typography>
            //               </StepContent>
            //             </Step>
            //           </Stepper>
            //         ))}
            //       </Typography>
            //     </StepContent>
            //   </Step>
            // );
          })}
        </Stepper>
      </div>
      <div className={"col-md-2"}></div>
    </div>
  );
}

export default withSnackbar(DocumentTrack);
