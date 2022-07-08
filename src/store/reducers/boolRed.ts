import { BOOL, LOGOUT_REQUEST } from "../constants/LoginConstants";

let initialState = {
  isBool: false,
};
// used for post content
export const boolR = (state = { initialState }, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case BOOL:
      console.log("check Bool", action);
      return {
        ...state,
        isBool: payload,
      };

    case LOGOUT_REQUEST:
      return null;
    default:
      return state;
  }
};
