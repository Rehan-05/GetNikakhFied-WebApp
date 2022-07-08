import { UserTypes } from "../../models/ProfileModel";
import { mediaExt } from "../constants/words";

const DeveloperMode = false;
const today = new Date();
const eighteenYearAgo = today.setFullYear(today.getFullYear() - 18);

// #region Profile Completeness Checker
const completedData = (data: UserTypes): number => {
  //console.log("Data", data);
  let t: number = 0;
  canItBeCount(data.mainPhoto) && (t = t + 1); //1
  canItBeCount(data.nickName) && (t = t + 1); //2
  canItBeCount(data.age) && (t = t + 1); //3
  canItBeCount(data.city) && (t = t + 1); //4
  canItBeCount(data.country) && (t = t + 1); //5
  canItBeCount(data.dob) && (t = t + 1); //6
  canItBeCount(data.gender) && (t = t + 1); //7
  canItBeCount(data.height) && (t = t + 1); //8
  canItBeCount(data.profileDetail[0].jobTitle) && (t = t + 1); //9
  canItBeCount(data.profileDetail[0].maritalStatus) && (t = t + 1); //10
  canItBeCount(data.profileDetail[0].marriagePlan) && (t = t + 1); //11
  canItBeCount(data.profileDetail[0].onlyHalal) && (t = t + 1); //12
  canItBeCount(data.profileDetail[0].partnerCast) && (t = t + 1); //13
  canItBeCount(data.profileDetail[0].partnerCity) && (t = t + 1); //14
  canItBeCount(data.profileDetail[0].partnerDemand) && (t = t + 1); //15
  canItBeCount(data.profileDetail[0].partnerProfession) && (t = t + 1); //16
  canItBeCount(data.profileDetail[0].partnerSiblings) && (t = t + 1); //17
  canItBeCount(data.profileDetail[0].prayingInfo) && (t = t + 1); //18
  canItBeCount(data.profileDetail[0].religiousityLevel) && (t = t + 1); //19
  canItBeCount(data.profileDetail[0].sect) && (t = t + 1); //20
  canItBeCount(data.profileDetail[0].statusMessage) && (t = t + 1); //21
  canItBeCount(data.profileDetail[0].doesSmoke) && (t = t + 1); //22
  canItBeCount(data.profileDetail[0].employerName) && (t = t + 1); //23
  canItBeCount(data.profileDetail[0].educationLevel) && (t = t + 1); //24
  canItBeCount(data.profileDetail[0].doesAlcohol) && (t = t + 1); //25
  //canItBeCount(data.profileDetail[0].location) && (t = t + 1); //26
  //canItBeCount(data.EmailVerified) && (t = t + 1); //27
  return (t / 25) * 100;
};
//#endregion

const canItBeCount = (Xd: any) => {
  const res = Xd !== "" && Xd !== null && Xd !== undefined;
  //console.log(Xd, res);
  return res;
};

export { completedData };
