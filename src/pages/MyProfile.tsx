import React, { useState } from "react";
import cover from "../htmlDeigne/images/cover.jpg";
import profile from "../htmlDeigne/images/profile.jpg";
import verified from "../htmlDeigne/images/verified.svg";

import edit from "../htmlDeigne/images/edit.svg";
import filter from "../htmlDeigne/images/filter.svg";
import setting from "../htmlDeigne/images/setting.svg";
import report from "../htmlDeigne/images/report.svg";

import img1 from "../htmlDeigne/images/img1.png";
import img2 from "../htmlDeigne/images/img2.png";
import img3 from "../htmlDeigne/images/img3.png";
import img4 from "../htmlDeigne/images/img4.png";
import locationIcon from "../htmlDeigne/images/location.svg";
import abrod from "../htmlDeigne/images/abrod.svg";
import blur from "../htmlDeigne/images/blur.svg";
import sect from "../htmlDeigne/images/sect.svg";
import age from "../htmlDeigne/images/age.svg";

import upload from "../htmlDeigne/images/upload.svg";
import email from "../htmlDeigne/images/email.svg";
import colorLogo from "../htmlDeigne/images/logo_color.svg";

import "../htmlDeigne/css/style.css";

import { logout } from "../store/actions/LoginActions";
import { useLocation, useNavigate } from "react-router";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { FaUserTimes, FaPowerOff, FaEdit } from "react-icons/fa";

import { Button, Modal } from "react-bootstrap";
import {
  DeActivateAccount,
  updateProfile,
} from "../store/actions/ProfileActions";
import Header from "./../components/headers/Header";
import Footer from "../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import words from "./../store/constants/words";
import moment from "moment";
import { completedData } from "../store/constants/utils";
import { saveFilterData } from "../store/actions/Explore";

