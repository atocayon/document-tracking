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
            open={props.openDialog.open}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Delete "+ props.openDialog.name +"?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Note: If this action is unintended, you can still retrieve this account in <u>Deleted Accounts</u> section in left drawer.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.handleClose} color="primary">
                    cancel
                </Button>
                <Button onClick={props.handleConfirmDeletion} color="primary" autoFocus>
                    confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}