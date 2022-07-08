import axios from 'axios';
import {
    GET_CHAT_FAIL,
    GET_CHAT_SUCCESS,
    GET_CHAT_REQUEST,
    GET_SINGLE_CHAT_FAIL,
    GET_SINGLE_CHAT_SUCCESS,
    GET_SINGLE_CHAT_REQUEST,
} from "../constants/chatConstants";
import baseUrl from '../constants/baseUrl'

export const getChatList = (userId: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_CHAT_REQUEST,
        });
        const { data } = await axios.get(`${baseUrl}ChatsListAPI/${userId}`);
        dispatch({
            type: GET_CHAT_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_CHAT_FAIL,
            payload: "Failed to load list,Please try again!",
        });
    }
};

export const getChat = (user1: number, user2: number, chatId: number, pageNumber: number) => async (dispatch: any) => {
    try {
        dispatch({
            type: GET_SINGLE_CHAT_REQUEST,
        });
        const { data } = await axios.get(`${baseUrl}ChatAPI?user1=${user1}&user2=${user2}&pageNumber=${pageNumber}`);
        dispatch({
            type: GET_SINGLE_CHAT_SUCCESS,
            payload: { ...data, messages: data?.messages?.length > 0 ? data?.messages?.reverse() : [] }
        });
        const chatList = await axios.get(`${baseUrl}ChatsListAPI/${user1}`);
        if (chatList?.data) {
            dispatch({
                type: GET_CHAT_SUCCESS,
                payload: chatList?.data
            });
        }
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_SINGLE_CHAT_FAIL,
            payload: "Failed to load Chat,Please try again!",
        });
    }
};

export const postChat = (chatObj: any) => async (dispatch: any) => {
    try {
        // dispatch({
        //     type: GET_CHAT_REQUEST,
        // });
        const res = await axios.post(`${baseUrl}ChatMessages`, chatObj);
        // console.log('Chat from API', res)
        const { data } = await axios.get(`${baseUrl}ChatAPI?user1=${chatObj?.sentBy}&user2=${chatObj?.recievedBy}&pageNumber=1`);
        console.log('Chat refresh after sending message API', data)
        dispatch({
            type: GET_SINGLE_CHAT_SUCCESS,
            payload: { ...data, messages: data?.messages?.length > 0 ? data?.messages?.reverse() : [] }
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_CHAT_FAIL,
            payload: "Failed to post chat,Please try again!",
        });
    }
};