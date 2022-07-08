import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/LoginActions";
import { useNavigate } from "react-router";
// import css from "../styles/loginStyles.module.css";
import "../htmlDeigne/css/bootstrap.min.css";
// import "../htmlDeigne/css/all.min.css";
import "../htmlDeigne/css/swiper.css";
import "../htmlDeigne/css/style.css";
import Footer from "../components/footer/Footer";
import Header from "../components/headers/Header";

const Login = () => {
  // dispatch redux actions
  const dispatch = useDispatch();
  // navigate in website
  const navigate = useNavigate();

  //email
  const [email, setemail] = useState<string>("");
  //password
  const [password, setpassword] = useState<string>("");
  // error
  const [Error, setError] = useState("");
  // setSomethingIsMissing
  const [SomethingIsMissing, setSomethingIsMissing] = useState(false);

  const handleLogin = () => {
    console.log("zeedev16@gmail.com", "error");
    if (email && password) {
      dispatch(login(email, password, setError, navigate));
    } else {
      setSomethingIsMissing(true);
    }
  };

  return (
    <div className="login_page window_heaight">
      <div className="container">
        <Header />

        <div className="login">
          <div className="row">
            <div className="col-md-4 offset-md-8">
              <div className="login">
                <h2>
                  Welcome Back <small>Login into your account</small>
                </h2>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => setemail(e?.target?.value)}
                  style={{
                    backgroundColor: "rgba(255 255 255 / 37%)",
                    color: "#fff",
                  }}
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setpassword(e?.target?.value)}
                  style={{
                    backgroundColor: "rgba(255 255 255 / 37%)",
                    color: "#fff",
                  }}
                />
                <input
                  type="submit"
                  className="btn"
                  value="LOGIN"
                  onClick={handleLogin}
                />
                <button className="btn">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    signup
                  </span>
                </button>
                <p>
                  <a href="#">Forgot Password ?</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
