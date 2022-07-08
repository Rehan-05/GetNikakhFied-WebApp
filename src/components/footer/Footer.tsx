import React, { useState } from "react";
import { useNavigate } from "react-router";
import "../../htmlDeigne/css/style.css";
import "../../htmlDeigne/css/bootstrap.min.css";
import "../../htmlDeigne/css/swiper.css";
import { ImGoogle } from "react-icons/im";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { FaFacebookF } from "react-icons/fa";
import css from "../../styles/firstPage.module.css";
import {
  loginWithSocial,
  userExistenceCheck,
} from "../../store/actions/LoginActions";
import { useDispatch, useSelector } from "react-redux";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state?.loginReducer?.userData);
  const [isEmailAlreadyExits, setEmailExits] = useState(false);
  const [loginObj, setloginObj] = useState({
    dob: "",
    profileId: "",
    email: "",
    name: "",
    gender: "",
    isFacebook: false,
    isGoogle: false,
    isApple: false,
  });
  const [toggleNext, settoggleNext] = useState(false);
  const [error, seterror] = useState("");

  // facebook client ID
  const fbClientId = "659688908410198";
  // login with fb clicked
  const componentClicked = (data: any) => {
    console.log("fb login component clicked", data);
  };

  // useEffect(() => {
  //   if (loginObj?.email) {
  //     loginWithSocial(loginObj, seterror, navigate);
  //   }
  // }, [loginObj]);
  // facebook login
  const responseFacebook = (response: any) => {
    if (!response) return;

    userExistenceCheck({ email: response?.email }).then((rex) => {
      console.log("ee", rex);
      if (rex) {
        if (rex === "Doesnt exist") {
          dispatch(
            loginWithSocial(
              {
                profileId: response?.id,
                email: response?.email,
                name: response?.name,
                isFacebook: true,
                isGoogle: false,
                isApple: false,
                isEmailExits: false,
              },
              seterror,
              navigate
            )
          );
          // setSignUpStart(true);
        } else {
          dispatch(
            loginWithSocial(
              {
                profileId: response?.id,
                email: response?.email,
                name: response?.name,
                isFacebook: true,
                isGoogle: false,
                isApple: false,
                isEmailExits: true,
              },
              seterror,
              navigate
            )
          );
        }
      }
    });
    if (response?.id) {
      // setloginObj({
      //   ...loginObj,
      //   profileId: response?.id,
      //   email: response?.email,
      //   name: response?.name,
      //   isFacebook: true,
      //   isGoogle: false,
      //   isApple: false,
      // });
      settoggleNext(true);
    }
  };
  // Google auth client ID
  const clientId =
    "317505138408-cev81s0agji44204vkt7ase1lo1thvff.apps.googleusercontent.com";
  //   google login
  const responseGoogle = (response: any) => {
    if (response.accessToken != null) {
      userExistenceCheck({ email: response?.profileObj?.email }).then((rex) => {
        console.log("ee", rex);
        if (rex) {
          if (rex === "Doesnt exist") {
            dispatch(
              loginWithSocial(
                {
                  profileId: response?.googleId,
                  email: response?.profileObj?.email,
                  name: response?.profileObj?.name,
                  isFacebook: false,
                  isGoogle: true,
                  isApple: false,
                  isEmailExits: false,
                },
                seterror,
                navigate
              )
            );
            // setSignUpStart(true);
          } else {
            dispatch(
              loginWithSocial(
                {
                  profileId: response?.googleId,
                  email: response?.profileObj?.email,
                  name: response?.profileObj?.name,
                  isFacebook: false,
                  isGoogle: true,
                  isApple: false,
                  isEmailExits: true,
                },
                seterror,
                navigate
              )
            );
          }
        }
      });

      // setloginObj({
      //   ...loginObj,
      //   profileId: response?.googleId,
      //   email: response?.profileObj?.email,
      //   name: response?.profileObj?.name,
      //   isFacebook: false,
      //   isGoogle: true,
      //   isApple: false,
      // });
      settoggleNext(true);
    } else {
      seterror("Login with google Failed");
      console.log(response);
    }
  };

  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>Copyright © 2022-2023. All Right Reserved.</p>
          </div>

          <div className="col-md-6">
            {!userInfo ? (
              <ul className="list-unstyled">
                <li>
                  <FacebookLogin
                    appId={fbClientId}
                    // autoLoad={true}
                    fields="name,email,picture"
                    onClick={() => componentClicked}
                    callback={() => responseFacebook}
                    cssClass={`${css?.loginWithFb} ${css?.socialLoginButtons}`}
                    icon={<FaFacebookF />}
                    textButton=""
                  />
                </li>
                <li>
                  <GoogleLogin
                    clientId={clientId}
                    buttonText=""
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    render={(renderProps: any) => (
                      <button
                        id="socialLoginButtons"
                        onClick={renderProps?.onClick}
                        className={`${css?.loginWithGoogleCustomButton} ${css?.socialLoginButtons}`}
                      >
                        <ImGoogle />
                      </button>
                    )}
                  />
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
