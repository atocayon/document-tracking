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
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SelectField from "../../common/selectField/SelectField";
import InputField from "../../common/textField/InputField";
import Reactotron from "reactotron-react-js";
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

function AddNewSection(props) {
  const classes = useStyles();
  const division = [];

  for (let i = 0; i < props.divisions.length; i++) {
    division.push({
      id: props.divisions[i].depid,
      type: props.divisions[i].department
    });
  }

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
            Add New Section
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={props.handleSubmitAddNewSection}
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
                <AccountBoxIcon />
                &nbsp;Section Information
              </h5>
              <br />
              <div className={"row"}>
                <div className={"col-md-4"}>
                  <SelectField
                    id={"add_division"}
                    name={"division"}
                    onChange={props.handleInputChangeAddNewSection}
                    label={"Division"}
                    options={division}
                    variant={"outlined"}
                    error={props.error.addNewSection_division}
                  />

                  <br />
                </div>
              </div>

              <InputField
                id={"new_section"}
                name={"section"}
                label={"Section name"}
                variant={"outlined"}
                onChange={props.handleInputChangeAddNewSection}
                error={props.error.addNewSection_section}
                type={"text"}
              />
              <br />
              <br />

              <InputField
                id={"new_secshort"}
                name={"secshort"}
                label={"Section short name / acronym"}
                variant={"outlined"}
                onChange={props.handleInputChangeAddNewSection}
                error={props.error.addNewSection_secshort}
                type={"text"}
              />
              <br />
              <br />
            </div>
          </div>
          <div className={"col-md-2"}></div>
        </div>
      </div>
    </Dialog>
  );
}

export default withSnackbar(AddNewSection);
