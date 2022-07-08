import React from "react";
import GroupCard from "../components/GroupCard";
import css from "../styles/allGroups.module.css";
import groups from "../data/groupsData";

const GroupScreen = () => {
  return (
    <div>
      <h1 className={css?.allGroupsHeading}>Groups</h1>
      <h4 className={css?.allGroupsHelpingText}>Groups helping text</h4>
      <div className={css?.allGroupsDiv}>
        {groups &&
          Array.isArray(groups) &&
          groups?.length > 0 &&
          groups?.map((group: any, index: any) => (
            <GroupCard data={group} index={index} />
          ))}
      </div>
    </div>
  );
};

export default GroupScreen;
