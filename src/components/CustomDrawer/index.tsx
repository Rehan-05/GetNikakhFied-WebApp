import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Header from "../headers/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { FaFacebookF } from "react-icons/fa";
import { ImFacebook, ImGoogle } from "react-icons/im";
import css from "../../styles/firstPage.module.css";
import { loginWithSocial } from "../../store/actions/LoginActions";
import { FaBars, FaBell, FaUser } from "react-icons/fa";
import { logout } from "./../../store/actions/LoginActions";

const CustomDrawer = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(props.isDrawerOpen);
  const userInfo = useSelector((state: any) => state?.loginReducer?.userData);
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
  const responseFacebook = (response: any) => {
    if (response?.id) {
      dispatch(
        loginWithSocial(
          {
            profileId: response?.id,
            email: response?.email,
            name: response?.name,
            isFacebook: true,
            isGoogle: false,
            isApple: false,
          },
          seterror,
          navigate
        )
      );
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
      dispatch(
        loginWithSocial(
          {
            profileId: response?.googleId,
            email: response?.profileObj?.email,
            name: response?.profileObj?.name,
            isFacebook: false,
            isGoogle: true,
            isApple: false,
          },
          seterror,
          navigate
        )
      );
      settoggleNext(true);
    } else {
      seterror("Login with google Failed");
      console.log(response);
    }
  };

  return (
    <Drawer anchor={"right"} open={isOpen}>
      <div
        style={{
          paddingRight: 130,
          paddingLeft: 20,
          height: "100%",
          backgroundColor: "rgb(237, 25, 122)",
        }}
      >
        <div style={{ paddingTop: 50 }}>
          <IoClose
            size={40}
            style={{ position: "absolute", right: 0, left: 220, top: 10 }}
            onClick={() => {
              setIsOpen(false);
              props.setIsOpen(false);
            }}
            color={"#fff"}
          />
        </div>
        <ul className="list-unstyled" style={{ color: "#fff" }}>
          <li style={{ padding: 10, fontSize: 23 }}>
            <a style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Home
            </a>
          </li>
          <li style={{ paddingLeft: 10, fontSize: 23 }}>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => navigate(userInfo ? "/findpartner" : "/login")}
            >
              Find partner
            </a>
          </li>
          <li style={{ padding: 10, fontSize: 23 }}>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => navigate(userInfo ? "/explore" : "/login")}
            >
              Explore
            </a>
          </li>
          <li style={{ padding: 10, fontSize: 23 }}>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => navigate(userInfo ? "/chats" : "/login")}
            >
              Chats
            </a>
          </li>
          <li style={{ paddingLeft: 10, fontSize: 23 }}>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => navigate(userInfo ? "/myprofile" : "/login")}
            >
              profile
            </a>
          </li>
          <li style={{ padding: 10, fontSize: 23 }}>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (!userInfo) return navigate("/login");
                navigate("/myprofile", { state: { isSetting: true } });
              }}
            >
              setting
            </a>
          </li>
          <li style={{ paddingLeft: 10, fontSize: 23 }}>
            <a>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (!userInfo) {
                    navigate("/login");
                  } else {
                    // console.log("//////", logout);
                    dispatch(logout(navigate));
                  }
                }}
              >
                {userInfo ? "Logout" : "Login"}
              </span>
            </a>
          </li>
        </ul>

        <div>
          {!userInfo ? (
            <ul
              className="list-unstyled"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <li>
                <FacebookLogin
                  appId={fbClientId}
                  // autoLoad={true}
                  fields="name,email,picture"
                  onClick={() => componentClicked}
                  callback={() => responseFacebook}
                  cssClass={`${css?.loginWithFb} ${css?.socialLoginButtons}`}
                  icon={<FaFacebookF size={25} />}
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
                      <ImGoogle size={25} style={{ marginLeft: 15 }} />
                    </button>
                  )}
                />
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
