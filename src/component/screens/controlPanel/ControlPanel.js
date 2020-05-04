import React, { useEffect, useRef, useState } from "react";
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
import { Redirect } from "react-router-dom";
import axios from "axios";
import Users from "./Users";
import { connect } from "react-redux";
import { userRegistration } from "../../../redux/actions/userRegistration";
import { addNewDivision } from "../../../redux/actions/addNewDivision";
import {addNewSection} from "../../../redux/actions/addNewSection";
import { fetchUserById } from "../../../redux/actions/fetchUserById";
import { fetchDivisionById } from "../../../redux/actions/fetchDivisionById";
import { fetchAllUsers } from "../../../redux/actions/fetchAllUsers";
import { fetchAllSections } from "../../../redux/actions/fetchAllSections";
import { fetchDivisions } from "../../../redux/actions/fetchDivisions";
import { fetchSectionsList } from "../../../redux/actions/fetchSectionsList";
import { updateUserProfile } from "../../../redux/actions/updateUserProfile";
import { updateDivision } from "../../../redux/actions/updateDivision";
import { deleteUser } from "../../../redux/actions/deleteUser";
import { deleteDivision } from "../../../redux/actions/deleteDivision";
import { inputChange } from "../../../redux/actions/inputChange";
import { logout } from "../../../redux/actions/logout";
import Reactotron from "reactotron-react-js";
import Divisions from "./Divisions";
import Sections from "./Sections";
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
  const [token, setToken] = useState("");
  const [endSession, setEndSession] = useState(false);
  const [openUserRegistration, setOpenUserRegistration] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openAddNewDivision, setOpenAddNewDivision] = useState(false);
  const [openEditDivision, setOpenEditDivision] = useState(false);
  const [openAddNewSection, setOpenAddNewSection] = useState(false);
  const [openEditSection, setOpenEditSection] = useState(false);
  const [value, setValue] = React.useState(0);
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

  const [division, setDivision] = useState({
    department: "",
    depshort: "",
    payroll: ""
  });

  const [section, setSection] = useState({
    division: "",
    section: "",
    secshort: ""
  });

  useEffect(() => {
    const obj = getFromStorage("documentTracking");
    setEndSession(!(obj && obj.token));
    if (obj && obj.token) {
      setToken(obj.token);

      async function fetch() {
        await props.fetchAllUsers();
        await props.fetchAllSections();
        await props.fetchDivisions();
        await props.fetchSectionsList();
      }

      fetch().catch(err => {
        throw err;
      });

      if (props.user_logout !== null) {
        if (props.user_logout === true) {
          localStorage.clear();
          window.location.reload();
        } else {
          const variant = "error";
          props.enqueueSnackbar("Logout Failed", { variant });
        }
      }
    }
  }, [props.user_logout]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpenUserRegistration(true);
  };

  const handleClickOpenAddNewDivision = () => {
    setOpenAddNewDivision(true);
  };

  const handleClickOpenAddNewSection = () => {
    setOpenAddNewSection(true);
  };

  const handleClose = () => {
    setOpenUserRegistration(false);
    setOpenEditUser(false);
    setOpenAddNewDivision(false);
    setOpenEditDivision(false);
    setOpenAddNewSection(false);
    setOpenEditSection(false);
  };

  const handleLogOutControlPanel = async () => {
    const obj = await getFromStorage("documentTracking");
    if (obj && obj.token) {
      const { token } = obj;
      await props.logout(token);
    }
  };

  const handleInputChange = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };

  const handleInputChangeAddNewDivision = ({ target }) => {
    // Reactotron.log(target.value);
    setDivision({ ...division, [target.name]: target.value });
  };

  const handleInputChangeAddNewSection = ({target}) => {
    setSection({...section, [target.name]: target.value});
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

  const formValidationAddNewDivision = () => {
    const _error = {};
    if (!division.department) _error.department = "Department is required";
    if (!division.depshort) _error.depshort = "Provide Department Acronym";
    if (!division.payroll)
      _error.payroll = "Provide Department name that will appear in payroll";

    setError(_error);

    return Object.keys(_error).length === 0;
  };

  const formValidationAddNewSection = () => {
    const _error = {};
    if (!section.division) _error.addNewSection_division = "Division is required";
    if (!section.section) _error.addNewSection_section = "Section is required";
    if (!section.secshort) _error.addNewSection_secshort = "Provide the section acronym / short name";

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

      const variant = "info";
      props.enqueueSnackbar("Registration Success", { variant });
      setOpenUserRegistration(false);
      setUserInfo({
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
    } else {
      const _error = {};
      _error.password = "Password and Confirm password don't match";
      _error.confirmPassword = "Password and Confirm password don't match";
      setError(_error);
      const variant = "error";
      props.enqueueSnackbar("Password and Confirm password don't match", {
        variant
      });
    }
  };

  const handleSubmitAddNewDivision = async () => {
    if (!formValidationAddNewDivision()) {
      const variant = "error";
      props.enqueueSnackbar("All fields are required", { variant });
      return;
    }

    await props.addNewDivision(division);

    setOpenAddNewDivision(false);
    setDivision({
      ...division,
      department: "",
      depshort: "",
      payroll: ""
    });
  };

  const handleSubmitAddNewSection = async () => {
    if (!formValidationAddNewSection()){
      const variant = "error";
      props.enqueueSnackbar("All fields are required", { variant });
      return;
    }

    await props.addNewSection(section);

    setOpenAddNewSection(false);
    setSection({
      ...section,
      division: "",
      section: "",
      secshort: ""
    });

  };
  const handleEditUser = async val => {
    let id = await val;
    setOpenEditUser(true);
    await props.fetchUserById(id);
  };

  const handleSaveEditUser = async () => {
    await props.updateUserProfile(props.fetch_user);
    const variant = "info";
    props.enqueueSnackbar("Update Success", { variant });
    setOpenEditUser(false);
  };

  const handleDeleteUser = async val => {
    let id = val.id;
    let name = val.name;
    await props.deleteUser(id);
    const variant = "warning";
    props.enqueueSnackbar(name + " Deleted", { variant });
  };

  const handleEditDivision = async val => {
    let id = val.depid;
    setOpenEditDivision(true);
    await props.fetchDivisionById(id);
  };

  const handleSaveEditDivision = async () => {
    await props.updateDivision(props.fetch_division);
    const variant = "info";
    props.enqueueSnackbar("Update Success", { variant });
    setOpenEditDivision(false);
  };

  const handleDeleteDivision = async val => {
    let id = val.depid;
    let depshort = val.depshort;
    await props.deleteDivision(id);
    const variant = "warning";
    props.enqueueSnackbar(depshort + " Deleted", { variant });
  };

  return (
    <div className={"row"}>
      {endSession && <Redirect to={"/"} />}
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
              token={token}
              systemUsers={props.fetch_all_user}
              sections={props.fetch_sections}
              open={openUserRegistration}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              handleInputChange={handleInputChange}
              handleSubmitUserRegistration={handleSubmitUserRegistration}
              handleEditUser={handleEditUser}
              openEditUser={openEditUser}
              error={error}
              userInfo={props.fetch_user}
              handleSaveEditUser={handleSaveEditUser}
              handleOnChangeEditUser={props.inputChange}
              handleDeleteUser={handleDeleteUser}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Divisions
              addNewDivisionInputValue={division}
              open={openAddNewDivision}
              openEditDivision={openEditDivision}
              handleClickOpenAddNewDivision={handleClickOpenAddNewDivision}
              handleClose={handleClose}
              divisions={props.fetch_all_divisions}
              handleInputChangeAddNewDivision={handleInputChangeAddNewDivision}
              handleSubmitAddNewDivision={handleSubmitAddNewDivision}
              error={error}
              handleEditDivision={handleEditDivision}
              divisionInfo={props.fetch_division}
              handleOnChangeEditDivision={props.inputChange}
              handleSaveEditDivision={handleSaveEditDivision}
              handleDeleteDivision={handleDeleteDivision}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Sections
              sections={props.fetch_sections_list}
              divisions={props.fetch_all_divisions}
              openAddNewSection={openAddNewSection}
              openEditSection={openEditSection}
              handleClose={handleClose}
              handleClickOpenAddNewSection={handleClickOpenAddNewSection}
              handleInputChangeAddNewSection={handleInputChangeAddNewSection}
              handleSubmitAddNewSection={handleSubmitAddNewSection}
              error={error}
            />
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
    fetch_user: state.fetchUserById,
    fetch_all_user: state.fetchAllUsers,
    fetch_sections: state.fetchAllSections,
    fetch_sections_list: state.fetchSectionsList,
    fetch_division: state.fetchDivisionById,
    fetch_all_divisions: state.fetchDivisions,
    update_user: state.updateUserProfile,
    delete_user: state.deleteUser,
    user_logout: state.logout
  };
}

const mapDispatchToProps = {
  userRegistration,
  addNewDivision,
  addNewSection,
  fetchUserById,
  fetchDivisionById,
  fetchAllUsers,
  fetchAllSections,
  fetchDivisions,
  fetchSectionsList,
  updateUserProfile,
  updateDivision,
  deleteUser,
  deleteDivision,
  inputChange,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ControlPanel));