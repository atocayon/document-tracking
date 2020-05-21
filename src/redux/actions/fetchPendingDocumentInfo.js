import actionTypes from "./actionTypes";
import axios from "axios";
import Reactotron from "reactotron-react-js";
export function fetchPendingDocumentInfo(doc_id) {
         return function (dispatch) {
           return axios
             .get("http://10.10.10.16:4000/dts/fetchDocument/" + doc_id)
             .then((doc) => {
               dispatch({
                 type: actionTypes.FETCH_PENDING_DOCUMENT_INFO,
                 data: doc.data,
               });
               axios
                 .get("http://10.10.10.16:4000/dts/fetchActionReq/" + doc_id)
                 .then((action_req) => {
                   dispatch({
                     type: actionTypes.FETCH_ACTION_REQUIRED_PENDING_DOCUMENT,
                     data: action_req.data,
                   });

                   axios
                     .get(
                       "http://10.10.10.16:4000/dts/fetchDocumentDestination/" +
                         doc_id
                     )
                     .then((des) => {
                       dispatch({
                         type: actionTypes.FETCH_DESTINATION_PENDING_DOCUMENT,
                         data: des.data,
                       });

                       axios
                         .get(
                           "http://10.10.10.16:4000/dts/lastForwarder/" + doc_id
                         )
                         .then((forwarder) => {
                             Reactotron.log(forwarder);
                           dispatch({
                             type: actionTypes.FETCH_LAST_DOCUMENT_FORWARDER,
                             data: forwarder.data,
                           });
                         })
                         .catch((err) => {
                           throw err;
                         });
                     })
                     .catch((err) => {
                       throw err;
                     });
                 })
                 .catch((err) => {
                   throw err;
                 });
             })
             .catch((err) => {
               throw err;
             });
         };
       }
