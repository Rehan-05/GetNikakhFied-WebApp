import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import css from "../styles/homePageStyle.module.css";
import { Row, Col, Container, Modal } from "react-bootstrap";
import {
  getOthersProfiles,
  resetSwipeLike_NotLike,
} from "../store/actions/homePageActions";
import words from "./../store/constants/words";
import heartIcon from "../assets/heart.png";
import closeIcon from "../assets/close.png";

import { FaCheck, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/headers/Header";
import Footer from "../components/footer/Footer";

import "../UpdateDesigne/css/bootstrap.min.css";
// import "../UpdateDesigne/css/all.min.css";
import "../UpdateDesigne/css/swiper.css";
import "../UpdateDesigne/css/lightbox.css";
import "../UpdateDesigne/css/style.css";
import Loader from "../components/Loader";
import { reportAboutUser } from "./../store/actions/LoginActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState<any>([]);
  const [userItem, setItem] = useState<any>({ item: "" });
  const [desc, setDesc] = useState<any>("");
  const [saveDesc, setSaveDec] = useState({
    title: "",
    desc: "",
  });
  const imageUrl = "https://shadi.anadeemus.ca/profile/";
  const userInfo = useSelector((state: any) => state?.loginReducer?.userData);
  const AllUsers = useSelector((state: any) => state?.homeRed?.data);
  const [show, setShow] = useState<any>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log("eherjdfjsdlkfjlksdfj", AllUsers);
    navigator.geolocation.getCurrentPosition((position) => {
      ProfileGutterService(
        userInfo?.id,
        position.coords?.latitude,
        position.coords?.longitude,
        18,
        50,
        userInfo?.location,
        userInfo?.profileDetail[0]?.sect,
        false,
        false,
        dispatch
      );
    });
  }, []);

  const ProfileGutterService = (
    id: number,
    lat: number,
    long: number,
    minAge: number,
    maxAge: number,
    location: number,
    sect: string | undefined,
    hideblur: boolean,
    relocatable: boolean,
    dispatch: Function
  ) => {
    getOthersProfiles({
      id,
      lat,
      long,
      minAge,
      maxAge,
      location,
      sect: sect === "all" ? undefined : sect,
      hideblur,
      relocatable,
      dispatch,
    })
      .then((res) => {
        if (Array.isArray(res)) {
          console.log("RESP,", res);
          if (res.length) {
            setUsersData(res);
          }
        }
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const renderItem = (item: any) => {
    return (
      // Paper component not pick classNameName thats why i use innerStyle also same as image tag
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="find_partner">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="row align-items-center">
                      <div className="col-md-7">
                        <div className="user_desc">
                          <div className="left">
                            <h4
                              style={{
                                color: "#fff",
                                textAlign: "left",
                                width: 200,
                              }}
                              className="limitedLineShow"
                            >
                              {item.nickName + ", " + item.age}
                            </h4>
                            <p
                              style={{
                                color: "#fff",
                                textAlign: "left",
                                width: 200,
                              }}
                              className="limitedLineShow"
                            >
                              {item?.country || item.city ? (
                                <FaMapMarkerAlt />
                              ) : null}{" "}
                              {item.city} {item?.country || (item.city && ",")}{" "}
                              {words.countries[item?.country]}
                            </p>
                          </div>

                          <div className="right">
                            <h5>
                              {item.isVerified ? (
                                <FaCheck />
                              ) : (
                                <MdOutlineClose />
                              )}
                              {item.isVerified ? " Verified" : "UnVerified"}
                            </h5>
                          </div>
                        </div>
                        <img
                          src={imageUrl + item.mainPhoto}
                          alt=""
                          className="img-fluid"
                        />
                        {/* <div className="action">
                          <a href="#" onClick={()=>{
                            resetSwipeLike_NotLike(item.id).then(
                              (res: any) => {
                                toast.success("Love ❤️", {
                                  position: "top-right",
                                  autoClose: 1500,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                });
                              }
                            );
                          }}>
                            <FaRegHeart />
                          
                          </a>
                          <a href="#">
                            <MdOutlineClose
                              style={{ fontWeight: "bolder" }}
                              // size={45}
                            />
                          
                          </a>
                        </div> */}
                      </div>
                      <div className="col-md-5">
                        <div className="more_info">
                          <button
                            className="btn"
                            onClick={() => {
                              setSaveDec({
                                title: "About Me",
                                desc: item?.profileDetail[0]?.about,
                              });
                              handleShow();
                            }}
                          >
                            About Me
                          </button>
                          <button
                            className="btn"
                            onClick={() => {
                              setSaveDec({
                                title: "My Career",
                                desc: item?.profileDetail[0]?.educationLevel,
                              });
                              handleShow();
                            }}
                          >
                            My Career
                          </button>
                          <button
                            className="btn"
                            onClick={() => {
                              setSaveDec({
                                title: "My Religion",
                                desc: item?.profileDetail[0]?.cast,
                              });
                              handleShow();
                            }}
                          >
                            My Religion
                          </button>
                          <div className="note">
                            <label>Marriage Goal</label>
                            <p>Will not move abroad</p>
                          </div>

                          <button
                            className="btn report"
                            onClick={() => {
                              setSaveDec({
                                title: "Report User",
                                desc: "",
                              });
                              setItem({ item: item });
                              handleShow();
                            }}
                          >
                            Report User
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container fluid className="homepage window_heaight ">
      <Container>
        <Header />

        {AllUsers ? (
          <>
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>{saveDesc.title}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {saveDesc.title === "Report User" ? (
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      placeholder="Tell us what happened..."
                      style={{
                        backgroundColor: "rgba(255 255 255 / 37%)",
                        color: "#000",
                      }}
                      rows={5}
                      cols={5}
                      onChange={(e) => setDesc(e.target.value)}
                    />

                    <button
                      className="btn"
                      onClick={() => {
                        reportAboutUser({
                          ReportedBy: userInfo?.id,
                          ReportedUser: userItem?.item?.id,
                          Type: "scam_spam",
                          Details: desc,
                        }).then((res: any) => {
                          alert("Report Submitted");
                          handleClose();
                        });
                      }}
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        backgroundColor: "rgb(238, 61, 90)",
                        color: "#fff",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <p style={{ textAlign: "center" }}>
                    {saveDesc.desc ? saveDesc.desc : "No Data !"}
                  </p>
                )}
              </Modal.Body>
            </Modal>

            <Row className="justify-content-md-center">
              <Col md={9}>
                <div>
                  <Carousel
                    autoPlay={false}
                    stopAutoPlayOnHover
                    animation={"fade"}
                    IndicatorIcon
                    NextIcon={<img src={heartIcon} width={25} height={25} />}
                    PrevIcon={<img src={closeIcon} width={25} height={25} />}
                    // navButtonsWrapperProps={{
                    //   // Move the buttons to the bottom. Unsetting top here to override default style.
                    //   style: {
                    //     backgroundColor: "red",
                    //     height: 100,
                    //     width: 100,
                    //   },
                    // }}
                    swipe={false}
                    indicators={true}
                    next={(next: any) => {
                      if (!next) return;
                      resetSwipeLike_NotLike(AllUsers[next]?.id).then(
                        (res: any) => {
                          toast.success("Love ❤️", {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }
                      );
                    }}
                    navButtonsAlwaysVisible
                    prev={(prev: any) => {
                      if (!prev) return;
                      resetSwipeLike_NotLike(AllUsers[prev]?.id, false).then(
                        (res: any) => {
                          toast.success("Pass ❌", {
                            position: "top-right",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }
                      );
                    }}
                    navButtonsProps={{
                      // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS

                      style: {
                        backgroundColor: "white",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.10)",
                        padding: 20,
                      },
                    }}
                  >
                    {AllUsers?.map((item: any) => renderItem(item))}
                  </Carousel>
                </div>
              </Col>
            </Row>
            <ToastContainer />
          </>
        ) : (
          <>
          <Loader
            height="150"
            width="150"
            color="#fff"
            ariaLabel={"loading"}
            visible={!AllUsers ? true : false}
          />
          {/* <h1>Rehan</h1> */}
          </>
        )}
      </Container>
      <Footer />
    </Container>
  );
};

export default HomePage;
