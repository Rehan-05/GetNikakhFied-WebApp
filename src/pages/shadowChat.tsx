import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/headers/Header';
import Footer from '../components/footer/Footer';
import colorLogo from "../htmlDeigne/images/logo_color.svg";
import { useSelector, useDispatch } from 'react-redux'
import { getChatList, getChat, postChat } from '../store/actions/chatActions';
import { profileImageUrl } from '../store/constants/baseUrl';
import css from '../styles/shadowchatStyles.module.css';
import { CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Chats = () => {
    // dispatch redux actions
    const dispatch = useDispatch()
    // active chat
    const [currentChat, setcurrentChat] = useState<any>()
    // get user info
    const userInfo = useSelector((state: any) => state?.loginReducer?.userData);
    // get all chats
    const { chatInfo, chatLoading } = useSelector((state: any) => state?.chatReducer);
    // get single chat
    const { singleChatInfo, singleChatLoading } = useSelector((state: any) => state?.singleChatReducer);
    // message
    const [messagetobesent, setmessagetobesent] = useState('')
    // ref used for scrolling
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    // function used to scroll to the bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    // recall the scroll to bottom function everytime a new message is sent
    useEffect(() => {
        scrollToBottom()
    }, [singleChatInfo]);

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
        setcurrentChat(chatHead)
        dispatch(getChat(userInfo?.id, chatHead?.secondUserId, chatHead?.id, 1))
        setcurrentChat(chatHead)
    }

    const handlePostMessage = () => {
        const messageObj = {
            text: messagetobesent,
            IsRead: false,
            IsDelivered: false,
            chatId: currentChat?.id,
            sentBy: userInfo?.id,
            recievedBy: currentChat?.secondUserId,
        }
        dispatch(postChat(messageObj))
        setmessagetobesent('');
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
            <div className="container" style={{ height: '100vh', alignItems: 'stretch' }}>
                <Header colorLogo={colorLogo} />
                <div className={css?.chatMainDiv}>
                    {
                        !chatLoading ?
                            chatInfo && chatInfo?.chatMessages && Array.isArray(chatInfo?.chatMessages) && chatInfo?.chatMessages?.length > 0 ? <>
                                <div className={css?.allChats}>
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
                                </div>
                                <div className={css?.chatWindow}>
                                    <div className={css?.chatHeading}>
                                        <img src={returnImageUrl(currentChat?.secondUser)} className={css?.headingImage} />
                                        {currentChat?.secondUser?.nickName}
                                    </div>
                                    {
                                        !singleChatLoading ?
                                            <div className={css?.chatMessagesMainDiv}>
                                                {
                                                    singleChatInfo && singleChatInfo?.messages && Array.isArray(singleChatInfo?.messages) && singleChatInfo?.messages?.length > 0 && singleChatInfo?.messages?.map((message: any, index: number) =>
                                                        <div className={css?.chatMessage} style={{ justifyContent: message?.user?._id != currentChat?.currentUserId ? 'flex-start' : 'end' }}>
                                                            <div className={css?.chatBubble} style={{ backgroundColor: message?.user?._id != currentChat?.currentUserId ? 'grey' : '#ED197A' }}>
                                                                {
                                                                    message?.image && <img src={message?.image} />
                                                                }
                                                                <div>
                                                                    {message?.text}
                                                                </div>

                                                            </div>
                                                            <div className={css?.chatBubbleInfo} style={{ justifyContent: message?.user?._id != currentChat?.currentUserId ? 'start' : 'end' }}>
                                                                {/* <div className={css?.chatBubbleInfoTime}>
                                                                    {message?.createdAt && message?.createdAt?.split('T')[0]}
                                                                </div> */}
                                                                <div className={css?.chatBubbleInfoTime}>
                                                                    {message?.createdAt && message?.createdAt?.split('T')[1]?.split('.')[0]}
                                                                </div>
                                                            </div>
                                                        </div>)
                                                }
                                                <div ref={messagesEndRef} />
                                            </div> :
                                            <div style={{ display: 'flex', height: '58vh', alignItems: 'center', justifyContent: "center", width: "100%" }}>
                                                <CircularProgress /></div>
                                    }
                                    <div className={css?.sendMessagePanel}>
                                        <textarea className={css?.sendMessageInput} value={messagetobesent} onChange={(e) => setmessagetobesent(e.target.value)} placeholder='Type a message...' />
                                        <div className={css?.sendMessageButton} onClick={handlePostMessage}>
                                            <SendIcon />
                                        </div>
                                    </div>
                                </div>
                            </> : <h1>No chats to display</h1>
                            : <div className={css?.chatLoadingCircle}> <CircularProgress /></div>}
                </div>
            </div><Footer /></div>
    )
}

export default Chats