const MyProfile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const boolCheck = useSelector((state: any) => state?.boolR);
  const check = location.state;
  const navigate = useNavigate();
  const [isActive, setActive] = useState<any>(
    boolCheck?.isBool || check ? 2 : 0
  );
  const [show, setShow] = useState<any>(false);
  const userInfo = useSelector((state: any) => state?.loginReducer?.userData);

  const filterData = useSelector(
    (state: any) => state?.filterReducer?.filerData
  );
  const imageUrl = "https://shadi.anadeemus.ca/profile/";
  const [value, setValue] = React.useState<any>("");
  const [matchType, setMatchType] = React.useState<any>(false);
  const [RangeValueL, setRangeValueL] = useState<any>(
    filterData?.ageL ? filterData?.ageL : ""
  );
  const [RangeValueR, setRangeValueR] = useState<any>(
    filterData?.ageR ? filterData?.ageR : ""
  );
  const [locationRangValue, setLocationRangValue] = useState<any>(
    filterData?.limitData ? filterData?.limitData : ""
  );
  const [sectF, setSectF] = useState<any>();
  const [hideF, setHideF] = useState<any>(
    filterData?.hideF ? filterData?.hideF : false
  );
  const [abroadF, setAbroadF] = useState<any>(
    filterData?.abroadF ? filterData?.abroadF : false
  );

  const [userName, setName] = useState<any>(userInfo?.nickName);
  const [gender, setGender] = useState<any>(userInfo?.gender);
  const [userdob, setDob] = useState<any>(
    moment(userInfo?.dob).format("DD-MM-YYYY")
  );
  const [countryName, setCountryName] = useState<any>(
    words.countries[userInfo?.country]
  );
  const [userCity, setCity] = useState<any>(userInfo?.city);
  const [userHeight, setHeight] = useState<any>(userInfo?.height);
  const [userStatusM, setStatusM] = useState<any>(
    userInfo?.profileDetail[0]?.statusMessage
  );
  const [userSect, setSect] = useState<any>();
  const [userPraying, setPraying] = useState<any>();
  const [userReligiosity, setReligiosity] = useState<any>();
  const [userSmoke, setSmoke] = useState<any>();
  const [userCastP, setCastP] = useState<any>();
  const [userCityP, setCityP] = useState<any>();
  const [userDemandP, setDemandP] = useState<any>();
  const [userProfessionP, setProfessionP] = useState<any>();
  const [userSiblingP, setSiblingP] = useState<any>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const completed = (): number =>
    userInfo ? parseInt(completedData(userInfo).toFixed(0)) : 0;

  const _onFocus = (e: any) => {
    e.currentTarget.type = "date";
  };
  const _onBlur = (e: any) => {
    e.currentTarget.type = "text";
    // e.currentTarget.placeholder = moment(userInfo?.dob).format("DD/MM/YYYY");
    e.currentTarget.value = moment(userInfo?.dob).format("DD/MM/YYYY");
  };

  const FileInputChange = (event: any) => {
    let type = event.target.files[0].type;
    let file = event.target.files[0];
    if (type !== "image/jpeg" && type !== "image/png" && type !== "image/GIF") {
      setMatchType(false);
    } else {
      setMatchType(true);
    }
    console.log("file", file);
    const fileData = new FormData();
    setValue(file);
    fileData.append("file", file);
    fileData.append("type", "images");
    fileData.append("object", "certificates");
  };

  const _validation = () => {
    if (userName === "") {
      alert("Enter User Name");
      return true;
    }
    if (gender === "") {
      alert("Select Gender");
      return true;
    }
    if (userdob === "") {
      alert("Select DOB");
      return true;
    }
    if (countryName === "") {
      alert("Select Country");
      return true;
    }
    if (userCity === "") {
      alert("Select City");
      return true;
    }
    // if (userHeight === "") {
    //   alert("Select Height");
    //   return true;
    // }
    // if (userStatusM === "") {
    //   alert("Enter Status");
    //   return true;
    // }
    // if (userSect === "") {
    //   alert("Select Sect");
    //   return true;
    // }
    // if (userPraying === "") {
    //   alert("Select Praying");
    //   return true;
    // }
    // if (userReligiosity === "") {
    //   alert("Select Religiosity");
    //   return true;
    // }
    // if (userSmoke === "") {
    //   alert("Select Smoke Status");
    //   return true;
    // }
    // if (userCastP === "") {
    //   alert("Select Cast");
    //   return true;
    // }
    // if (userCityP === "") {
    //   alert("Select City");
    //   return true;
    // }
    // if (userDemandP === "") {
    //   alert("Select Demand");
    //   return true;
    // }

    // if (userProfessionP === "") {
    //   alert("Select Profession");
    //   return true;
    // }
    // if (userSiblingP === "") {
    //   alert("Select Sibling");
    //   return true;
    // }

    return false;
  };

  const onSubmit = () => {
    if (_validation()) return;

    // let payload = {
    // userName
    // gender
    // userdob
    // countryName
    // userCity
    // userHeight
    // userStatusM
    // userSect
    // userPraying
    // userReligiosity
    // userSmoke
    // userCastP
    // userCityP
    // userDemandP
    // userProfessionP
    // userSiblingP
    // };

    let payload = {
      id: userInfo?.profileDetail[0]?.id,
      profileId: userInfo?.profileDetail[0]?.profileId,
      maritalStatus: userInfo?.profileDetail[0]?.maritalStatus,
      statusMessage: userStatusM,
      phone: userInfo?.profileDetail[0]?.phone,
      about: userInfo?.profileDetail[0]?.about,
      haveChildren: userInfo?.profileDetail[0].haveChildren,
      marriagePlan: userInfo?.profileDetail[0].marriagePlan,
      canRelocate: userInfo?.profileDetail[0].canRelocate,
      location: userInfo?.location,
      religiousityLevel: userInfo?.profileDetail[0].religiousityLevel,
      prayingInfo: userInfo?.profileDetail[0].prayingInfo,
      onlyHalal: userInfo?.profileDetail[0].onlyHalal,
      doesSmoke: userSmoke,
      doesAlcohol: userInfo?.profileDetail[0].doesAlcohol,
      sect: userSect,
      isConvertRevert: userInfo?.profileDetail[0].doesAlcohol,
      dressingStyle: userInfo?.profileDetail[0].dressingStyle,
      ethnicGroupId: userInfo?.profileDetail[0].ethnicGroupId,
      ethnicOriginId: userInfo?.profileDetail[0].ethnicOriginId,
      professionId: userInfo?.profileDetail[0].professionId,
      educationLevel: userInfo?.profileDetail[0].educationLevel,
      jobTitle: userInfo?.profileDetail[0].jobTitle,
      employerName: userInfo?.profileDetail[0].employerName,
      partnerCast: userCastP,
      partnerSiblings: userSiblingP,
      partnerCity: userCityP,
      partnerDemand: userDemandP,
      partnerProfession: userProfessionP,
      cast: userInfo?.profileDetail[0].cast,
      profile: {
        id: userInfo?.id,
        gender: gender,
        email: userInfo?.email,
        dob: `${userdob}`,
        nickName: userName,
        mainPhoto: value?.name,
        selfiePhoto: "string",
        isBlurOn: userInfo?.isBlurOn,
        isVerified: userInfo?.isVerified,
        isPhoneVerified: userInfo?.isPhoneVerified,
        isLockEnabled: userInfo?.isLockEnabled,
        isChaperoneEnabled: userInfo?.isChaperoneEnabled,
        password: userInfo?.password,
        isFacebook: userInfo?.isFacebook,
        isGoogle: userInfo?.isGoogle,
        facebookProfileId: userInfo?.facebookProfileId,
        googleProfileId: userInfo?.googleProfileId,
        emailVerified: userInfo?.emailVerified,
        expoToken: "string",
        city: userCity,
        country: countryName,
        height: userInfo?.height,
        lat: userInfo?.lat,
        lng: userInfo?.lng,
        deviceType: "string",
        verifcationImage: "string",
        isInVerificationProcess: userInfo?.isInVerificationProcess,
        verificationStatus: userInfo?.verificationStatus,
        isBlocked: userInfo?.isBlocked,
        isSystemGenerated: userInfo?.isSystemGenerated,
        availableMessages: userInfo?.availableMessages,
        isUnderReview: userInfo?.isUnderReview,
        blockageMessage: userInfo?.blockageMessage,
        isApple: userInfo?.isApple,
        appleProfileId: userInfo?.appleProfileId,
        isDeactivated: userInfo?.isDeactivated,
        rejectionMessage: userInfo?.rejectionMessage,
        representedBy: userInfo?.representedBy,
        mainPhotoApproved: userInfo?.mainPhotoApproved,
        dateJoined: userInfo?.dateJoined,
        ethnicOrigin: userInfo?.ethnicOrigin,
      },
    };

    dispatch(updateProfile(userInfo.id, payload));
  };

  const FilterOnSubmit = () => {
    let payload = {
      limitData: locationRangValue,
      ageL: RangeValueL,
      ageR: RangeValueR,
      sectF: sectF,
      hideF: hideF,
      abroad: abroadF,
    };
    dispatch(saveFilterData(payload));
  };

  return (
    <div className="white_bg">
      <div className="container">
        <Header colorLogo={colorLogo} />
      </div>

      <div className="user_profile">
        <div className="cover">
          <img src={cover} alt="" className="img-fluid" />
        </div>

        <div className="container">
          <div className="profile_img">
            <div className="img">
              <img src={imageUrl + userInfo?.mainPhoto || profile} alt="" />
            </div>
            <div className="profile_desc">
              <h2>
                {userInfo?.nickName}{" "}
                {userInfo?.mainPhotoApproved && <img src={verified} alt="" />}
              </h2>
              <ul className="list-unstyled">
                <li>
                  <span>{userInfo?.city}</span>{" "}
                  {words.countries[userInfo?.country]}
                </li>
                <li>
                  <span>{userInfo?.age}</span> Years
                </li>
              </ul>
            </div>

            <div className="edit_profile">
              <button
                className="btn"
                onClick={() => {
                  setActive(2);
                  // navigate(`/personalInfo/${userInfo.id}`);
                }}
              >
                <img src={edit} alt="" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="left_link">
              <ul className="list-unstyled">
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setActive(0);
                    }}
                  >
                    <img src={imageUrl + userInfo?.mainPhoto} alt="" />
                    <p>
                      {completed() < 100 ? "Complete Profile" : "My Profile"}

                      <small>{`${completed()}% completed`}</small>
                    </p>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setActive(1);
                    }}
                  >
                    <img src={filter} alt="" />
                    <p>
                      Filter & Perferences{" "}
                      <small>Set Location, Age, Sect and Ethnicity</small>
                    </p>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className={check ? "active" : ""}
                    onClick={() => {
                      setActive(2);
                    }}
                  >
                    <img src={setting} alt="" />
                    <p>
                      Settings <small>Manage account and chaperone</small>
                    </p>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setActive(3);
                    }}
                  >
                    <img src={report} alt="" />
                    <p>
                      Report a Problem{" "}
                      <small>Get help with technical & Billing issue</small>
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>DeActivate Account</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Are you sure you want to Deactivate your account ?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                No
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  DeActivateAccount(userInfo?.id).then((response) => {
                    if (response == "ok") {
                      navigate("/login");
                      handleClose();
                      console.log("User Deactivated");
                    } else {
                      console.log(response);
                    }
                  });
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

          {isActive === 0 && (
            <div className="col-md-8">
              <div className="user_right_area">
                <h2>Photos Gallery</h2>
                <div className="gallery">
                  <div className="row">
                    <div className="col-md-3 col-6">
                      <a
                        target={"_blank"}
                        className="example-image-link"
                        href={imageUrl + userInfo?.profilePhotos[0]?.image1}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={imageUrl + userInfo?.profilePhotos[0]?.image1}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        target={"_blank"}
                        className="example-image-link"
                        href={imageUrl + userInfo?.profilePhotos[0]?.image2}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={imageUrl + userInfo?.profilePhotos[0]?.image2}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        target={"_blank"}
                        className="example-image-link"
                        href={imageUrl + userInfo?.profilePhotos[0]?.image3}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={imageUrl + userInfo?.profilePhotos[0]?.image3}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        target={"_blank"}
                        className="example-image-link"
                        href={imageUrl + userInfo?.profilePhotos[0]?.image4}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={imageUrl + userInfo?.profilePhotos[0]?.image4}
                          alt=""
                        />
                      </a>
                    </div>

                    <div className="col-md-3 col-6">
                      <a
                        target={"_blank"}
                        className="example-image-link"
                        href={imageUrl + userInfo?.profilePhotos[0]?.image5}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={imageUrl + userInfo?.profilePhotos[0]?.image5}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        target={"_blank"}
                        className="example-image-link"
                        href={imageUrl + userInfo?.profilePhotos[0]?.image6}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={imageUrl + userInfo?.profilePhotos[0]?.image6}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>

                  <div className="image_upload">
                    <label>
                      {" "}
                      <img src={upload} alt="" />
                      <span>You can upload upto 15 pictures</span>
                      <input type="file" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isActive === 1 && (
            <div className="col-md-8">
              <div className="user_right_area">
                <h2>Filter & Perferences</h2>
                <div className="filter">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="inner_filter">
                        <label>
                          <img src={locationIcon} alt="" /> Limit Location By
                        </label>
                        <div className="range-slider single">
                          <input
                            // value="18"
                            min="18"
                            max="60"
                            step="1"
                            type="range"
                          />
                          <input
                            // value="0"
                            min="0"
                            max="1000"
                            step="20"
                            type="range"
                            onChange={(e) =>
                              setLocationRangValue(e.target.value)
                            }
                          />
                          <span className="value">
                            <input type="number" value="0" min="18" max="60" />
                            <input
                              type="number"
                              value={locationRangValue}
                              min="0"
                              max="1000"
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="inner_filter">
                        <label>
                          <img src={age} alt="" /> Age
                        </label>
                        <div className="age-slider">
                          <input
                            value={RangeValueR}
                            min="18"
                            max="60"
                            step="1"
                            type="range"
                            onChange={(e) => setRangeValueR(e.target.value)}
                            defaultValue={RangeValueR}
                          />
                          <input
                            value={RangeValueL}
                            min="18"
                            max="60"
                            step="1"
                            type="range"
                            onChange={(e) => setRangeValueL(e.target.value)}
                            defaultValue={RangeValueL}
                          />
                          <span className="value">
                            <input
                              type="number"
                              value={RangeValueL}
                              min="18"
                              max="60"
                              defaultValue={RangeValueL}
                            />
                            <input
                              type="number"
                              value={RangeValueR}
                              min="18"
                              max="60"
                              defaultValue={RangeValueR}
                            />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="inner_filter">
                        <label>
                          <img src={sect} alt="" /> Sect
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => setSectF(e.target.value)}
                          defaultValue={filterData?.sectF}
                        >
                          <option value={"Sunni"}>Sunni</option>
                          <option value={"Shia"}>Shia</option>
                          <option value={"Other"}>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="inner_filter">
                        <label>
                          <img src={blur} alt="" /> Hide Blurred Photos
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="blur"
                          id="blur"
                          style={{ marginLeft: 1 }}
                          onChange={(e) => setHideF(e.target.checked)}
                          value={hideF}
                        />
                        <span style={{ marginLeft: 45 }}>
                          Apply Blur Effect On Your Photos
                        </span>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="inner_filter">
                        <label>
                          <img src={abrod} alt="" /> if Abroad
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="abroad"
                          id="abroad"
                          style={{ marginLeft: 0.2 }}
                          onChange={(e) => setAbroadF(e.target.checked)}
                          value={abroadF}
                        />
                        <span style={{ marginLeft: 40 }}>
                          Willing to relocate
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="btn" onClick={() => FilterOnSubmit()}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {isActive === 2 && (
            <div className="col-md-8">
              <div className="user_right_area">
                <h2>Settings</h2>

                <div className="filter more_filter">
                  <h3>Personal Info</h3>

                  <div className="changes_profile_img">
                    <label>Change Profile Images</label>
                    <div className="image_upload">
                      <label>
                        <img src={imageUrl + userInfo?.mainPhoto} alt="" />
                        <span>
                          <FaEdit size={20} style={{ marginTop: -20 }} />
                        </span>
                        <input
                          id="file-upload-profile"
                          type="file"
                          style={{ display: "none" }}
                          name="certificate"
                          onChange={FileInputChange}
                          accept=".jpg, .jpeg, .png"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Profile Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={userInfo?.nickName}
                        defaultValue={userInfo?.nickName}
                        onChange={(e) => {
                          setName(e?.target?.value);
                        }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="">Gender*</label>
                      <select
                        className="form-control"
                        defaultValue={userInfo?.gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      >
                        <option>Select Gender</option>
                        <option value="Female"> Female</option>
                        <option value="Male">Male</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label>Date of birth*</label>

                      <input
                        type="text"
                        onFocus={_onFocus}
                        onBlur={_onBlur}
                        className="form-control"
                        placeholder="DOB"
                        defaultValue={moment(userInfo?.dob).format(
                          "DD/MM/YYYY"
                        )}
                        onChange={(e) => {
                          setDob(e.target.value);
                        }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Country*</label>
                      <select
                        className="form-control"
                        onChange={(e) => setCountryName(e.target.value)}
                      >
                        <option value={userInfo?.country}>
                          {words.countries[userInfo?.country]}
                        </option>
                        {words.allCountriesList.map((i) => {
                          return <option value={i.name}>{i.name}</option>;
                        })}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label>City*</label>
                      <select
                        className="form-control"
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value={userInfo?.city}>{userInfo?.city}</option>
                        {Object.entries(words.cityList)?.map((i) => {
                          if (i[0] === countryName) {
                            return i[1]?.map((i) => (
                              <option value={i}>{i}</option>
                            ));
                          }
                        })}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label>Height</label>

                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Height"
                        defaultValue={userInfo?.height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>

                    <div className="col-md-12">
                      <label>Status Message</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Message"
                        defaultValue={userInfo?.profileDetail[0]?.statusMessage}
                        onChange={(e) => setStatusM(e.target.value)}
                      />
                    </div>
                  </div>

                  <h3>Life style</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="">What sect are you?</label>
                      <select
                        className="form-control"
                        onChange={(e) => setSect(e.target.value)}
                        defaultValue={userInfo?.profileDetail[0]?.sect}
                      >
                        <option
                          value={userInfo?.profileDetail[0]?.sect}
                          selected
                        >
                          {userInfo?.profileDetail[0]?.sect
                            ? userInfo?.profileDetail[0]?.sect
                            : "Select Sect"}
                        </option>
                        <option value="Sunni">Sunni</option>
                        <option value="Shia">Shia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="">Praying?</label>
                      <select
                        className="form-control"
                        onChange={(e) => setPraying(e.target.value)}
                      >
                        <option
                          value={userInfo?.profileDetail[0]?.prayingInfo}
                          selected
                        >
                          {userInfo?.profileDetail[0]?.prayingInfo
                            ? userInfo?.profileDetail[0]?.prayingInfo
                            : "Select Praying"}
                        </option>
                        <option value="Always Praying">Always Praying</option>
                        <option value={"Usualy Pray"}>Usualy Pray</option>
                        <option value={"Sometime Pray"}>Sometime Pray</option>
                        <option value={"Never Pray"}>Never Pray</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="">Religiosity</label>
                      <select
                        className="form-control"
                        onChange={(e) => setReligiosity(e.target.value)}
                      >
                        <option
                          value={userInfo?.profileDetail[0]?.religiousityLevel}
                          selected
                        >
                          {userInfo?.profileDetail[0]?.religiousityLevel
                            ? userInfo?.profileDetail[0]?.religiousityLevel
                            : "Select Religiosity"}
                        </option>
                        <option value="Very practicing">Very practicing</option>
                        <option value={"Practicing"}>Practicing</option>
                        <option value={"Moderately practicing"}>
                          Moderately practicing
                        </option>
                        <option value={"Not practicing"}>Not practicing</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="">Do you smoke?</label>
                      <select
                        className="form-control"
                        onChange={(e) => setSmoke(e.target.value)}
                      >
                        <option
                          value="true"
                          selected={
                            userInfo?.profileDetail[0]?.doesSmoke === true
                              ? true
                              : false
                          }
                        >
                          Yes
                        </option>
                        <option
                          value={"false"}
                          selected={
                            userInfo?.profileDetail[0]?.doesSmoke !== true
                              ? true
                              : false
                          }
                        >
                          No
                        </option>
                      </select>
                    </div>
                  </div>

                  <h3>What are you looking in your partners?</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Which cast should your partner belong to?</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Cast"
                        defaultValue={userInfo?.profileDetail[0]?.partnerCast}
                        onChange={(e) => setCastP(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Which city should your partner belong to?</label>

                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter PartnerCity"
                        defaultValue={userInfo?.profileDetail[0]?.partnerCity}
                        onChange={(e) => setCityP(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Any demands?</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Demands"
                        defaultValue={userInfo?.profileDetail[0]?.partnerDemand}
                        onChange={(e) => setDemandP(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>What profession should your partner have?</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Profession"
                        defaultValue={
                          userInfo?.profileDetail[0]?.partnerProfession
                        }
                        onChange={(e) => setProfessionP(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>How many sibling should your partner have?</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Partner Sibling"
                        defaultValue={
                          userInfo?.profileDetail[0]?.partnerSiblings
                        }
                        onChange={(e) => setSiblingP(e.target.value)}
                      />
                    </div>
                  </div>

                  <button className="btn" onClick={() => onSubmit()}>
                    Apply
                  </button>
                </div>

                <div className="filter setting">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="email_div">
                        <img src={email} alt="" />
                        <input
                          type="email"
                          className="form-control"
                          placeholder="wiqar.h.bangash@gmail.com"
                          defaultValue={userInfo?.email}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="setting_links">
                        <a href="#">
                          <img src={imageUrl + userInfo?.mainPhoto} alt="" />
                          <span>Complete Profile</span>
                        </a>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="setting_links">
                        <a href="#">
                          <ImFacebook size={20} style={{ marginRight: 10 }} />
                          <span>Connect with Facebook</span>
                        </a>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="setting_links">
                        <a href="#" onClick={() => dispatch(logout(navigate))}>
                          <FaPowerOff size={20} style={{ marginRight: 10 }} />
                          <span>Logout</span>
                        </a>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="setting_links">
                        <a href="#" onClick={() => handleShow()}>
                          <FaUserTimes size={20} style={{ marginRight: 10 }} />
                          <span>Deactivate Acccount</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* <button className="btn" onClick={() => onSubmit()}>
                    Apply
                  </button> */}
                </div>
              </div>
            </div>
          )}

          {isActive === 4 && (
            <div className="col-md-8">
              <div className="user_right_area">
                <h2>Photos Gallery</h2>
                <div className="gallery">
                  <div className="row">
                    <div className="col-md-3 col-6">
                      <a
                        className="example-image-link"
                        href={img1}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={img1}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        className="example-image-link"
                        href={img2}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={img2}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        className="example-image-link"
                        href={img3}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={img3}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        className="example-image-link"
                        href={img4}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={img4}
                          alt=""
                        />
                      </a>
                    </div>

                    <div className="col-md-3 col-6">
                      <a
                        className="example-image-link"
                        href={img1}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={img1}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        className="example-image-link"
                        href={img2}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={img2}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        className="example-image-link"
                        href={img3}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={img3}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-3 col-6">
                      <a
                        className="example-image-link"
                        href={img4}
                        data-lightbox="example-set"
                      >
                        <img
                          className="example-image img-fluid"
                          src={img4}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>

                  <div className="image_upload">
                    <label>
                      {" "}
                      <img src={upload} alt="" />
                      <span>You can upload upto 15 pictures</span>
                      <input type="file" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
