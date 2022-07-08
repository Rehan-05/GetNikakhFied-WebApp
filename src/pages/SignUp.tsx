import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/headers/Header";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  loginWithSocial,
  signup,
  userExistenceCheck,
} from "../store/actions/LoginActions";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import css from "../../src/styles/firstPage.module.css";
import { ImGoogle } from "react-icons/im";
import { FaFacebookF } from "react-icons/fa";

import "../Get Nikah/css/bootstrap.min.css";
import "../Get Nikah/css/swiper.css";
import "../Get Nikah/css/style.css";

const SignUp = () => {
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
  // for routing
  const navigate = useNavigate();
  // dispatch redux actions
  const dispatch = useDispatch();
  //name
  const [name, setname] = useState<string>("");
  //gender
  const [gender, setgender] = useState<string>("");
  //DOB
  const [DOB, setDOB] = useState<string>("2000-01-01");
  //email
  const [email, setemail] = useState<string>("");
  const [isEmailAlreadyExits, setEmailExits] = useState(false);
  //password
  const [password, setpassword] = useState<string>("");
  const [password1, setpassword1] = useState<string>("");
  // something is missing
  const [somethingisMissing, setsomethingisMissing] = useState(false);
  // something is missing
  const [invalidEmail, setinvalidEmail] = useState("");
  // something is missing
  const [weakPassword, setweakPassword] = useState("");
  // something is missing
  const [backendError, setbackendError] = useState("");
  // validate email
  function ValidateEmail(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }
  // signup function with basic validations
  const handleSignup = () => {
    if (isEmailAlreadyExits) {
      alert(
        "This email" +
          " " +
          email +
          " " +
          "already have an account try different account ! "
      );
      return;
    }

    if (name && email && DOB && password && password1 && gender) {
      if (ValidateEmail(email)) {
        if (
          password.length > 5 &&
          password1.length > 5 &&
          password === password1
        ) {
          dispatch(
            signup(
              email,
              password,
              name,
              DOB,
              gender,
              setbackendError,
              navigate
            )
          );
        } else {
          setinvalidEmail("Password must contain at least 6 characters.");
        }
      } else {
        setinvalidEmail("Invalid email!");
      }
    } else {
      setsomethingisMissing(true);
    }
  };
  // remove weak password error when user is changing password
  useEffect(() => {
    setweakPassword("");
  }, [password]);

  // remove invalid email error when user is changing email
  useEffect(() => {
    setinvalidEmail("");
  }, [password]);

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
    if (response?.id) {
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
      console.log("response", response);
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
  const checkEmailValid = (getEmail: any) => {
    userExistenceCheck({ email: getEmail }).then((rex) => {
      console.log("ee", rex);
      if (rex) {
        if (rex === "Doesnt exist") {
          setEmailExits(false);
          // setSignUpStart(true);
        } else {
          setEmailExits(true);
        }
      }
    });
  };

  return (
    <div className="signup_page window_heaight">
      <div className="container">
        <Header />

        <div className="login">
          <div className="row">
            <div className="col-md-6 offset-md-6">
              <div className="login">
                <h2>
                  Welcome <small>Create account to find your soulmate</small>
                </h2>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      style={{
                        backgroundColor: "rgba(255 255 255 / 37%)",
                        color: "#fff",
                      }}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <select
                      placeholder="gender"
                      name="gender"
                      className="form-control"
                      onChange={(e) => setgender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <input
                      placeholder="DOB"
                      className="form-control"
                      name="DOB"
                      value={DOB}
                      max="2005-12-31"
                      type="date"
                      onChange={(e) => setDOB(e.target.value)}
                    ></input>
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      style={{
                        backgroundColor: "rgba(255 255 255 / 37%)",
                        color: isEmailAlreadyExits ? "red" : "#fff",
                      }}
                      autoComplete="off"
                      name="email"
                      onChange={(e) => {
                        checkEmailValid(e.target.value);
                        setemail(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      style={{
                        backgroundColor: "rgba(255 255 255 / 37%)",
                        color: "#fff",
                      }}
                      name="password"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Comfirm Password"
                      style={{
                        backgroundColor: "rgba(255 255 255 / 37%)",
                        color: "#fff",
                      }}
                      onChange={(e) => setpassword1(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    {/* <input
                      type="submit"
                      onClick={() => handleSignup()}
                      className="btn"
                      value="SIGNUP"
                    /> */}

                    <button onClick={handleSignup} className="btn">
                      Signup
                    </button>
                  </div>

                  <div className="col-md-6">
                    <p>
                      Already have account ?
                      <a href="#" onClick={() => navigate("/login")}>
                        {" "}
                        Login Here
                      </a>
                    </p>
                  </div>
                </div>
                <h5>Sign up with</h5>
                <ul className="list-unstyled social_signup">
                  <li>
                    <a href="#">
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
                    </a>
                  </li>
                  <li>
                    <a href="#">
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
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
