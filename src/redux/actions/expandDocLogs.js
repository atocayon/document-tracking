import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function expandDocLogs(data, socket){
    const {doc_id, date_time} = data;
    Reactotron.log(data);
    Reactotron.log(socket);
    return function(dispatch){

    }
}