import axios from "axios";
import * as types from "./actionTypes";

export const getTasks = () => (dispatch) => {
  dispatch({ type: types.DATA_REQ });

  const token = localStorage.getItem("token"); 
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  axios
    .get("http://localhost:8080/task/tasks", { headers })
    .then((res) => {
      console.log(res.data)
      dispatch({ type: types.DATA_SUC, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: types.DATA_FAI });
    });
};
