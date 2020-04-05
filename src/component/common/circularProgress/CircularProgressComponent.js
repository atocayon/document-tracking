import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CircularProgressComponent(){
    return(
        <>
            <div className={"row"}>
                <div className={"col-md-12"}>
                    <div style={{ textAlign: "center", marginTop: 70 }}>
                        <CircularProgress />
                    </div>
                </div>
            </div>
        </>
    );
}