import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/headers/Header';
import Footer from '../components/footer/Footer';
import colorLogo from "../htmlDeigne/images/logo_color.svg";
import { useSelector, useDispatch } from 'react-redux'
import { getChat, getChatList, postChat } from '../store/actions/chatActions';
import { profileImageUrl } from '../store/constants/baseUrl';
import css from '../styles/singleChat.module.css';
import { CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router'
import { IUser } from '../models/userModel'
import axios from 'axios'
import baseUrl from '../store/constants/baseUrl'
import { Check } from '@mui/icons-material'


const SingleChat = () => {
    // navigate into project
    const navigate = useNavigate()
    // params from route
    const { user1Id, user2Id, chatId }: any = useParams()
    // dispatch redux actions
    const dispatch = useDispatch()
    // get user info
    const userInfo = useSelector((state: any) => state?.loginReducer?.userData);
    // get single chat
    const { singleChatInfo, singleChatLoading, singleChatError } = useSelector((state: any) => state?.singleChatReducer);

    // message
    const [messagetobesent, setmessagetobesent] = useState('')

    // loading second user
    const [secondUserLoading, setsecondUserLoading] = useState<Boolean>(true)
    // second user state
    const [secondUser, setsecondUser] = useState<IUser>()
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

    useEffect(() => {
        if (user2Id) {
            axios.get(`${baseUrl}ProfileDetails/${user2Id}`)
                .then((res) => {
                    console.log("second user data", res?.data)
                    setsecondUser(res?.data)
                    setsecondUserLoading(false)
                })
                .catch((error) => {
                    setsecondUserLoading(false)
                    console.log(error)
                })
                ;
        }
    }, [user2Id])
    // set first chat to be the active chat
    useEffect(() => {
        if (user1Id && user2Id && chatId) {
            dispatch(getChat(user1Id, user2Id, chatId, 1))
        }
    }, [user1Id, user2Id, chatId])

    const handlePostMessage = () => {
        const messageObj = {
            text: messagetobesent,
            IsRead: false,
            IsDelivered: false,
            chatId: chatId,
            sentBy: userInfo?.id,
            recievedBy: user2Id,
        }
        dispatch(postChat(messageObj))
        setmessagetobesent('');
    }

    const returnImageUrl = (user: any) => {
        if (user?.mainPhoto) {
            console.log("returning", profileImageUrl + user?.mainPhoto)
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

    const returnTime = (message: any) => {
        let time = message?.createdAt?.split('T')[1]?.split('.')[0].split(':')
        let amPm = "PM"
        if (time.length === 3) {
            const hour = parseInt(time[0])
            if (hour === 0) {
                return "12" + ":" + time[1] + ' ' + "AM"
            }
            else if (hour < 12) {
                return time[0] + ":" + time[1] + ' ' + "AM"
            }
            else if (hour === 12) {
                return time[0] + ":" + time[1] + ' ' + "PM"
            }
            else {
                const newTime = time[0] - 12
                return newTime + ":" + time[1] + ' ' + "PM"

            }
        }
    }
    return (
        <div className="white_bg">
            <div className="container">
                <Header colorLogo={colorLogo} />
                {
                    !singleChatLoading && !secondUserLoading ?
                        !singleChatError ?
                            <div className={css?.singleChatMainDiv}>
                                <div className={css?.chatWindow}>
                                    <div className={css?.chatHeading}>
                                        <img src={returnImageUrl(secondUser)} className={css?.headingImage} />
                                        {secondUser?.nickName}
                                        {secondUser?.isVerified &&
                                            <div className={css?.isverified}><Check style={{ color: '#2EED19', fontWeight: "600" }}></Check>Verified</div>}
                                    </div>
                                    <div className={css?.chatMessagesMainDiv}>
                                        {
                                            singleChatInfo && singleChatInfo?.messages && Array.isArray(singleChatInfo?.messages) && singleChatInfo?.messages?.length > 0 && singleChatInfo?.messages?.map((message: any, index: number) =>
                                                <div className={css?.chatMessage} style={{ justifyContent: message?.user?._id != user1Id ? 'flex-start' : 'end' }}>
                                                    <div className={css?.chatBubble} style={{ backgroundColor: message?.user?._id != user1Id ? '#FAFAFA' : '#ED197A', color: message?.user?._id != user1Id ? 'black' : 'white' }}>
                                                        {
                                                            message?.image && <img src={message?.image} className={css?.chatImageTag} />
                                                        }
                                                        <div>
                                                            {message?.text}
                                                        </div>

                                                    </div>
                                                    <div className={css?.chatBubbleInfo} style={{ justifyContent: message?.user?._id != user1Id ? 'start' : 'end' }}>
                                                        <div className={css?.chatBubbleInfoTime}>
                                                            {returnTime(message)}
                                                        </div>
                                                    </div>
                                                </div>)
                                        }
                                        <div ref={messagesEndRef} />
                                    </div>
                                    <div className={css?.sendMessagePanel}>
                                        <textarea className={css?.sendMessageInput} value={messagetobesent} onChange={(e) => setmessagetobesent(e.target.value)} placeholder='Type a message...' />
                                        <div className={css?.sendMessageButton} onClick={handlePostMessage}>
                                            <SendIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className={css?.profileBoard}>
                                    <div className={css?.imageDiv}>
                                        <img src={returnImageUrl(secondUser)} className={css?.sidePanelImage} />
                                    </div>
                                    <div className={css?.sidePanelName}>{secondUser?.nickName}</div>
                                    <div className={css?.optionBtn}>View Profile</div>
                                    <div className={css?.optionBtn}>Add to favorite</div>
                                    <div className={css?.optionBtn}>Block user</div>


                                </div>
                            </div> : <h1>Something went wrong</h1> :
                        <div style={{ display: 'flex', height: '90vh', alignItems: 'center', justifyContent: "center", width: "100%" }}>
                            <CircularProgress /></div>
                }
            </div>
            <div className={css?.footerDiv}>
                <Footer />
            </div>
        </div>
    )
}

export default SingleChat