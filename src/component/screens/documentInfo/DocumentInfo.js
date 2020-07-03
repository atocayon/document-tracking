import React, { useEffect, useRef, useState } from "react";
import { withSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import PrimarySearchAppBar from "../../common/navbar/PrimarySearchAppBar";
import SideBarNavigation from "../../common/sideBarNavigation/SideBarNavigation";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { getFromStorage } from "../../storage";
import canvas from "../../canvas";
import BarcodeComponent from "../../common/barcode/BarcodeComponent";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
import { connect } from "react-redux";
import { fetchDocumentInfo } from "../../../redux/actions/fetchDocumentInfo";
import { fetchUserById } from "../../../redux/actions/fetchUserById";
import Content from "./Content";
import UserList from "../../common/userList/UserList";
import "../../../styles/barcode.css";
function DocumentInfo(props) {
  const [open, setOpen] = useState(true);
  const [endSession, setEndSession] = useState(false);
  const componentRef = useRef();
  const barcodeRef = useRef();
  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      async function fetch() {
        await props.fetchDocumentInfo(props.match.params.doc_id);
        await props.fetchUserById(obj.token);
      }

      fetch().catch((err) => {
        throw err;
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
    <Grid container>
      <PrimarySearchAppBar />
      <Grid item xs={2}>
        <SideBarNavigation
          open={open}
          user={props.user}
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
          <div >
              <Content
                  ref={componentRef}
                  documentInfo={props.documentInfo}
                  doc_id={props.match.params.doc_id}
              />
          </div>

          <div className={"row"}>
            <div className={"col-md-2"}></div>
            <div className={"col-md-8"}>
              <div className={"row"}>
                <div className={"col-md-6"}>
                  <div className={"barcode"} ref={barcodeRef} style={{display: "none"}}>
                      {props.documentInfo.barcode.length > 0 && props.documentInfo.barcode.map(barcode => (
                          <div key={barcode.documentID}>
                              <ReactToPrint
                                  trigger={() => (
                                      <a
                                          href={"#"}
                                          className={"btn"}
                                          title={"Print this barcode"}
                                      >
                                          {barcode.destination && (
                                              <>
                                                  <span className={"barcodeLabel"}>{barcode.destination}</span><br/>
                                              </>

                                          )}

                                          <BarcodeComponent
                                              trackingNumber={barcode.documentID}
                                              margin={barcode.destination ? 0 : 5}
                                              width={barcode.destination ? 1 : 1.2}
                                          />
                                      </a>
                                  )}
                                  content={() => barcodeRef.current}
                              />
                          </div>
                      ))}
                  </div>
                </div>
                <div className={"col-md-6"}>
                  <div style={{ float: "right" }}>
                      <ReactToPrint
                          trigger={() => (
                              <button className={"btn btn-outline-info"}><PrintIcon />&nbsp;Barcode</button>
                          )}
                          content={() => barcodeRef.current}
                      />

                    &nbsp;&nbsp;&nbsp;
                    <ReactToPrint
                  
                      content={() => componentRef.current}
                      trigger={() => (
                        <a
                          href={"#"}
                          className={"btn btn-info"}
                          title={"Print"}
                        >
                          <PrintIcon /> &nbsp;Routing Slip
                        </a>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={"col-md-2"}></div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={2}>
        <UserList />
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    documentInfo: state.fetchDocumentInfo,
    user: state.fetchUserById,
  };
}

const mapDispatchToProps = {
  fetchDocumentInfo,
  fetchUserById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(DocumentInfo));
