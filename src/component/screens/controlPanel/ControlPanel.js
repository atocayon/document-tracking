import React, { useEffect, useState } from "react";
import { withSnackbar } from "notistack";
import PropTypes, { func } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import GroupIcon from "@material-ui/icons/Group";
import BusinessIcon from "@material-ui/icons/Business";
import DescriptionIcon from "@material-ui/icons/Description";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { getFromStorage } from "../../storage";
import axios from "axios";
import Users from "./Users";
import { connect } from "react-redux";
import { userRegistration } from "../../../redux/actions/userRegistration";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

function ControlPanel(props) {
  const classes = useStyles();
  const [openUserRegistration, setOpenUserRegistration] = useState(false);
  const [value, setValue] = React.useState(0);
  const [systemUsers, setSystemUsers] = useState([]);
  const [sections, setSections] = useState([]);
  const [error, setError] = useState({});
  const [userInfo, setUserInfo] = useState({
    section: "",
    user_role: "",
    employeeId: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    contact: "",
    position: ""
  });
  useEffect(() => {
    axios
      .get("http://localhost:4000/dts/getUsers")
      .then(_users => {
        setSystemUsers(_users.data);

        axios
          .get("http://localhost:4000/dts/sections")
          .then(_sections => {
            const section = [];
            for (let i = 0; i < _sections.data.length; i++) {
              section.push({
                id: _sections.data[i].secid,
                type: _sections.data[i].section
              });
            }

            setSections(section);
          })
          .catch(err => {
            const variant = "error";
            props.enqueueSnackbar("Error in fetching sections...", { variant });
          });
      })
      .catch(err => {
        const variant = "error";
        props.enqueueSnackbar("Error in fetching users...", { variant });
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpenUserRegistration(true);
  };

  const handleClose = () => {
    setOpenUserRegistration(false);
  };

  const handleLogOutControlPanel = () => {
    const obj = getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      axios
        .post("http://localhost:4000/dts/logout/" + token)
        .then(res => {
          localStorage.clear();
          props.enqueueSnackbar("Session end...");
          window.location.reload();
        })
        .catch(err => {
          const variant = "error";
          props.enqueueSnackbar("Server Error... ", { variant });
        });
    }
  };

  const handleInputChange = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };

  const formValidation = () => {
    const _error = {};
    if (!userInfo.section) _error.section = "Section is required";
    if (!userInfo.user_role) _error.user_role = "User role is required";
    if (!userInfo.employeeId) _error.employeeId = "Employee ID is required";
    if (!userInfo.name) _error.name = "Name is required";
    if (!userInfo.username) _error.username = "Username is required";
    if (!userInfo.password) _error.password = "Password is required";
    if (!userInfo.confirmPassword)
      _error.confirmPassword = "Confirm password is required";
    if (!userInfo.email) _error.email = "Email is required";
    if (!userInfo.contact) _error.contact = "Contact is required";
    if (!userInfo.position) _error.position = "Work position is required";

    setError(_error);

    return Object.keys(_error).length === 0;
  };

  const handleSubmitUserRegistration = async () => {
    if (!formValidation()) {
      const variant = "error";
      props.enqueueSnackbar("All fields are required", { variant });
      return;
    }

    if (userInfo.password === userInfo.confirmPassword) {
      await props.userRegistration(
        userInfo.section,
        userInfo.user_role,
        userInfo.employeeId,
        userInfo.name,
        userInfo.username,
        userInfo.password,
        userInfo.confirmPassword,
        userInfo.email,
        userInfo.contact,
        userInfo.position
      );

      await setUserInfo({
        ...userInfo,
        section: "",
        user_role: "",
        employeeId: "",
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        contact: "",
        position: ""
      });

      await setOpenUserRegistration(false);

      const variant = "info";
      await props.enqueueSnackbar("Registration Success", { variant });
    } else {
      const _error = {};
      _error.password = "Password and Confirm password don't match";
      _error.confirmPassword = "Password and Confirm password don't match";
      setError(_error);
      const variant = "error";
      props.enqueueSnackbar("All fields are required", { variant });
    }
  };

  return (
    <div className={"row"}>
      <div className={"col-md-2"}></div>
      <div className={"col-md-8"}>
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Users" icon={<GroupIcon />} {...a11yProps(0)} />
              <Tab
                label="Divisions"
                icon={<BusinessIcon />}
                {...a11yProps(1)}
              />
              <Tab label="Sections" icon={<BusinessIcon />} {...a11yProps(2)} />
              <Tab
                label="Document Status"
                icon={<DescriptionIcon />}
                {...a11yProps(3)}
              />
              <Tab
                label="Document Type"
                icon={<DescriptionIcon />}
                {...a11yProps(4)}
              />
              <Tab
                label="Document Logs"
                icon={<EqualizerIcon />}
                {...a11yProps(5)}
              />
              <Tab
                label="Users Logs"
                icon={<EqualizerIcon />}
                {...a11yProps(6)}
              />
              <Tab
                label={props.user.username}
                icon={<PowerSettingsNewIcon />}
                onClick={handleLogOutControlPanel}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Users
              systemUsers={systemUsers}
              sections={sections}
              open={openUserRegistration}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              handleInputChange={handleInputChange}
              handleSubmitUserRegistration={handleSubmitUserRegistration}
              error={error}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </div>
      </div>
      <div className={"col-md-2"}></div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userRegistration: state.userRegistration
  };
}

const mapDispatchToProps = {
  userRegistration
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ControlPanel));
