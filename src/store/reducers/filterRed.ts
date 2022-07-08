import { LOGOUT_REQUEST } from "../constants/LoginConstants";
import {
  FILTER_REQUEST,
  FILTER_SUCCESS,
  FILTER_FAIL,
} from "./../constants/filterConstants";

let initialState = {
  filerData: {},
};
// used for post content
export const filterReducer = (state = { initialState }, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case FILTER_REQUEST:
      return {
        ...state,
        filterInfo: null,
        filterL: true,
      };
    case FILTER_SUCCESS:
      return {
        ...state,
        filterL: false,
        filterInfo: payload,
        filterError: "",
        filerData: payload,
      };
    case FILTER_FAIL:
      return {
        ...state,
        filterL: false,
        filterError: payload,
      };

    case LOGOUT_REQUEST:
      return {
        filterInfo: null,
        loginLoading: false,
        loginError: null,
        filerData: null,
      };
    default:
      return state;
  }
};
