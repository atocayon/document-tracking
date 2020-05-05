import React from "react";
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
import SelectField from "../../common/selectField/SelectField";
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

function EditSection(props) {
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
            Edit Section
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={props.handleSaveEditSection}
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
                &nbsp;Section Information
              </h5>
              <br />
              <div className={"row"}>
                <div className={"col-md-4"}>

                  <SelectField
                    id={"edit_division"}
                    name={"divid"}
                    onChange={props.handleOnChangeEditSection}
                    label={props.section.department}
                    options={division}
                    value={props.section.divid}
                    variant={"outlined"}
                  />
                </div>
              </div>

              <br />
              <InputField
                id={"edit_section"}
                name={"section"}
                label={"Section"}
                variant={"outlined"}
                onChange={props.handleOnChangeEditSection}
                value={props.section.section || ""}
                type={"text"}
              />
              <br/>
              <br/>
              <InputField
                  id={"edit_secshort"}
                  name={"secshort"}
                  label={"Section short name / acronym"}
                  variant={"outlined"}
                  onChange={props.handleOnChangeEditSection}
                  value={props.section.secshort || ""}
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

export default EditSection;
