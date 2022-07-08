import axios, { AxiosResponse } from "axios";
import { FILTER_SUCCESS } from "../constants/filterConstants";
import baseUrl from "./../constants/baseUrl";
import { FILTER_REQUEST, FILTER_FAIL } from "./../constants/filterConstants";

const APIConsts = {
  like: "Like",
  dislike: "Dislike",
  blocked: "Block",
  unblock: "Unblock",
  unMatched: "UnMatched",
  swipe_Reset: "SwipeReset",
  unmatched: "Unmatched",
  profiles_List: "ProfilesList",
  you_Liked: "YouLiked",
  you_Disliked: "YouDisliked",
  liked_By: "LikedBy",
  you_Blocked: "YouBlocked",
  pass: "Pass",
};

const getListOfOtherByFilter = ({ id, type }: { id: number; type: string }) => {
  const request =
    type === APIConsts.liked_By
      ? baseUrl + `${type}/${id}`
      : baseUrl + `${type}/?id=${id}`;

  // devLogger("getListOfOtherByFilter", request);
  return axios
    .get(request)
    .then((response: AxiosResponse) => {
      const { data, status }: { data: object; status: number } = response;
      console.log("res", response);
      return status === 200 ? data : null;
    })
    .catch((e) => {
      // devLogger("errorCaught", e);
    });
};

const saveFilterData = (payload: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: FILTER_REQUEST,
    });

    dispatch({
      type: FILTER_SUCCESS,
      payload: payload,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FILTER_FAIL,
      payload: "Not Save Filter Data!!!",
    });
  }
};

export { getListOfOtherByFilter, APIConsts, saveFilterData };
