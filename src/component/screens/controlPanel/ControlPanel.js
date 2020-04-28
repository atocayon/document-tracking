import React, { useEffect, useState } from "react";
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
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
  const [value, setValue] = React.useState(0);
  const [systemUsers, setSystemUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/dts/getUsers")
      .then(_users => {
        setSystemUsers(_users.data);
      })
      .catch(err => {
        const variant = "error";
        props.enqueueSnackbar("Server error...", { variant });
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          props.enqueueSnackbar("Server Error... " + err);
        });
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
            <Users systemUsers={systemUsers} />
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

export default withSnackbar(ControlPanel);
