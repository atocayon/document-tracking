import React, { useEffect, useRef, useState } from "react";
import { withSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import DescriptionIcon from "@material-ui/icons/Description";
import Barcode from "react-barcode";
import axios from "axios";
import { getFromStorage } from "../../storage";
import InputField from "../../common/textField/InputField";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { FormGroup } from "@material-ui/core";
import CheckBox from "../../common/checkbox/CheckBox";
import CommentIcon from "@material-ui/icons/Comment";
import GetAppIcon from "@material-ui/icons/GetApp";
import canvas from "../../canvas";
import Reactotron from "reactotron-react-js";
import ExploreIcon from "@material-ui/icons/Explore";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import BusinessIcon from "@material-ui/icons/Business";
import BarcodeComponent from "../../common/barcode/BarcodeComponent";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
function DocumentInfo(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const [document, setDocument] = useState({});
  const [actionRequired, setActionRequired] = useState([]);
  const [destination, setDestination] = useState([]);
  const componentRef = useRef();
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      axios
        .get(
          "http://10.10.10.16:4000/dts/fetchDocument/" +
            props.match.params.doc_id
        )
        .then((res) => {
          setDocument(res.data);

          axios
            .get(
              "http://10.10.10.16:4000/dts/fetchActionReq/" +
                props.match.params.doc_id
            )
            .then((res) => {
              setActionRequired(res.data);

              axios
                .get(
                  "http://10.10.10.16:4000/dts/fetchDocumentDestination/" +
                    props.match.params.doc_id
                )
                .then((_destination) => {
                  setDestination(_destination.data);
                })
                .catch((err) => {
                  const variant = "error";
                  props.enqueueSnackbar("Server Error", { variant });
                });
            })
            .catch((err) => {
              const variant = "error";
              props.enqueueSnackbar("Server Error", { variant });
            });
        })
        .catch((err) => {
          const variant = "error";
          props.enqueueSnackbar("Server Error", { variant });
        });
    }
    setEndSession(!(obj && obj.token));
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDownload = () => {
    if (canvas("#barcode", props.match.params.doc_id)) {
      const variant = "info";
      props.enqueueSnackbar("Barcode successfully downloaded...", {
        variant,
      });
    }
  };
  return (
    <Grid container spacing={3}>
      <PrimarySearchAppBar />
      <Grid item xs={2}>
        <SideBarNavigation
          open={open}
          setOpen={setOpen}
          handleClick={handleClick}
        />
      </Grid>
      <Grid item xs={8}>
        <Paper
          elevation={3}
          style={{
            marginTop: 70,
            paddingTop: 0,
            height: "100vh",
            overflow: "auto",
            paddingBottom: 150,
          }}
        >
          {endSession && <Redirect to={"/"} />}
          <div className={"jumbotron"} style={{ padding: 50 }}>
            <div className={"row"}>
              <div className={"col-md-2"}>
                <div className={"row"}>
                  <div className={"col-md-6"}></div>
                  <div className={"col-md-6"}>
                    <div style={{ textAlign: "right" }}></div>
                  </div>
                </div>
              </div>
              <div className={"col-md-8"}>
                {/*<h5 style={{ textAlign: "left" }}>Draft Documents</h5>*/}
              </div>
              <div className={"col-md-2"}></div>
            </div>
          </div>

          <div className={"row"}>
            <div className={"col-md-2"}></div>
            <div className={"col-md-8"}>
              <div>
                <h5 style={{ color: "#2196F3" }}>
                  <DescriptionIcon />
                  &nbsp;Document Information
                </h5>
                <br />
              </div>

              <div style={{ textAlign: "left" }}>
                <small>&nbsp;&nbsp;DOCUMENT TRACKING NUMBER</small>
              </div>
              <div id={"barcode"}>
                <BarcodeComponent
                  ref={componentRef}
                  trackingNumber={props.match.params.doc_id}
                />
                <ReactToPrint
                  trigger={() => (
                    <a
                      href={"#"}
                      className={"btn"}
                      title={"Print this barcode"}
                    >
                      {" "}
                      <PrintIcon />
                    </a>
                  )}
                  content={() => componentRef.current}
                />
              </div>

              <br />
              <br />
              <InputField
                id={"tackDocument"}
                label={"Subject"}
                name={"subject"}
                variant={"outlined"}
                disabled={true}
                type={"text"}
                value={Object.keys(document).length > 0 && document.subject}
              />

              <br />
              <br />

              <InputField
                id={"documentType"}
                label={"Document Type"}
                name={"documentType"}
                variant={"outlined"}
                disabled={true}
                type={"text"}
                value={Object.keys(document).length > 0 && document.type}
              />

              <br />
              <br />

              <h5 style={{ color: "#2196F3" }}>
                <FeedbackIcon />
                &nbsp;Action Required
              </h5>
              <br />
              <FormGroup>
                {actionRequired.map((action) => (
                  <CheckBox
                    checked={true}
                    key={action.document_action_req_id}
                    label={action.action_req}
                    value={action.action_req}
                    name={"action_req"}
                  />
                ))}
              </FormGroup>

              <br />
              <br />

              <h5 style={{ color: "#2196F3" }}>
                <CommentIcon />
                &nbsp;Note
              </h5>
              <div>{document.note}</div>

              {destination.length > 0 && (
                <>
                  <br />
                  <br />
                  <h5 style={{ color: "#2196F3" }}>
                    <ExploreIcon />
                    &nbsp;Destination
                  </h5>
                  <br />
                  {destination.map((res) => (
                    <>
                      <Chip
                        key={res.destination}
                        avatar={
                          <Avatar>
                            <BusinessIcon />
                          </Avatar>
                        }
                        label={res.destination}
                      />
                      &nbsp;&nbsp;
                    </>
                  ))}
                </>
              )}
              <br />
            </div>
            <div className={"col-md-2"}></div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}

export default withSnackbar(DocumentInfo);
