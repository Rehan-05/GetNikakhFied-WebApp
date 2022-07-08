import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signup } from "../store/actions/LoginActions";
import { useDispatch } from "react-redux";
import { loginWithSocial } from "../store/actions/LoginActions";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import css from "../styles/firstPage.module.css";
import { FaApple } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { BiEnvelope } from "react-icons/bi";

const FirstScreen = () => {
  //dispatch redux actions
  const dispatch = useDispatch();
  // for routing
  const navigate = useNavigate();
  // if something is missing
  const [somethingisMissing, setsomethingisMissing] = useState(false);
  // for errors
  const [error, seterror] = useState("");
  // login with social toggle
  const [toggleNext, settoggleNext] = useState(false);
  // login with social object
  const [loginObj, setloginObj] = useState({
    profileId: "",
    email: "",
    name: "",
    gender: "",
    isFacebook: false,
    isGoogle: false,
    isApple: false,
    dob: "",
  });

  // facebook client ID
  const fbClientId = "659688908410198";
  // login with fb clicked
  const componentClicked = (data: any) => {
    console.log("fb login component clicked", data);
  };
  // facebook login
  const responseFacebook = (response: any) => {
    if (response?.id) {
      setloginObj({
        ...loginObj,
        profileId: response?.id,
        email: response?.email,
        name: response?.name,
        isFacebook: true,
        isGoogle: false,
        isApple: false,
      });
      settoggleNext(true);
    }
  };
  // Google auth client ID
  const clientId =
    "317505138408-cev81s0agji44204vkt7ase1lo1thvff.apps.googleusercontent.com";
  //   google login
  const responseGoogle = (response: any) => {
    if (response.accessToken != null) {
      console.log(response);
      setloginObj({
        ...loginObj,
        profileId: response?.googleId,
        email: response?.profileObj?.email,
        name: response?.profileObj?.name,
        isFacebook: false,
        isGoogle: true,
        isApple: false,
      });
      settoggleNext(true);
    } else {
      seterror("Login with google Failed");
      console.log(response);
    }
  };
  useEffect(() => {
    console.log("login ob changed", loginObj);
  }, [loginObj]);

  const handleCreateProfile = () => {
    // dispatch(loginWithSocial(response?.id, response?.email, response?.name, '', '', true, false, false, seterror, navigate))
    if (loginObj?.dob && loginObj?.gender) {
      // dispatch(loginWithSocial(loginObj, seterror, navigate))
      console.log("login Obj", loginObj);
    }
  };

  return (
    <div className={css?.backgroundVideoDiv}>
      <video
        autoPlay
        loop
        muted
        // src='https://www.youtube.com/watch?v=zWh3CShX_do'
        src="media/introduction.mp4"
        // controls
        className={css?.videoPlayerClass}
      >
        {/* <source src='https://www.youtube.com/watch?v=zWh3CShX_do' */}
        {/* // type='video/mp4'
            /> */}
      </video>
      <div className={css?.emptyArea}></div>
      {toggleNext ? (
        <div className={css?.firstPageContent}>
          <button onClick={() => settoggleNext(false)} className={css?.backBtn}>
            Back
          </button>
          <select
            placeholder="gender"
            name="gender"
            className={css?.fpSelect}
            onChange={(e) =>
              setloginObj({ ...loginObj, gender: e.target.value })
            }
          >
            <option value="" className={css?.fpSelectOption}>
              Select Gender
            </option>
            <option value="Male" className={css?.fpSelectOption}>
              Male
            </option>
            <option value="Female" className={css?.fpSelectOption}>
              Female
            </option>
          </select>
          {/* {
                somethingisMissing && !loginObj?.gender && <p className={css?.fieldIsMissingWarning}>Please enter your gender</p>
            } */}
          <input
            placeholder="DOB"
            name="DOB"
            value={loginObj?.dob}
            className={css?.fpSelect}
            max="2005-12-31"
            type="date"
            onChange={(e) => setloginObj({ ...loginObj, dob: e.target.value })}
          ></input>
          {/* {
                somethingisMissing && !loginObj?.dob && <p className={css?.fieldIsMissingWarning}>Please enter your DOB</p>
            } */}
          <button
            onClick={handleCreateProfile}
            className={`${css?.signupButton} ${css?.loginSignupbtn}`}
          >
            Create Profile
          </button>
        </div>
      ) : (
        <div className={css?.firstPageContent}>
          <div className={css?.mainHeading}>Allah Said</div>
          <div className={css?.mainQuote}>"And we created you in pairs"</div>
          <div className={css?.loginSignupbuttonsDiv}>
            <button
              onClick={() => navigate("./login")}
              className={`${css?.loginButton} ${css?.loginSignupbtn}`}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className={`${css?.signupButton} ${css?.loginSignupbtn}`}
            >
              Sign up
            </button>
          </div>
          <div className={css?.orMainDiv}>
            <div className={css?.straightLine} />
            <span className={css?.orTag}>OR</span>
            <div className={css?.straightLine} />
          </div>
          {/* <div> */}
          <FacebookLogin
            appId={fbClientId}
            autoLoad={true}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            cssClass={`${css?.loginWithFb} ${css?.socialLoginButtons}`}
            icon={<FaFacebookF />}
            textButton=""
          />
          {/* <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div> */}
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
                <BsGoogle />
              </button>
            )}
          />
          <button
            className={`${css?.loginWithAppleCustomButton} ${css?.socialLoginButtons}`}
          >
            <FaApple />
          </button>
          <button
            onClick={() => navigate("./login")}
            className={`${css?.loginWithEmailCustomButton} ${css?.socialLoginButtons}`}
          >
            <BiEnvelope />
          </button>
        </div>
      )}
    </div>
  );
};

export default FirstScreen;
