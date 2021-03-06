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
import { fetchAllSections } from "../../../redux/actions/fetchAllSections";
import { fetchSectionsList } from "../../../redux/actions/fetchSectionsList";
import { handleDocDissemination } from "../../../redux/actions/handleDocDissemination";
import { clearDisseminationMessage } from "../../../redux/actions/handleDocDissemination";
import Content from "./Content";
import UserList from "../../common/userList/UserList";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "../../common/circularProgress/CircularProgressComponent";
import "../../../styles/barcode.css";
import Forward from "./Forward";
import {
  addForwardDestination,
  changeDocumentDestination,
  onChangeForwardDocument,
  removeForwardDestination,
} from "../../../redux/actions/onChangForwardDocument";

let socket;
function DocumentInfo(props) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [disseminate, setDisseminate] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const componentRef = useRef();
  const barcodeRef = useRef();
  useEffect(() => {
    setLoading(false);
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      async function fetch() {
        await props.fetchDocumentInfo(props.match.params.doc_id);
        await props.fetchUserById(obj.token);
        await props.fetchSectionsList();
      }

      fetch().catch((err) => {
        throw err;
      });
    }
    setEndSession(!(obj && obj.token));

    if (props.res_dissemination !== "") {
      if (props.res_dissemination === "success") {
        setDisseminate(!disseminate);
        props.changeDocumentDestination();
        setSelectedValue("");
        const variant = "info";
        props.enqueueSnackbar("Document successfully completed...", {
          variant,
        });
        props.clearDisseminationMessage();
      }
    }
  }, [props.res_dissemination]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickDisseminate = () => {
    setDisseminate(!disseminate);
    props.changeDocumentDestination();
    setSelectedValue("");
  };

  const handleChange = async (event) => {
    setSelectedValue(event.target.value);
    await props.changeDocumentDestination();
  };

  const _addForwardDestination = async (e) => {
    e.preventDefault();
    await props.addForwardDestination(props.forwardDocument.destination);
  };

  const handleDisseminate = async (e) => {
    e.preventDefault();
    await props.handleDocDissemination(
      props.user.user_id,
      props.match.params.doc_id,

      props.documentInfo,
      props.forwardDocument,
      socket
    );
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={"row"}>
          <PrimarySearchAppBar />
          <div className={"col-md-2"}>
            <SideBarNavigation
              open={open}
              user={props.user}
              setOpen={setOpen}
              handleClick={handleClick}
            />
          </div>
          <div className={"col-md-8"}>
            <Paper
              elevation={3}
              style={{
                marginTop: "7vh",
                paddingTop: 0,
                height: "100vh",
                overflow: "auto",
                paddingBottom: 150,
              }}
            >
              <Forward
                open={disseminate}
                handleClickDisseminate={handleClickDisseminate}
                sections={props.sections}
                handleChange={handleChange}
                addForwardDestination={_addForwardDestination}
                removeForwardDestination={props.removeForwardDestination}
                value={props.forwardDocument}
                onChangeDestination={props.onChangeForwardDocument}
                selectedValue={selectedValue}
                handleDisseminate={handleDisseminate}
              />
              {endSession && <Redirect to={"/"} />}
              <div>
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
                    <div>
                      <div
                        className={"barcode"}
                        ref={barcodeRef}
                        style={{ display: "none" }}
                      >
                        {props.documentInfo.barcode.length > 0 &&
                          props.documentInfo.barcode.map((barcode) => (
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
                                        <span className={"barcodeLabel"}>
                                          {barcode.destination}
                                        </span>
                                        <br />
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
                      {props.documentInfo.currentStatus === "4" && (
                        <button
                          onClick={handleClickDisseminate}
                          className={"btn btn-success"}
                          title={"Send to many"}
                        >
                          <SendIcon />
                          &nbsp;Disseminate
                        </button>
                      )}
                    </div>
                    <div className={"col-md-6"}>
                      <div style={{ float: "right" }}>
                        <ReactToPrint
                          trigger={() => (
                            <button className={"btn btn-outline-info"}>
                              <PrintIcon />
                              &nbsp;Barcode
                            </button>
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
          </div>
          <div className={"col-md-2"}>
            <UserList />
          </div>
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    sections: state.fetchSectionsList,
    documentInfo: state.fetchDocumentInfo,
    user: state.fetchUserById,
    forwardDocument: state.forwardDocument,
    res_dissemination: state.handleDocDissemination,
  };
}

const mapDispatchToProps = {
  fetchDocumentInfo,
  fetchUserById,
  fetchSectionsList,
  onChangeForwardDocument,
  changeDocumentDestination,
  addForwardDestination,
  removeForwardDestination,
  handleDocDissemination,
  clearDisseminationMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(DocumentInfo));
