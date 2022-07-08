// @flow

import { USER_AUTHORIZE } from "./ActionsTypes";

export function request(payload, method) {
  return {
    payload,
    type: USER_AUTHORIZE.REQUEST,
    method,
  };
}

export function success(data) {
  // debugger
  // console.log('success from all orders sections', data)
  return {
    data,
    type: USER_AUTHORIZE.SUCCESS,
  };
}

export function failure(errorMessage) {
  return {
    errorMessage,
    type: USER_AUTHORIZE.FAILURE,
  };
}
