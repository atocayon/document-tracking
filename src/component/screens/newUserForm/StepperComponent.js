import React from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function StepperComponent(props) {
    const classes = useStyles();
  return (
    <>
        <div className={classes.root}>
            <Stepper activeStep={props.activeStep} alternativeLabel>
                {props.steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {props.activeStep === props.steps.length ? (
                    <div style={{textAlign: "right", marginRight: 50}}>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={props.handleSubmit}>Submit</Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{props.getStepContent(props.activeStep)}</Typography>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <div style={{textAlign: "left", marginLeft: 50}}>
                                    <Button
                                        disabled={props.activeStep === 0}
                                        onClick={props.handleBack}
                                    >
                                        Back
                                    </Button>
                                </div>

                            </div>
                            <div className={"col-md-6"}>
                                <div style={{textAlign: "right", marginRight: 50}}>
                                    <Button variant="contained" color="primary" onClick={props.handleNext}  >
                                        {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>

                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    </>
  );
}
