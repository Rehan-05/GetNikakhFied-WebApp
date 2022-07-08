import React, { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../htmlDeigne/images/logo_white.svg";
import "../../htmlDeigne/css/style.css";
import "../../htmlDeigne/css/bootstrap.min.css";
import "../../htmlDeigne/css/swiper.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../store/actions/LoginActions";
import { FaBars, FaBell, FaUser } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import CustomDrawer from "../CustomDrawer";

const Header = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [drawerIsOpen, setDrawerIsOpen] = useState<any>(false);
  const [isDrawer, setIsDrawer] = useState<any>(false);
  const userInfo = useSelector((state: any) => state?.loginReducer?.userData);
  const boolCheck = useSelector((state: any) => state?.boolR);
  const [show, setShow] = useState<any>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="header">
      <div className="row align-items-center">
        <div className="col-4">
          <div className="logo">
            <img
              src={props.colorLogo ? props.colorLogo : logo}
              alt=""
              className="img-fluid"
            />
          </div>
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Notification List</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p style={{ textAlign: "center" }}>No Notification!</p>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "center",
                cursor: "pointer",
                paddingLeft: 20,
                paddingRight: 20,
              }}
              onClick={() => {}}
            >
              <img
                src={profile}
                alt=""
                className="img-fluid"
                width={50}
                height={50}
                style={{ borderRadius: 50 }}
              />

              <p style={{ paddingTop: 15, paddingLeft: 10 }}>
                Hi Welcome {userInfo?.nickName}
              </p>
            </div> */}
          </Modal.Body>
        </Modal>

        <div className="col-8">
          <div className="right_area">
            { userInfo ? (
            <div className="menu">
              <ul className="list-unstyled">
                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (
                        !boolCheck?.isBool ||
                        boolCheck?.isBool === undefined
                      ) {
                        navigate("/");
                      } else {
                        alert("Complete all mandatory fields first !");
                      }
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (
                        !boolCheck?.isBool ||
                        boolCheck?.isBool === undefined
                      ) {
                        navigate(userInfo ? "/findpartner" : "/login");
                      } else {
                        alert("Complete all mandatory fields first !");
                      }
                    }}
                  >
                    Find partner
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (
                        !boolCheck?.isBool ||
                        boolCheck?.isBool === undefined
                      ) {
                        navigate(userInfo ? "/explore" : "/login");
                      } else {
                        alert("Complete all mandatory fields first !");
                      }
                    }}
                  >
                    Explore
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(userInfo ? "/chats" : "/login")}
                  >
                    Chats
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(userInfo ? "/myprofile" : "/login")}
                  >
                    profile
                  </a>
                </li>
                <li>
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
              </ul>

              <button
                className="btn toggler"
                onClick={() => {
                  if (isDrawer) {
                    setIsDrawer(false);
                  } else {
                    setIsDrawer(true);
                  }
                }}
              >
                {isDrawer ? (
                  <CustomDrawer
                    isDrawerOpen={!drawerIsOpen}
                    setIsOpen={(e: boolean) => {
                      setDrawerIsOpen(e);
                      setIsDrawer(false);
                    }}
                  />
                ) : null}
                <FaBars />
              </button>

              <button className="btn">
                <i
                  className="fa fa-user-alt"
                  onClick={() => navigate(userInfo ? "/myprofile" : "/login")}
                >
                  <FaUser />
                </i>
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
              </button>

              <button
                className="btn"
                style={{
                  marginLeft: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => handleShow()}
              >
                <FaBell />
                <div
                  style={{
                    fontSize: 12,
                    paddingLeft: 5,
                  }}
                >
                  25
                </div>
              </button>
            </div>
            ) : (
              <div className="menu">
              <ul className="list-unstyled">
                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (
                        !boolCheck?.isBool ||
                        boolCheck?.isBool === undefined
                      ) {
                        navigate("/");
                      } else {
                        alert("Complete all mandatory fields first !");
                      }
                    }}
                  >
                    Home
                  </a>
                </li>
                {/* <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (
                        !boolCheck?.isBool ||
                        boolCheck?.isBool === undefined
                      ) {
                        navigate(userInfo ? "/findpartner" : "/login");
                      } else {
                        alert("Complete all mandatory fields first !");
                      }
                    }}
                  >
                    Find partner
                  </a>
                </li> */}
                {/* <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (
                        !boolCheck?.isBool ||
                        boolCheck?.isBool === undefined
                      ) {
                        navigate(userInfo ? "/explore" : "/login");
                      } else {
                        alert("Complete all mandatory fields first !");
                      }
                    }}
                  >
                    Explore
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(userInfo ? "/chats" : "/login")}
                  >
                    Chats
                  </a>
                </li> */}
                {/* <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(userInfo ? "/myprofile" : "/login")}
                  >
                    profile
                  </a>
                </li>
                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (!userInfo) return navigate("/login");
                      navigate("/myprofile", { state: { isSetting: true } });
                    }}
                  >
                    setting
                  </a>
                </li> */}
              </ul>

              <button
                className="btn toggler"
                onClick={() => {
                  if (isDrawer) {
                    setIsDrawer(false);
                  } else {
                    setIsDrawer(true);
                  }
                }}
              >
                {isDrawer ? (
                  <CustomDrawer
                    isDrawerOpen={!drawerIsOpen}
                    setIsOpen={(e: boolean) => {
                      setDrawerIsOpen(e);
                      setIsDrawer(false);
                    }}
                  />
                ) : null}
                <FaBars />
              </button>

              <button className="btn">
                <i
                  className="fa fa-user-alt"
                  onClick={() => navigate(userInfo ? "/myprofile" : "/login")}
                >
                  <FaUser />
                </i>
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
              </button>

              {/* <button
                className="btn"
                style={{
                  marginLeft: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => handleShow()}
              >
                <FaBell />
                <div
                  style={{
                    fontSize: 12,
                    paddingLeft: 5,
                  }}
                >
                  25
                </div>
              </button> */}
            </div> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
