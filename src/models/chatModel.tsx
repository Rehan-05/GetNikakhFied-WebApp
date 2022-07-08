export interface IChats {
    chatMessages: IChatMessage[];
    noOfUnReadMessages: number;
    photosRevealedTo: any[];
}

export interface IChatMessage {
    id: number;
    currentUserId: number;
    secondUserId: number;
    isRead: boolean;
    noOfUnReadMessages: number;
    timeSent: string;
    messageTime: string;
    lastMessage: string;
    lastMessageType: string;
    lastMessageBy: string;
    lastMessageId: number;
    noOfPages: number;
    totalMessages: number;
    availableMessages: number;
    currentPage: number;
    currentUser: User;
    secondUser: User;
    otherReveal: boolean;
    isCurrentUserBlurOn: boolean;
    currentReveal: boolean;
}

export interface User {
    id: number;
    gender: string;
    email: string;
    dob: string;
    nickName: string;
    mainPhoto: string;
    selfiePhoto: string;
    age: number;
    isDeactivated: null;
    isBlurOn: boolean;
    country: string;
}
