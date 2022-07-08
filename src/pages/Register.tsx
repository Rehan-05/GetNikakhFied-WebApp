import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signup } from "../store/actions/LoginActions";
import { useDispatch } from "react-redux";
import css from "../styles/loginStyles.module.css";

const Register = () => {
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
  //password
  const [password, setpassword] = useState<string>("");
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
    if (name && email && DOB && password && gender) {
      if (ValidateEmail(email)) {
        if (password.length > 5) {
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

  return (
    <div className={css?.backgroundVideoDiv}>
      <div className={css?.emptyArea2}></div>
      <div className={css?.loginPageContent}>
        {/* <div className={css?.emptyArea}></div> */}
        <div className={css?.mainHeading}>Register</div>
        <div className={css?.supportText}>Create account on nikahfied</div>

        <input
          placeholder="Name"
          name="name"
          className={css?.roundTransparentInput}
          onChange={(e) => setname(e.target.value)}
        ></input>
        {/* {
                somethingisMissing && !name && <p className={css?.fieldIsMissingWarning}>Please enter your name</p>
            } */}
        <select
          placeholder="gender"
          name="gender"
          className={css?.fpSelect}
          onChange={(e) => setgender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {/* {
                somethingisMissing && !gender && <p className={css?.fieldIsMissingWarning}>Please enter your gender</p>
            } */}
        <label className={css?.DOBLabel}>Date of Birth</label>
        <input
          placeholder="DOB"
          className={css?.fpSelect}
          name="DOB"
          value={DOB}
          max="2005-12-31"
          type="date"
          onChange={(e) => setDOB(e.target.value)}
        ></input>
        {/* {
                somethingisMissing && !DOB && <p className={css?.fieldIsMissingWarning}>Please enter your DOB</p>
            } */}
        <input
          placeholder="email"
          name="email"
          type="email"
          className={css?.roundTransparentInput}
          onChange={(e) => setemail(e.target.value)}
        ></input>
        {/* {
                somethingisMissing && !email && <p className={css?.fieldIsMissingWarning}>Please enter your email</p>
            }
            {
                invalidEmail && <p className={css?.fieldIsMissingWarning}>{invalidEmail}</p>
            } */}
        <input
          placeholder="Password"
          name="password"
          type="password"
          className={css?.roundTransparentInput}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        {/* {
                somethingisMissing && !password && <p className={css?.fieldIsMissingWarning}>Please enter your password</p>
            }
            {
                weakPassword && <p className={css?.fieldIsMissingWarning}>{weakPassword}</p>
            }
            {
                backendError && <p className={css?.fieldIsMissingWarning}>{backendError}</p>
            } */}
        <button onClick={handleSignup} className={css?.loginButton}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Register;
