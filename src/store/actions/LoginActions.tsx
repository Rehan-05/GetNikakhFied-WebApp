import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  BOOL,
} from "../constants/LoginConstants";
import axios, { AxiosResponse } from "axios";
import baseUrl from "../constants/baseUrl";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
// import { USER_AUTHORIZE } from "./../../store1/actions/ActionsTypes";

// login action
// this action is called in login page
// it redirects to home page
export const login =
  (email: string, password: string, setError: any, navigate: any) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      const { data } = await axios.get(
        `${baseUrl}LoginUser?email=${email}&password=${password}`
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
        payload: "Login Failed,Please try again!",
      });
      setError("Login Failed,Please try again!");
    }
  };

// login action
// this action is called in login page
// it redirects to home page
export const loginWithSocial =
  (loginCreds: any, setError: any, navigate: any) => async (dispatch: any) => {
    const req = `${baseUrl}socialLogin/?email=${loginCreds?.email}&IsFacebook=${loginCreds?.isFacebook}&IsGoogle=${loginCreds?.isGoogle}&IsApple=${loginCreds?.isApple}&profileId=${loginCreds?.profileId}`;
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const { data } = await axios.get(
        loginCreds?.name && loginCreds?.dob && loginCreds?.gender
          ? `${req}&dob=${loginCreds?.dob}&gender=${loginCreds?.gender}&name=${loginCreds?.name}`
          : req
      );

      if (!data) return;
      console.log("loginCreds?.isEmailExits", loginCreds?.isEmailExits);
      if (!loginCreds?.isEmailExits) {
        dispatch(boolCheck(true));
        navigate("/myprofile");
      } else {
        navigate("/");
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
        payload: "Login Failed,Please try again!",
      });
      setError("Login Failed,Please try again!");
    }
  };
// signup action
// this action is called in register page
// it redirects to confirm email page
export const signup =
  (
    email: string,
    password: string,
    name: string,
    dob: string,
    gender: string,
    setbackendError: any,
    navigate: any
  ) =>
  async (dispatch: any) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      const { data } = await axios.get(
        `${baseUrl}RegisterUser?email=${email}&password=${password}&name=${name}&dob=${dob}&gender=${gender}`
      );
      console.log("signup res", data);
      if (!data) return;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      navigate(`/verification/${data?.email}`);
    } catch (error) {
      console.log(error);
      setbackendError("Something went wrong!");
      dispatch({
        type: LOGIN_FAIL,
        payload: error,
      });
    }
  };

// this API is called in verification page
export const getVerificationCode =
  (email: string, setError: any, setverificationCode: any) =>
  async (dispatch: any) => {
    try {
      console.log("resend code func run", email);
      const { data } = await axios.get(
        `${baseUrl}sendEmailCode/?email=${email}`
      );
      console.log("response from verification code", data);
      setverificationCode(data);
    } catch (error) {
      console.log(error);
      setError("Could not send the verification code");
    }
  };

export const logout = (navigate: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    navigate("/login");
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: LOGIN_FAIL,
    //   payload: "Content Update Failed,Please try again!",
    // });
  }
};

export const userExistenceCheck = ({
  email,
}: {
  email: string;
}): Promise<String> => {
  const request = `${baseUrl}checkEmailExists/?email=${email.trim()}`;

  return axios
    .get(request)
    .then((response: AxiosResponse) => {
      const { data, status }: { data: any; status: number } = response;

      return status === 200 ? data : null;
    })
    .catch((e) => {});
};

export const reportAboutUser = ({
  ReportedBy = 0,
  ReportedUser = 0,
  Type = "",
  Details = "",
}: {
  ReportedBy?: number;
  ReportedUser?: number;
  Type?: string;
  Details?: string;
}) => {
  const request = `${baseUrl}Reports`;
  const reportData = {
    reportedBy: ReportedBy,
    reportedUser: ReportedUser,
    type: Type,
    details: Details,
  };

  return axios
    .post(request, reportData)
    .then((response: AxiosResponse) => {
      const { data, status }: { data: object; status: number } = response;
      return status === 200 ? data : null;
    })
    .catch((e) => {});
};

export const boolCheck = (isBool: boolean) => async (dispatch: any) => {
  try {
    dispatch({
      type: BOOL,
      payload: isBool,
    });
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: LOGIN_FAIL,
    //   payload: "Content Update Failed,Please try again!",
    // });
  }
};
