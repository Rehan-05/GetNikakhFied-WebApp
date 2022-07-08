import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/headers/Header';
import Footer from '../components/footer/Footer';
import colorLogo from "../htmlDeigne/images/logo_color.svg";
import { useSelector, useDispatch } from 'react-redux'
import { getChatList, getChat, postChat } from '../store/actions/chatActions';
import { profileImageUrl } from '../store/constants/baseUrl';
import css from '../styles/chatStyles.module.css';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router'
import { IChats, IChatMessage } from '../models/chatModel'

const Chats = () => {
    // navigate into project
    const navigate = useNavigate()
    // dispatch redux actions
    const dispatch = useDispatch()
    // active chat
    const [currentChat, setcurrentChat] = useState<IChatMessage>()
    // get user info
    const userInfo = useSelector((state: any) => state?.loginReducer?.userData);
    // get all chats
    const { chatInfo, chatLoading } = useSelector((state: any) => state?.chatReducer);

    // call all chats API
    useEffect(() => {
        if (userInfo && userInfo?.id) {
            dispatch(getChatList(userInfo?.id))
        }
    }, [userInfo])

    // set first chat to be the active chat
    useEffect(() => {
        if (!currentChat?.id) {
            if (chatInfo?.chatMessages?.length > 0) {
                let thecurrentchat = chatInfo?.chatMessages[0];
                dispatch(getChat(userInfo?.id, thecurrentchat?.secondUserId, thecurrentchat?.id, 1))
                setcurrentChat(thecurrentchat)
            }
        }
    }, [chatInfo])

    const handleOpenChat = (e: any, chatHead: any) => {
        navigate(`/chat/${userInfo?.id}/${chatHead?.secondUserId}/${chatHead?.id}`)
    }

    const returnImageUrl = (user: any) => {
        if (user?.mainPhoto) {
            return profileImageUrl + user?.mainPhoto
        }
        else {
            if (user?.gender == 'male') {
                return 'media/man.jpg'
            }
            else {
                return 'media/girl.jpg'
            }
        }
    }
    return (
        <div className="white_bg">
            <div className="container">
                <Header colorLogo={colorLogo} />
                <div className={css?.allChats}>
                    {
                        !chatLoading ?
                            chatInfo && chatInfo?.chatMessages && Array.isArray(chatInfo?.chatMessages) && chatInfo?.chatMessages?.length > 0 ? <>
                                <>
                                    {
                                        chatInfo?.chatMessages?.map((chatHead: any, index: number) =>
                                            <div onClick={(e) => handleOpenChat(e, chatHead)} className={css?.chatHeadMainDiv}>
                                                <div className={css?.chatHeadImageDiv}>
                                                    <img className={css?.chatHeadImageTag} src={returnImageUrl(chatHead?.secondUser)} />
                                                    {/* <img className={css?.chatHeadImageTag} src='https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg' /> */}
                                                </div>
                                                <div className={css?.chatHeadData}>
                                                    <div className={css?.chatHeadNameChat}>
                                                        <div className={css?.chatHeadName}>
                                                            {chatHead?.secondUser?.nickName}
                                                        </div>
                                                        <div className={css?.chatHeadLastMessage}>
                                                            {chatHead?.lastMessage?.substring(0, 30)}
                                                        </div>
                                                    </div>
                                                    <div className={css?.chatHeadInfo}>
                                                        <div className={css?.chatHeadTime}>
                                                            {chatHead?.timeSent}
                                                        </div>
                                                        <div className={css?.chatHeadUnread}>
                                                            {
                                                                chatHead?.noOfUnReadMessages != 0 &&
                                                                <p className={css?.chatHeadBubble}>
                                                                    {chatHead?.noOfUnReadMessages}</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                    }
                                </>

                            </> : <h1>No chats to display</h1>
                            : <div className={css?.chatLoadingCircle}> <CircularProgress /></div>}
                </div>
            </div><div style={{ position: 'absolute', bottom: '0', left: '0', width: '100vw' }}><Footer /></div></div>
    )
}

export default Chats