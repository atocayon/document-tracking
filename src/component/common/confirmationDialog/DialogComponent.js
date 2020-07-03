import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

export default function DialogComponent(props){
    return(
        <Dialog
            fullScreen={props.fullScreen}
            open={props.openDialog}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleClose} color="primary">
                    cancel
                </Button>
                <Button onClick={props.handleConfirm} color="primary" autoFocus>
                    confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}