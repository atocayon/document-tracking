import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import backgroundImage from "../../../img/backgroundLandingPage.jpg";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from "../../../img/logo.png";
import "../../../styles/style.css";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InfoIcon from '@material-ui/icons/Info';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';

export default function LandingPage() {
  const classes = style();
  return (
    <div className={classes.root}>
      <Grid container >
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box component="div" display="flex" flexDirection="row">
                  <img src={logo} alt="NMP Logo" className={classes.nmpLogo} />
                  <div style={{ flexGrow: 1 }}></div>

                  <div>
                    <Button
                      color="primary"
                      className={classes.btnLogin}
                    >
                      <InfoIcon />
                      &nbsp;About
                    </Button>

                    <Button

                      color="primary"
                      className={classes.btnLogin}
                    >
                      <ContactPhoneIcon />
                      &nbsp;Contact us
                    </Button>

                    <Button

                      color="primary"
                      className={classes.btnLogin}
                    >
                      <AccountCircleIcon />
                      &nbsp;Sign in
                    </Button>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <h1 className={classes.titleText1}>Document</h1>
          <h1 className={classes.titleText2}>Tracking</h1>
          <br />
          <h3 className={classes.subTitleText}> <i>"Manage and track all incoming and outgoing documents in your section."</i> </h3>
          <Button variant="contained" size="large" className={classes.btnGetStarted}>Get Started</Button>
          <br />
          <FormControlLabel
            className={classes.checkboxTermsAgreement}
            control={
              <Checkbox
                checked={true}
                onChange={()=>{}}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={(<h4>I Agree to the <a href="#">Terms & Agreement</a></h4>)}
          />
        </Grid>

        <Grid item xs={6}>

        </Grid>
      </Grid>
    </div>
  );
}

const style = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100vh"
  },
  btnLogin: {
    marginRight: "2vw",
    marginTop: "2vh",
    color: "#000",
    fontSize: "0.9vw"
  },
  paper: {
    left: 0,
    width: "100vw",
    fontFamily: "'Montserrat', sans-serif",
    background: "rgb(255,255,255, 0.9)"
  },
  titleText1: {
    fontFamily: "'Montserrat', sans-serif",
    color: "#000",
    textShadow: "1px 1px 1px black",
    fontSize: "5vw",
    fontWeight: "bold",
    lineHeight: "15px",
    marginTop: "15vh",
    marginLeft: "3vw"
  },
  titleText2: {
    fontFamily: "'Montserrat', sans-serif",
    color: "#000",
    textShadow: "1px 1px 1px black",
    fontSize: "10vw",
    fontWeight: "bold",
    lineHeight: "15px",
    marginLeft: "3vw"
  },
  subTitleText: {
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: "2px",
    marginLeft: "5vw",
    marginBottom: "8vh",
    marginTop: "-2vh"
  },
  btnGetStarted: {
    fontFamily: "'Montserrat', sans-serif",
    marginLeft: "3vw",
    background: "#FF6F00",
    width: "18vw",
    height: "10vh",
    borderRadius: "50px",
    color: "#fafafa",
    fontWeight: "bold",
    fontSize: "1vw",
    textShadow: "1px black"
  },
  checkboxTermsAgreement: {
    fontFamily: "'Montserrat', sans-serif",
    marginLeft: "5vw",
    color: "#000",
    textShadow: "0.8px 0.8px 0.8px black",
    fontWeight: "bold"
  },
  nmpLogo: {
    width: "3vw",
    paddingLeft: "3vw",
    paddingTop: "1vh"
  }
}));
