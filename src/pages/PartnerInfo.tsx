import React, { useState, useEffect } from "react";
import css from "../styles/loginStyles.module.css";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  getProfile,
  getCountries,
  updateProfile,
} from "../store/actions/ProfileActions";
import Header from "../components/headers/Header";

const PartnerInfoPage = () => {
  const [personalInfo, setpersonalInfo] = useState<any>();
  const [countries, setcountries] = useState<any>();
  const [crucialDetails, setcrucialDetails] = useState<any>({
    gender: "",
    dob: "",
    nickName: "",
    isBlurOn: true,
    isFacebook: true,
    isGoogle: true,
    facebookProfileId: "",
    googleProfileId: "",
    city: "",
    country: "",
    height: "",
    lat: 0,
    lng: 0,
    availableMessages: 0,
    representedBy: "",
    ethnicOrigin: "",
  });
  // getting id from params
  const { id }: any = useParams();
  // dispatch redux actions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(getProfile(id, setpersonalInfo, setcrucialDetails))
    dispatch(getCountries(setcountries));
  }, []);

  const handleSkip = () => {
    navigate("/partnerInfo/" + id);
  };
  const handleUpdateProfile = () => {
    // dispatch(updateProfile(id, personalInfo, navigate));
  };

  const handleChangeCountry = (e: any) => {
    let cId = e?.target?.value;
    let country = countries?.filter(
      (theCountry: any) => theCountry?.id == cId
    )[0];
    setcrucialDetails({
      ...crucialDetails,
      country: country?.name,
      let: country?.latitude,
      lng: country?.longitude,
    });
  };

  useEffect(() => {
    console.log("personal info", personalInfo);
  }, [personalInfo]);

  return (
    <div className="container">
      <Header />
      <div className={css?.backgroundVideoDiv}>
        <video
          autoPlay
          loop
          muted
          src="/media/introduction.mp4"
          className={css?.videoPlayerClass}
        ></video>
        {/* <div className={css?.emptyArea}></div> */}
        <div className={css?.sectPageContent}>
          <div className={css?.mainHeading}>Life Style</div>
          <div className={css?.educationRadios}>
            <div className={css?.radioHeading}>What sect are you?</div>
            <div className={css?.radioLabelDiv}>
              <input
                name="sect"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({ ...personalInfo, sect: e.target.value })
                }
                type="radio"
                value="Sunni"
              />
              <label className={css?.radioLabel}>Sunni</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="sect"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({ ...personalInfo, sect: e.target.value })
                }
                type="radio"
                value="shia"
              />
              <label className={css?.radioLabel}>Shia</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="sect"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({ ...personalInfo, sect: e.target.value })
                }
                type="radio"
                value="others"
              />
              <label className={css?.radioLabel}>Others</label>
            </div>
          </div>
          <div className={css?.educationRadios}>
            <div className={css?.radioHeading}>How often do you pray?</div>
            <div className={css?.radioLabelDiv}>
              <input
                name="prayingInfo"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    prayingInfo: e.target.value,
                  })
                }
                type="radio"
                value="a_pray"
              />
              <label className={css?.radioLabel}>Always Pray</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="prayingInfo"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    prayingInfo: e.target.value,
                  })
                }
                type="radio"
                value="u_pray"
              />
              <label className={css?.radioLabel}>Usually Pray</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="prayingInfo"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    prayingInfo: e.target.value,
                  })
                }
                type="radio"
                value="s_pray"
              />
              <label className={css?.radioLabel}>Sometimes Pray</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="prayingInfo"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    prayingInfo: e.target.value,
                  })
                }
                type="radio"
                value="n_pray"
              />
              <label className={css?.radioLabel}>Never Pray</label>
            </div>
          </div>
          <div className={css?.educationRadios}>
            <div className={css?.radioHeading}>How often do you pray?</div>
            <div className={css?.radioLabelDiv}>
              <input
                name="religiousityLevel"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    religiousityLevel: e.target.value,
                  })
                }
                type="radio"
                value="v_practising"
              />
              <label className={css?.radioLabel}>Very Practising</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="religiousityLevel"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    religiousityLevel: e.target.value,
                  })
                }
                type="radio"
                value="practising"
              />
              <label className={css?.radioLabel}>Practising</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="religiousityLevel"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    religiousityLevel: e.target.value,
                  })
                }
                type="radio"
                value="m_practising"
              />
              <label className={css?.radioLabel}>Moderately Practising</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="religiousityLevel"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    religiousityLevel: e.target.value,
                  })
                }
                type="radio"
                value="n_practising"
              />
              <label className={css?.radioLabel}>Not Practising</label>
            </div>
          </div>
          <div className={css?.educationRadios}>
            <div className={css?.radioHeading}>Do you smoke?</div>
            <div className={css?.radioLabelDiv}>
              <input
                name="doesSmoke"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    doesSmoke: e.target.value,
                  })
                }
                type="radio"
                value="true"
              />
              <label className={css?.radioLabel}>Yes</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="doesSmoke"
                className={css?.radioButton}
                onChange={(e) =>
                  setpersonalInfo({
                    ...personalInfo,
                    doesSmoke: e.target.value,
                  })
                }
                type="radio"
                value="false"
              />
              <label className={css?.radioLabel}>No</label>
            </div>
          </div>
          <div className={css?.buttonsDiv}>
            <button
              style={{ margin: "10px auto" }}
              onClick={handleSkip}
              className={css?.loginButton}
            >
              Skip
            </button>
            <button
              style={{ margin: "10px auto" }}
              onClick={handleUpdateProfile}
              className={css?.loginButton}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerInfoPage;
