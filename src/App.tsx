import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllGroups from "./pages/AllGroups";
import GroupScreen from "./pages/GroupScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FirstScreen from "./pages/FirstScreen";
import Verification from "./pages/Verification";
import PersonalInfo from "./pages/PersonalInfo";
import Sect from "./pages/Sect";
import PartnerInfo from "./pages/PartnerInfo";
import HomePage from "./pages/homePage";
import { useDispatch } from "react-redux";
import { updateGroup } from "./store/actions/groupActions";
import Explore from "./pages/Explore";
import Setting from "./pages/Settings";
import Report from "./pages/ReportPage";
import ProfileImages from "./pages/ProfileImages";
import Home from "./pages";
import MyProfile from "./pages/MyProfile";
import { getAccessToken, onMessageListener } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import SignUp from "./pages/SignUp";
import Chats from "./pages/Chats"
import SingleChat from './pages/singleChat'
function App() {
  // dispatch actions
  const dispatch = useDispatch();
  // set nitification text
  // check if firebase token is present
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  getAccessToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      console.log("NotiPayload", payload);
      setShow(true);
      toast.info(
        `${payload?.notification.title}, ${payload?.notification.body}`,
        {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      // setNotification({
      //   title: payload?.notification?.title,
      //   body: payload?.notification?.body,
      // });
      // console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div>
      <BrowserRouter>
        {/* {show &&
          toast.info(`${notification.title}, ${notification.body}`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })} */}
        <Routes>
          <Route path="/" caseSensitive={false} element={<Home />} />
          <Route path="/login" caseSensitive={false} element={<Login />} />
          <Route
            path="/register"
            caseSensitive={false}
            element={<Register />}
          />

          <Route
            path="/chats"
            caseSensitive={false}
            element={<Chats />}
          />
          <Route
            path="/chat/:user1Id/:user2Id/:chatId"
            caseSensitive={false}
            element={<SingleChat />}
          />

          <Route
            path="/verification/:email"
            caseSensitive={false}
            element={<Verification />}
          />

          <Route
            path="/FirstScreen"
            caseSensitive={false}
            element={<FirstScreen />}
          />
          <Route path="/groups" caseSensitive={false} element={<AllGroups />} />
          <Route
            path="/groups/:id"
            caseSensitive={false}
            element={<GroupScreen />}
          />
          <Route
            path="/personalInfo/:id"
            caseSensitive={false}
            element={<PersonalInfo />}
          />

          <Route
            path="/myprofile"
            caseSensitive={false}
            element={<MyProfile />}
          />

          <Route
            path="/findpartner"
            caseSensitive={false}
            element={<HomePage />}
          />
          <Route
            path="/sectInfo/:id"
            caseSensitive={false}
            element={<Sect />}
          />
          <Route
            path="/partnerInfo/:id"
            caseSensitive={false}
            element={<PartnerInfo />}
          />

          <Route path="/setting" caseSensitive={false} element={<Setting />} />

          <Route
            path="/uploadprofileimages/"
            caseSensitive={false}
            element={<ProfileImages />}
          />

          <Route path="/signup/" caseSensitive={false} element={<SignUp />} />

          <Route path="/report/" caseSensitive={false} element={<Report />} />

          <Route path="/explore" caseSensitive={false} element={<Explore />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
