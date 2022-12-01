import { configureStore } from "@reduxjs/toolkit";
import allPostsReducer from "../posts/postSlice";
import allUsersReducer from "../users/userSlice";
import allCommentsReducer from "../comments/commentsSlice";
import allProfileReducer from "../profile/profileSlice";
import allMessagesReducer from '../messages/messagesSlice';


export default configureStore({
    reducer: {
        posts: allPostsReducer,
        users: allUsersReducer,
        comments: allCommentsReducer,
        profiles: allProfileReducer,
        messages: allMessagesReducer,
    }
});