import React, { useState } from "react";
import { useParams } from "react-router";
import ProfileCard from "../components/ProfileCard";
import groups from "../data/groupsData";
import css from "../styles/groupScreen.module.css";

const GroupScreen = () => {
  // param
  const { id }: any = useParams();
  // profiles state
  // const [profiles, setprofiles] = useState([1, 2, 3]);

  return (
    <div>
      <h1 className={css?.gsHeading}>{groups[id ? id : 0]?.name}</h1>
      <div className={css?.gsCardsContent}>
        {groups &&
          Array.isArray(groups) &&
          groups?.length > 0 &&
          groups[id]?.profiles?.map((profile: any) => (
            <ProfileCard data={profile} />
          ))}
      </div>
    </div>
  );
};

export default GroupScreen;
