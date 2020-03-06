import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import backgroundImage from "../img/backgroundLandingPage.jpg";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from "../img/logo.png";
import "../styles/style.css";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function LandingPage() {
  const classes = style();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box component="div" display="flex" flexDirection="row">
                  <img src={logo} alt="NMP Logo" className={classes.nmpLogo} />
                  <div style={{ flexGrow: 1 }}></div>

                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.btnLogin}
                    >
                      <AccountCircleIcon />
                      Login
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
            label={(<p>I Agree to the <a href="#">Terms & Agreement</a></p>)}
          />


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
    marginTop: "2vh"
  },
  paper: {
    fontFamily: "'Righteous', cursive",
    background: "rgb(255,255,255, 0.9)",
  },
  titleText1: {
    // fontFamily: "'Montserrat', sans-serif",
    color: "#fff",
    textShadow: "1px 1px 1px black",
    fontSize: "5vw",
    fontWeight: "bold",
    lineHeight: "10px",
    marginTop: "20vh",
    marginLeft: "3vw"
  },
  titleText2: {
    // fontFamily: "'Montserrat', sans-serif",
    color: "#fff",
    textShadow: "1px 1px 1px black",
    fontSize: "10vw",
    fontWeight: "bold",
    lineHeight: "10px",
    marginLeft: "3vw"
  },
  btnGetStarted: {
    marginLeft: "3vw",
    background: "#FF6F00",
    width: "20vw",
    height: "10vh",
    borderRadius: "50px",
    color: "#fafafa",
    fontWeight: "bold",
    fontSize: "1.5vw",
    textShadow: "1px black",
    
  },
  checkboxTermsAgreement: {
    marginLeft: "5vw",
    color: "#fafafa",
    textShadow: "0.8px 0.8px 0.8px black",
    fontWeight: 'bold',
  },
  nmpLogo: {
    width: "3vw",
    paddingLeft: "3vw",
    paddingTop: "1vh"
  }
}));
