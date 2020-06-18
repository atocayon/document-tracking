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
import Content from "./Content";
import UserList from "../../common/userList/UserList";

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
    <Grid container >
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
          <Content
            ref={componentRef}
            documentInfo={props.documentInfo}
            doc_id={props.match.params.doc_id}
          />
          <div className={"row"}>
            <div className={"col-md-2"}></div>
            <div className={"col-md-8"}>
              <div className={"row"}>
                <div className={"col-md-6"}>
                  <div id={"barcode"}>
                    <ReactToPrint
                        trigger={() => (
                            <a
                                href={"#"}
                                className={"btn"}
                                title={"Print this barcode"}
                            >
                              {" "}
                              <BarcodeComponent
                                  ref={barcodeRef}
                                  trackingNumber={props.match.params.doc_id}
                              />
                            </a>
                        )}
                        content={() => barcodeRef.current}
                    />
                  </div>
                </div>
                <div className={"col-md-6"}>
                  <div style={{ float: "right" }}>
                    <ReactToPrint
                        copyStyles={true}
                        content={() => componentRef.current}
                        trigger={() => (
                            <a href={"#"} className={"btn btn-info"} title={"Print"}>
                              <PrintIcon /> &nbsp;Print
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
  };
}

const mapDispatchToProps = {
  fetchDocumentInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(DocumentInfo));
