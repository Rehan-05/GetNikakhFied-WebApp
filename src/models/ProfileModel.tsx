export interface ProfilePhoto {
    id: number;
    profileId: number;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
}
export interface UserTypes {
    id: number;
    representedBy: string;
    gender: string;
    email: string;
    dob: Date;
    nickName: string;
    mainPhoto: string;
    verifcationImage: string;
    selfiePhoto: string;
    isBlurOn: boolean;
    isVerified: boolean;
    isPhoneVerified: boolean;
    isLockEnabled: boolean;
    isChaperoneEnabled: boolean;
    password: string;
    isFacebook: boolean;
    isGoogle: boolean;
    facebookProfileId: string;
    googleProfileId: string;
    age: number;
    location: number;
    availableMessages: number;
    country: string;
    city: string;
    height: string;
    lat: number;
    lng: number;
    isInVerificationProcess: boolean;
    verificationStatus: string;
    isBlocked: boolean;
    isUnderReview: boolean;
    blockageMessage: string;
    profilePhotos: Array<ProfilePhoto>;
    profileDetail: Array<ProfileDetails>;
    isRevealedToCurrent: boolean;
}
export interface ProfileDetails {
    about: string;
    canRelocate: boolean;
    doesAlcohol: boolean;
    doesSmoke: boolean;
    dressingStyle: string;
    educationLevel: string;
    employerName: string;
    ethnicGroupId: number;
    ethnicOriginId: number;
    haveChildren: boolean;
    id: number;
    isConvertRevert: boolean;
    cast: string;
    jobTitle: string;
    location: string; //-------
    maritalStatus: string;
    marriagePlan: string;
    onlyHalal: boolean;
    phone: string;
    prayingInfo: string;
    professionId: number;
    profileId: number;
    religiousityLevel: string;
    sect: string;
    statusMessage: string;
    partnerCast: string;
    partnerSiblings: string;
    partnerCity: string;
    partnerDemand: string;
    partnerProfession: string;
}
export interface GoogleUser {
    email: string;
    familyName: string;
    givenName: string;
    id: number;
    name: string;
    photoUrl: string;
}
export interface FBUser {
    email: string;
    id: number;
    name: string;
    gender: string;
}
export interface social {
    IsFacebook?: boolean;
    IsGoogle?: boolean;
    IsApple?: boolean;
    profileId: number;
    email: string;
    name: string;
    dob: string;
    gender: string;
}
export interface normal {
    email: string;
    password: string;
    dob: string;
    gender: string;
    name: string;
}
export interface IReply {
    title: string;
    value: string;
    messageId?: any;
}
export interface IUser {
    _id: number;
    name: string;
    avatar: string;
}
export interface IQuickReplies {
    type: "radio" | "checkbox";
    values: IReply[];
    keepIt?: boolean;
}
export interface IMessage {
    _id: string | number;
    text?: string;
    createdAt: Date | number;
    user: IUser;
    image?: string;
    video?: string;
    audio?: string;
    system?: boolean;
    sent?: boolean;
    received?: boolean;
    pending?: boolean;
    quickReplies?: IQuickReplies;
    roomId: number;
}
export interface CMessage {
    MessageId: number;
    text: string;
    IsRead?: boolean;
    IsDelivered?: boolean;
    DateSent?: Date;
    ChatId?: number;
    SentBy?: number;
    RecievedBy?: number;
}
export interface ChatListItem {
    availableMessages: number;
    currentPage: number;
    currentReveal: boolean;
    currentUser: User;
    currentUserId: number;
    id: number;
    isCurrentUserBlurOn: boolean;
    isRead: boolean;
    lastMessage: string;
    lastMessageBy: string;
    lastMessageId: number;
    messageTime: string;
    noOfPages: number;
    noOfUnReadMessages: number;
    otherReveal: boolean;
    secondUser: User;
    secondUserId: number;
    timeSent: string;
    totalMessages: number;
}
export interface User {
    age: number;
    country: string;
    dob: string;
    email: string;
    gender: string;
    id: number;
    isBlurOn: boolean;
    isDeactivated: null;
    mainPhoto: string;
    nickName: string;
    selfiePhoto: string;
}