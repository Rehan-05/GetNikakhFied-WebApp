import React from 'react';
import { useNavigate } from 'react-router'
import css from '../styles/allGroups.module.css'

const GroupCard = ({ data, index }: any) => {
    //for routing
    const navigate = useNavigate()
    return <div onClick={() => navigate(`/groups/${index}`)} className={css?.groupCardMainDiv}>{data?.name}</div>;
};

export default GroupCard;
