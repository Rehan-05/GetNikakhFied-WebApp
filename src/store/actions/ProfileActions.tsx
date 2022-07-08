import {
  ADD_NEW_PROFILE_FAIL,
  ADD_NEW_PROFILE_SUCCESS,
  ADD_NEW_PROFILE_REQUEST,
} from "../constants/AddNewProfileConstants";
import baseUrl from "../constants/baseUrl";
import axios, { AxiosResponse } from "axios";
import React from "react";
import { boolCheck } from "./LoginActions";

export const getProfile =
  (id: number, setfullprofile: any, setProfile: any, setcrucialDetails: any) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: ADD_NEW_PROFILE_REQUEST });
      const { data } = await axios.get(`${baseUrl}ProfileDetails/${id}`);
      dispatch({ type: ADD_NEW_PROFILE_SUCCESS, payload: data });
      if (data && data?.profileDetail && data?.profileDetail?.length > 0) {
        setProfile(data?.profileDetail[0]);
      }
      setfullprofile(data);
      setcrucialDetails({
        gender: data?.gender,
        dob: data?.dob,
        nickName: data?.nickName,
        isBlurOn: data?.isBlurOn,
        isFacebook: data?.isFacebook,
        isGoogle: data?.isGoogle,
        facebookProfileId: data?.facebookProfileId,
        googleProfileId: data?.googleProfileId,
        city: data?.city,
        country: data?.country,
        height: data?.height,
        lat: data?.lat,
        lng: data?.lng,
        availableMessages: data?.availableMessages,
        representedBy: data?.representedBy,
        ethnicOrigin: data?.ethnicOrigin,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_NEW_PROFILE_FAIL,
        payload: "Failed to load profile",
      });
    }
  };

export const getCountries = (setCountries: any) => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`${baseUrl}Countries/`);
    setCountries(data);
  } catch (error) {
    console.log(error);
  }
};

// export const updateProfile = (
//   { profileId, ...rest }: { profileId: number },
//   dispatch: any
// ) => {
//   const request = `/ProfileDetails/${profileId}`;
//   dispatch({ type: ADD_NEW_PROFILE_REQUEST });
//   return axios
//     .put(request, { profileId, ...rest })
//     .then((response: AxiosResponse) => {
//       const { data, status }: { data: object; status: number } = response;
//       dispatch({ type: ADD_NEW_PROFILE_SUCCESS, payload: data });
//       return status === 200 ? data : null;
//     })
//     .catch((e) => {
//       dispatch({
//         type: ADD_NEW_PROFILE_FAIL,
//         payload: e,
//       });
//     });
// };

export const updateProfile =
  (id: number, profileData: any) => async (dispatch: any) => {
    try {
      dispatch({ type: ADD_NEW_PROFILE_REQUEST, payload: profileData });
      const { data } = await axios.put(
        `${baseUrl}ProfileDetails/${id}`,
        profileData
      );
      dispatch({ type: ADD_NEW_PROFILE_SUCCESS, payload: data });
      dispatch(boolCheck(false));
      // history('/sectInfo/' + id)
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_NEW_PROFILE_FAIL,
        payload: error,
      });
    }
  };

export const verifyEmail =
  (email: string, setVerification: any, history: any) =>
  async (dispatch: any) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}sendEmailCode/?email=${email}`
      );
      console.log(data);
      setVerification(data?.code);
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_NEW_PROFILE_FAIL,
        payload: "Failed to load profile",
      });
    }
  };

export const DeActivateAccount = (profileId: number) => {
  const request = baseUrl + `DeactivateUserAPI/` + profileId;
  return axios
    .get(request)
    .then((response: AxiosResponse) => {
      const { data, status }: { data: object; status: number } = response;
      return status === 200 || status === 201 ? "ok" : null;
    })
    .catch((e) => {
      // devLogger("errorCaught at " + request, e);
    });
};
