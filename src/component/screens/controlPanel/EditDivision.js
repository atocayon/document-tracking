import React from "react";
import { withSnackbar } from "notistack";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import ApartmentIcon from "@material-ui/icons/Apartment";
import InputField from "../../common/textField/InputField";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    background: "#2196F3"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditDivision(props) {
  const classes = useStyles();
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            component={"span"}
            variant={"h6"}
            className={classes.title}
          >
            Edit Division / Department
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={props.handleSaveEditDivision}
          >
            save
          </Button>
        </Toolbar>
      </AppBar>

      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-md-2"}></div>
          <div className={"col-md-8"}>
            <div style={{ marginTop: 50, marginBottom: 50 }}>
              <h5 style={{ textAlign: "left", color: "#2196F3" }}>
                <ApartmentIcon />
                &nbsp;Department Information
              </h5>
              <br />
              <InputField
                id={"edit_department"}
                name={"department"}
                label={"Department name"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditDivision}
                value={props.divisionInfo.department || ""}
                type={"text"}
              />
              <br />
              <br />
              <InputField
                id={"edit_depshort"}
                name={"depshort"}
                label={"Department acronym"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditDivision}
                value={props.divisionInfo.depshort || ""}
                type={"text"}
              />
              <br />
              <br />
              <InputField
                id={"edit_payroll"}
                name={"payrollshort"}
                label={"Department name in payroll"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditDivision}
                value={props.divisionInfo.payrollshort || ""}
                type={"text"}
              />
            </div>
          </div>
          <div className={"col-md-2"}></div>
        </div>
      </div>
    </Dialog>
  );
}

export default withSnackbar(EditDivision);
