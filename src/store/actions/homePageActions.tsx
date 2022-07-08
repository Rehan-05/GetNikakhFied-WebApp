import axios, { AxiosResponse } from "axios";
import {
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
} from "../constants/homePageConstants";
import baseUrl from "./../constants/baseUrl";
import { GET_ALL_USER_SUCCESS } from "./../constants/homePageConstants";

const getOthersProfiles = ({
  id,
  lat,
  long,
  location = 500,
  minAge = 18,
  hideblur = false,
  maxAge = undefined,
  sect = undefined,
  relocatable = undefined,
  dispatch,
}: {
  id: number;
  lat: number;
  long: number;
  location?: number;
  minAge?: number;
  hideblur?: boolean;
  maxAge?: number | undefined;
  sect?: string | undefined;
  relocatable?: boolean | undefined;
  dispatch: Function;
}) => {
  const request =
    baseUrl +
    `ProfilesList/${id}?lat=${lat}&lng=${long}&location=${location}&minAge=${minAge}&hideblur=${hideblur}` +
    (maxAge ? `&maxAge=${maxAge}` : "") +
    (sect ? `&sect=${sect}` : "") +
    (relocatable !== undefined ? `&relocatable=${relocatable}` : "");
  dispatch({
    type: GET_ALL_USER_REQUEST,
    isFaching: true,
  });
  return axios
    .get(request)
    .then((response: AxiosResponse) => {
      const { data, status }: { data: object; status: number } = response;
      if (status === 200) {
        dispatch({
          type: GET_ALL_USER_SUCCESS,
          payload: data,
          isFaching: false,
        });
        return status === 200 ? data : null;
      }
    })
    .catch((e) => {
      //   devLogger("errorCaught", e);
      dispatch({
        type: GET_ALL_USER_FAIL,
        error: e,
      });
      console.log("errorCaught", e);
    });
};

const resetSwipeLike_NotLike = (Id: number, like = true) => {
  const request = baseUrl + "Reset" + (like ? "" : "Dis") + "likes/" + Id;

  return axios
    .get(request)
    .then((response: AxiosResponse) => {
      const { data, status }: { data: object; status: number } = response;
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log("error", e);
    });
};

export { getOthersProfiles, resetSwipeLike_NotLike };
