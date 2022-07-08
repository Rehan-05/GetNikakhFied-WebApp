import { Button } from "@mui/material";
import FlatList from "flatlist-react";
import React, { useEffect, useState } from "react";
import { APIConsts, getListOfOtherByFilter } from "../store/actions/Explore";
import { toast, ToastContainer } from "react-toastify";
import { resetSwipeLike_NotLike } from "../store/actions/homePageActions";
import Header from "../components/headers/Header";
import Footer from "../components/footer/Footer";
import matchF from "../htmlDeigne/images/match_f.png";
import matchM from "../htmlDeigne/images/match_m.png";
import colorLogo from "../htmlDeigne/images/logo_color.svg";
import { FaHeart } from "react-icons/fa";

import "../htmlDeigne/css/bootstrap.min.css";
import "../htmlDeigne/css/swiper.css";
import "../htmlDeigne/css/style.css";

const Explore = () => {
  const [key, setKey] = useState<any>("likeyou");
  const imageUrl = "https://shadi.anadeemus.ca/profile/";
  const [likebyList, setLikeByList] = useState<any>([]);
  const [passedList, setPassedList] = useState<any>([]);
  const [likeList, setLikeList] = useState<any>([]);
  const [blockList, setBlockList] = useState<any>([]);
  const [unmatchedList, setUnMatchedList] = useState<any>([]);
  const dummyData = [
    {
      id: 0,
      image: "",
      name: "Hel",
      like: "Like",
    },
  ];

  console.log("key", key);

  useEffect(() => {
    const dummyId = 22492;

    switch (key) {
      case "likeyou":
        getListOfOtherByFilter({ id: dummyId, type: APIConsts.liked_By })
          .then((RES) => {
            if (Array.isArray(RES) && RES.length !== 0) setLikeByList(RES);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case "pass":
        getListOfOtherByFilter({ id: dummyId, type: APIConsts.you_Disliked })
          .then((RES) => {
            if (Array.isArray(RES) && RES.length !== 0) setPassedList(RES);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;
      case "liked":
        getListOfOtherByFilter({ id: dummyId, type: APIConsts.you_Liked })
          .then((RES) => {
            if (Array.isArray(RES) && RES.length !== 0) setLikeList(RES);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;

      case "block":
        getListOfOtherByFilter({ id: dummyId, type: APIConsts.you_Blocked })
          .then((RES) => {
            if (Array.isArray(RES) && RES.length !== 0) setBlockList(RES);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;

      case "unmatched":
        getListOfOtherByFilter({ id: dummyId, type: APIConsts.unMatched })
          .then((RES) => {
            if (Array.isArray(RES) && RES.length !== 0) setUnMatchedList(RES);
          })
          .finally(() => {
            // setLoading(false);
          });
        break;

      default:
        break;
    }
  }, [key]);

  const renderLikedItem = (item: any) => {
    return (
      <div>
        <img
          src={imageUrl + item.mainPhoto}
          style={{
            alignSelf: "center",
            height: "300px",
            width: "300px",
            borderRadius: "20px",
            marginTop: 25,
            // filter: `blur(${item.isBlurOn ? 15 : 0})`,
          }}
          onClick={() => alert("id / " + item?.id)}
        />
        <p>{item.nickName}</p>
        {key === "pass" ? (
          <Button
            onClick={() => {
              resetSwipeLike_NotLike(item.id).then((res: any) => {
                toast.success("Love ❤️", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              });
            }}
            variant="contained"
            color="success"
          >
            Like
          </Button>
        ) : null}
      </div>
    );
  };

  const renderPassedList = (item: any) => {
    return (
      <div className="col-md-3 col-6">
        <div className="inner_passed_area">
          <img src={imageUrl + item.mainPhoto} alt="" className="img-fluid" />
          <p>{item.nickName}</p>
          <FaHeart
            size={30}
            color={"red"}
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              cursor: "pointer",
            }}
            onClick={() => {
              resetSwipeLike_NotLike(item.id).then((res: any) => {
                toast.success("Love ❤️", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              });
            }}
          />
        </div>
      </div>
    );
  };

  const renderLikedList = (item: any) => {
    return (
      <div className="col-md-3 col-6">
        <div className="inner_passed_area">
          <img src={imageUrl + item.mainPhoto} alt="" className="img-fluid" />
          <p>{item.nickName}</p>
        </div>
      </div>
    );
  };

  const renderEmpty = () => {
    return (
      <div className="liked">
        <h1>Its a match</h1>

        <div className="col-md-6 offset-md-3">
          <div className="matched_div">
            <div className="person left_person">
              <img src={matchF} alt="" />
            </div>

            <div className="person right_person">
              <img src={matchM} alt="" />
            </div>

            <i className="far fa-heart"></i>
          </div>

          <button className="btn fill_btn">start chatting</button>
          <button className="btn outline_btn">keep scrolling</button>
        </div>
      </div>
    );
  };
  return (
    <div className="white_bg">
      <div className="container">
        <Header colorLogo={colorLogo} />
        <div className="activity">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${key === "likeyou" ? "active" : ""}`}
                id="like-tab"
                data-bs-toggle="tab"
                data-bs-target="#like"
                type="button"
                role="tab"
                aria-controls="like"
                aria-selected="true"
                onClick={() => setKey("likeyou")}
              >
                Liked You
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${key === "pass" ? "active" : ""}`}
                id="pass-tab"
                data-bs-toggle="tab"
                data-bs-target="#pass"
                type="button"
                role="tab"
                aria-controls="pass"
                aria-selected="false"
                onClick={() => setKey("pass")}
              >
                Passed
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${key === "liked" ? "active" : ""}`}
                id="liked-tab"
                data-bs-toggle="tab"
                data-bs-target="#liked"
                type="button"
                role="tab"
                aria-controls="liked"
                aria-selected="false"
                onClick={() => setKey("liked")}
              >
                Liked
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className={`tab-pane fade show ${
                key === "likeyou" ? "active" : ""
              }`}
              id="like"
              role="tabpanel"
              aria-labelledby="like-tab"
            >
              <div className="fancy_heading" style={{ marginBottom: 70 }}>
                <h3>Like You</h3>
                <p>Peoples who you Like you here</p>
              </div>
              <div className="row">
                <FlatList
                  list={likebyList}
                  renderItem={renderLikedList}
                  renderWhenEmpty={() => renderEmpty()}
                />
              </div>
            </div>

            <div
              className={`tab-pane fade show ${key === "pass" ? "active" : ""}`}
              id="pass"
              role="tabpanel"
              aria-labelledby="pass-tab"
            >
              <div className="fancy_heading">
                <h3>Passed</h3>
                <p>Peoples who you pass will appear here</p>
              </div>

              <div className="passed">
                <div className="row">
                  <FlatList
                    list={passedList}
                    renderItem={renderPassedList}
                    renderWhenEmpty={() => renderEmpty()}
                  />
                </div>
              </div>
            </div>

            <div
              className={`tab-pane fade show ${
                key === "liked" ? "active" : ""
              }`}
              id="liked"
              role="tabpanel"
              aria-labelledby="liked-tab"
            >
              <div className="fancy_heading">
                <h3>You LIked</h3>
                <p>Peoples who you like will appear here</p>
              </div>

              <div className="passed">
                <div className="row">
                  <FlatList
                    list={likeList}
                    renderItem={renderLikedList}
                    renderWhenEmpty={() => renderEmpty()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="likeyou" title=" Liked you">
          <FlatList
            list={likebyList}
            renderItem={renderLikedItem}
            renderWhenEmpty={() => <div>List is empty!</div>}
            // sortBy={["firstName", {key: "lastName", descending: true}]}
            // groupBy={person => person.info.age > 18 ? 'Over 18' : 'Under 18'}
          />
        </Tab>
        <Tab eventKey="pass" title="Passed">
          <FlatList
            list={passedList}
            renderItem={renderLikedItem}
            renderWhenEmpty={() => <div>List is empty!</div>}
          />
          <ToastContainer />
        </Tab>
        <Tab eventKey="like" title="Liked">
          <FlatList
            list={likeList}
            renderItem={renderLikedItem}
            renderWhenEmpty={() => <div>List is empty!</div>}
          />
        </Tab>
        <Tab eventKey="block" title="Blocked">
          <FlatList
            list={blockList}
            renderItem={renderLikedItem}
            renderWhenEmpty={() => <div>List is empty!</div>}
          />
        </Tab>
        <Tab eventKey="unmatched" title="unMatched">
          <FlatList
            list={unmatchedList}
            renderItem={renderLikedItem}
            renderWhenEmpty={() => <div>List is empty!</div>}
          />
        </Tab>
      </Tabs> */}
    </div>
  );
};

export default Explore;
