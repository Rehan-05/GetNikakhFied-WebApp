// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach((type) => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const USER_AUTHORIZE = createRequestTypes("USER_SIGN_IN");
export const USER_LOGOUT = createRequestTypes("USER_LOGOUT");
export const AUTH_LOADING = createRequestTypes("AUTH_LOADING");
export const FETCHING_LOADING = createRequestTypes("FETCHING_LOADING");
export const USER_EDIT = createRequestTypes("USER_EDIT");
export const UPDATE_IMAGES = createRequestTypes("UPDATE_IMAGES");
export const UPDATE_PROFILE_DETAILS = createRequestTypes(
  "UPDATE_PROFILE_DETAILS"
);
export const UPDATE_REPRESENTATION = createRequestTypes(
  "UPDATE_REPRESENTATION"
);
export const UPDATE_FILTER = createRequestTypes("UPDATE_FILTER");
export const FILTER_RESET = createRequestTypes("FILTER_RESET");
export const LOAD_ROOMS = createRequestTypes("LOAD_ROOMS");
export const SET_CURRENT_ROOM = createRequestTypes("SET_CURRENT_ROOM");
export const SET_CURRENT_ROOM_CHAT = createRequestTypes(
  "SET_CURRENT_ROOM_CHAT"
);
//----------------------------------------------------
export const SET_CHAT_REMAIN = createRequestTypes("SET_CHAT_REMAIN");
export const SET_CHAT_REMAIN_SUBTRUCT = createRequestTypes(
  "SET_CHAT_REMAIN_SUBTRUCT"
);
export const SET_CHAT_WITH = createRequestTypes("SET_CHAT_WITH");
export const UPDATE_CURRENT_CHAT = createRequestTypes("UPDATE_CURRENT_CHAT");
export const ReCHARGE_IT = createRequestTypes("ReCHARGE_IT");
export const ReCHARGE_IT_OW = createRequestTypes("ReCHARGE_IT_OW");
export const DeCHARGE_IT = createRequestTypes("DeCHARGE_IT");
export const GENDER = createRequestTypes("gender");
