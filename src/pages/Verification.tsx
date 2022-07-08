import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { boolCheck, getVerificationCode } from "../store/actions/LoginActions";
import css from "../styles/loginStyles.module.css";
import Header from "../components/headers/Header";
import Footer from "../components/footer/Footer";
import "../Get Nikah/css/bootstrap.min.css";
import "../Get Nikah/css/swiper.css";
import "../Get Nikah/css/style.css";
import { BOOL } from "../store/constants/LoginConstants";

const Verification = () => {
  // getting email from params
  const { email }: any = useParams();
  // navigate in the website
  const navigate = useNavigate();
  // dispatch redux actions
  const dispatch = useDispatch();
  // set error
  const [error, seterror] = useState("");
  // set code
  const [code, setcode] = useState("");
  // set verificationCode
  const [verificationCode, setverificationCode] = useState<any>();
  // call the get verification code API
  useEffect(() => {
    if (email) {
      dispatch(getVerificationCode(email, seterror, setverificationCode));
    }
  }, [email]);

  // verify account
  const handleVerifyAccount = () => {
    if (code == verificationCode?.code) {
      dispatch(boolCheck(true));
      navigate("/myprofile");
    } else {
      seterror("Incorrect code!");
    }
  };
  // resend verification code
  const handleResendCode = async () => {
    seterror("");
    setverificationCode("");
    dispatch(getVerificationCode(email, seterror, setverificationCode));
  };

  // enter only number
  const handleEnterOnlyNumber = (e: any) => {
    let num = e.target.value;
    if (num) {
      if (num[num?.length - 1] >= "0" && num[num?.length - 1] <= "9") {
        setcode(e.target.value);
      }
    } else {
      setcode("");
    }
  };

  return (
    <div className="signup_page window_heaight">
      <div className="container">
        <Header />
        <div className="row align-items-center">
          <div className="login">
            <div className="col-md-6 "></div>
            <div className="col-md-6 offset-md-6">
              <div className={css?.emptyArea}></div>
              <div className={css?.mainHeading}>Verify your account</div>
              <div className={css?.supportText}>
                A verification code has been send to {email}
              </div>
              <input
                placeholder="Enter code"
                value={code}
                className="form-control"
                name="code"
                onChange={handleEnterOnlyNumber}
                style={{
                  backgroundColor: "rgba(255 255 255 / 37%)",
                  color: "#fff",
                }}
              ></input>
              {/* {
                error && <p style={{ color: 'red' }}>{error}</p>
            } */}
              {/* <button onClick={handleResendCode}>Resend Code</button> */}
              <button onClick={handleVerifyAccount} className="btn">
                Verify Code
              </button>
              <div
                className={css?.supportText}
                onClick={() => navigate("/signup")}
                style={{ paddingLeft: 15, fontSize: 20, cursor: "pointer" }}
              >
                Back
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Verification;
