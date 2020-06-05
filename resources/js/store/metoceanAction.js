import axios from "axios"
import * as actionTypes from "./actionTypes";

// get data from backend
export const fetchHoulyData = () => {
  const url = "/api/data";
  
  return async (dispatch) => {
    try {
      axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: actionTypes.GET_HOULY_DATA,
          data: data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// get columns from backend
export const fetchColumns = () => {
  const url = "/api/column";
  
  return async (dispatch) => {
    try {
      axios
        .get(url)
        .then((response) => response.data)
        .then((data) => {
          dispatch({
            type: actionTypes.GET_COLUMNS,
            columns: data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
};
