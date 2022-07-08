import React, { useState, useEffect } from "react";
import css from "../styles/loginStyles.module.css";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import {
  getProfile,
  getCountries,
  updateProfile,
} from "../store/actions/ProfileActions";
import Header from "./../components/headers/Header";
const ProfileDetailsPage = () => {
  const [profileDetails, setprofileDetails] = useState<any>();
  const [fullprofile, setfullprofile] = useState<any>();
  const [countries, setcountries] = useState<any>();
  const [crucialDetails, setcrucialDetails] = useState<any>({
    nickName: "",
    city: "",
    country: "",
    statusMessage: "",
    about: "",
    educationLevel: "",
    maritalStatus: "",
    canRelocate: false,
    marriagePlan: "",
    employerName: "",
    jobTitle: "",
    cast: "",
  });
  // getting id from params
  const { id }: any = useParams();
  // dispatch redux actions
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      getProfile(id, setfullprofile, setprofileDetails, setcrucialDetails)
    );
    dispatch(getCountries(setcountries));
  }, []);

  const handleUpdateProfile = () => {
    // dispatch(updateProfile(id, profileDetails, navigate));
  };

  const handleChangeCountry = (e: any) => {
    let cId = e?.target?.value;
    let country = countries?.filter(
      (theCountry: any) => theCountry?.id == cId
    )[0];
    setcrucialDetails({ ...crucialDetails, country: country?.name });
  };

  useEffect(() => {
    console.log("full profile info", fullprofile);
    console.log("personal info", profileDetails);
  }, [profileDetails]);

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

        <div className={css?.ProfilePageContent}>
          <div className={css?.mainHeading}>profileDetails</div>
          <div className={css?.supportText}>Complete your profile</div>
          <div className={css?.inputDiv}>
            <label className={css?.inputLabel}>Name</label>
            <input
              placeholder="Name"
              name="name"
              value={crucialDetails?.nickName}
              className={css?.roundTransparentInput}
              onChange={(e) =>
                setcrucialDetails({
                  ...crucialDetails,
                  nickName: e?.target?.value,
                })
              }
            />
          </div>
          <div className={css?.inputDiv}>
            <label className={css?.inputLabel}>City</label>
            <input
              placeholder="Enter your city"
              name="city"
              value={crucialDetails?.city}
              className={css?.roundTransparentInput}
              onChange={(e) =>
                setcrucialDetails({ ...crucialDetails, city: e?.target?.value })
              }
            />
          </div>
          {/* countries */}
          <div className={css?.inputDiv}>
            <label className={css?.inputLabel}>Country</label>
            <select
              placeholder="gender"
              name="gender"
              className={css?.fpSelect}
              onChange={handleChangeCountry}
            >
              <option value="">Select your country</option>
              {countries &&
                Array.isArray(countries) &&
                countries?.length > 0 &&
                countries?.map((singleCountry) => (
                  <option value={singleCountry?.id}>
                    {singleCountry?.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={css?.inputDiv}>
            <label className={css?.inputLabel}>Status</label>
            <input
              placeholder="Status Message"
              name="status"
              value={profileDetails?.statusMessage}
              className={css?.roundTransparentInput}
              onChange={(e) =>
                setprofileDetails({
                  ...profileDetails,
                  statusMessage: e?.target?.value,
                })
              }
            />
          </div>
          <div className={css?.inputDiv}>
            <label className={css?.inputLabel}>About</label>
            <textarea
              placeholder="About you"
              name="about"
              value={profileDetails?.about}
              className={css?.roundTransparenttextArea}
              onChange={(e) =>
                setprofileDetails({
                  ...profileDetails,
                  about: e?.target?.value,
                })
              }
            />
          </div>
          <div className={css?.educationRadios}>
            <div className={css?.radioHeading}>Education:</div>
            <div className={css?.radioLabelDiv}>
              <input
                name="education"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    educationLevel: e.target.value,
                  })
                }
                type="radio"
                value="Bachelor"
              />
              <label className={css?.radioLabel}>Bachelor's Degree</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="education"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    educationLevel: e.target.value,
                  })
                }
                type="radio"
                value="Master"
              />
              <label className={css?.radioLabel}>Master's Degree</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="education"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    educationLevel: e.target.value,
                  })
                }
                type="radio"
                value="Non-Degree"
              />
              <label className={css?.radioLabel}>Non Degree Program</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="education"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    educationLevel: e.target.value,
                  })
                }
                type="radio"
                value="Secondary"
              />
              <label className={css?.radioLabel}>
                Secondary School Diploma
              </label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="education"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    educationLevel: e.target.value,
                  })
                }
                type="radio"
                value="College"
              />
              <label className={css?.radioLabel}>College Diploma</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="education"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    educationLevel: e.target.value,
                  })
                }
                type="radio"
                value="Others"
              />
              <label className={css?.radioLabel}>Others</label>
            </div>
          </div>
          <div className={css?.inputDiv}>
            <label className={css?.inputLabel}>Job title</label>
            <input
              placeholder="Job Title"
              name="job"
              value={profileDetails?.jobTitle}
              className={css?.roundTransparentInput}
              onChange={(e) =>
                setprofileDetails({
                  ...profileDetails,
                  jobTitle: e?.target?.value,
                })
              }
            />
          </div>
          <div className={css?.inputDiv}>
            <label className={css?.inputLabel}>Employer</label>
            <input
              placeholder="Employer"
              name="employer"
              value={profileDetails?.employerName}
              className={css?.roundTransparentInput}
              onChange={(e) =>
                setprofileDetails({
                  ...profileDetails,
                  employerName: e?.target?.value,
                })
              }
            />
          </div>
          <div className={css?.educationRadios}>
            <div className={css?.radioHeading}>Marital Status:</div>
            <div className={css?.radioLabelDiv}>
              <input
                name="maritalStatus"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    maritalStatus: e.target.value,
                  })
                }
                type="radio"
                value="NeverMarried"
              />
              <label className={css?.radioLabel}>Never Married</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="maritalStatus"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    maritalStatus: e.target.value,
                  })
                }
                type="radio"
                value="Divorced"
              />
              <label className={css?.radioLabel}>Divorced</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="maritalStatus"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    maritalStatus: e.target.value,
                  })
                }
                type="radio"
                value="Separated"
              />
              <label className={css?.radioLabel}>Separated</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="maritalStatus"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    maritalStatus: e.target.value,
                  })
                }
                type="radio"
                value="Annulled"
              />
              <label className={css?.radioLabel}>Annulled</label>
            </div>
          </div>
          <div className={css?.educationRadios}>
            <div className={css?.radioHeading}>Marriage Plan:</div>
            <div className={css?.radioLabelDiv}>
              <input
                name="marriagePlan"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    marriagePlan: e.target.value,
                  })
                }
                type="radio"
                value="asSoonAsPossible"
              />
              <label className={css?.radioLabel}>As soon as possible</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="marriagePlan"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    marriagePlan: e.target.value,
                  })
                }
                type="radio"
                value="1_2"
              />
              <label className={css?.radioLabel}>1-2 years</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="marriagePlan"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    marriagePlan: e.target.value,
                  })
                }
                type="radio"
                value="3_4"
              />
              <label className={css?.radioLabel}>3-4 years</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="marriagePlan"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    marriagePlan: e.target.value,
                  })
                }
                type="radio"
                value="4+"
              />
              <label className={css?.radioLabel}>4+ years</label>
            </div>
          </div>
          <div className={css?.inputDiv}>
            <label className={css?.inputLabel}>Cast</label>
            <input
              placeholder="cast"
              name="cast"
              value={profileDetails?.cast}
              className={css?.roundTransparentInput}
              onChange={(e) =>
                setprofileDetails({ ...profileDetails, cast: e?.target?.value })
              }
            />
          </div>
          <div className={css?.educationRadios}>
            <div className={css?.radioHeading}>Relocation:</div>
            <div className={css?.radioLabelDiv}>
              <input
                name="canRelocate"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    canRelocate: e.target.value,
                  })
                }
                type="radio"
                value="true"
              />
              <label className={css?.radioLabel}>Yes</label>
            </div>
            <div className={css?.radioLabelDiv}>
              <input
                name="canRelocate"
                className={css?.radioButton}
                onChange={(e) =>
                  setprofileDetails({
                    ...profileDetails,
                    canRelocate: e.target.value,
                  })
                }
                type="radio"
                value="false"
              />
              <label className={css?.radioLabel}>No</label>
            </div>
          </div>
          <button
            style={{ margin: "10px auto" }}
            onClick={handleUpdateProfile}
            className={css?.loginButton}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsPage;
