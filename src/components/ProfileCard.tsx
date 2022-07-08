import React from 'react';
import css from '../styles/groupScreen.module.css'

const ProfileCard = ({ data }: any) => {
    return <div className={css?.profileCard}>
        <img src={data?.imageUrl} className={css?.profileImage} />
        <h2 className={css?.profileCardName}>{data?.name}</h2>
        <p className={css?.profileCardAge}>{data?.age}</p>
        <p className={css?.profileCardLocation}>{data?.location}</p>

    </div>;
};

export default ProfileCard;
