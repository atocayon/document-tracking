import React from "react";
import {withSnackbar} from "notistack";

function DocumentInfo(props){
    return(
        <h1>Document Info</h1>
    );
}

export default withSnackbar(DocumentInfo);