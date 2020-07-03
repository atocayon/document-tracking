import actionTypes from "./actionTypes";

export function handleSearchSectionDocuments({target}) {
  return async function (dispatch) {

      if (target.value !== ""){
          await dispatch({
              type: actionTypes.HANDLE_SEARCH_SECTION_DOCUMENT,
              data: target.value
          });
      }else{
          window.location.reload(true);
      }

    // return axios
    //   .get(server_ip.SERVER_IP_ADDRESS+"searchUserDocument/" + target.value)
    //   .then((res) => {
    //
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
  };
}
