import {
    GET_CHAT_FAIL,
    GET_CHAT_SUCCESS,
    GET_CHAT_REQUEST,
    GET_SINGLE_CHAT_FAIL,
    GET_SINGLE_CHAT_SUCCESS,
    GET_SINGLE_CHAT_REQUEST,
} from "../constants/chatConstants";

export const chatReducer = (state = {}, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CHAT_REQUEST:
            return {
                ...state,
                chatInfo: null,
                chatLoading: true,
            };
        case GET_CHAT_SUCCESS:
            return {
                ...state,
                chatLoading: false,
                chatInfo: payload,
                chatError: "",
            };
        case GET_CHAT_FAIL:
            return {
                ...state,
                chatLoading: false,
                chatError: payload,
            };
        default:
            return state;
    }
};

export const singleChatReducer = (state = {}, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case GET_SINGLE_CHAT_REQUEST:
            return {
                ...state,
                singleChatInfo: null,
                singleChatLoading: true,
            };
        case GET_SINGLE_CHAT_SUCCESS:
            return {
                ...state,
                singleChatLoading: false,
                singleChatInfo: payload,
                singleChatError: "",
            };
        case GET_SINGLE_CHAT_FAIL:
            return {
                ...state,
                singleChatLoading: false,
                singleChatError: payload,
            };
        default:
            return state;
    }
};
