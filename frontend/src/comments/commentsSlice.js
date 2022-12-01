import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import endPoint from "../httpEndPoint";

// This thunk will get a URL which contains a post.id
// it will send it to django view: CommentListAPIView
// which will then return the comments filtered
// for the post.id / post.
export const getCommentsByPost = createAsyncThunk(
    'comments/getCommentsByPost',
    async (args, { rejectWithValue }) => {
        const { accessToken, paginatedURL } = args;
        try {
            const response = await fetch(paginatedURL, {
                method: 'GET',
                headers: {
                    Authorization: accessToken,
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse
            } else {
                const jsonResponse = await response.json();
                return rejectWithValue(jsonResponse)
            }
        } catch (error) {
            alert(error)
        }
    }
);

// This will gather gather the comment from the comment
// input fields 'reply' send it to the server 
// the server will then assigend the author of the comment
// based on the user making the request which
// is determined based on the jwt token
export const createComment = createAsyncThunk(
    'comments/createComment',
    async (args, { rejectWithValue }) => {
        const { newComment, accessToken } = args;
        try {
            const response = await fetch(`${endPoint.url}/createComment`, {
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse
            } else {
                const jsonResponse = await response.json();
                return rejectWithValue(jsonResponse)
            };
        } catch (error) {
            console.log(error)
        }
    }
);

const allCommentsSlice = createSlice({
    name: 'comments',
    // postToBeCommented will only be used
    // in post.js to make sure that only
    // the post clicked will show a 
    // comment form
    initialState: {
        comments: [],
        isLoading: false,
        error: false,
        postToBeCommented: null
    },
    reducers: {
        // setPostToBeCommented will only be used
        // in post.js to make sure that only
        // the post clicked will show a 
        // comment form. This will be inside
        // an click event handler. in post.js
        setPostToBeCommented: (state, action) => {
            if (state.postToBeCommented === action.payload.id) {
                state.postToBeCommented = null
            } else {
                state.postToBeCommented = action.payload.id;
            }

        },
    },
    extraReducers: {
        [createComment.pending]: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        [createComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.comments.results.unshift(action.payload)
        },
        [createComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.error(action.payload)
        },
        [getCommentsByPost.pending]: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        [getCommentsByPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.comments = action.payload;
        },
        [getCommentsByPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.error(action.payload)
        }
    }
});


export const { setPostToBeCommented } = allCommentsSlice.actions;
export const selectAllComments = (state) => state.allCommentsSlice.comments;
export default allCommentsSlice.reducer;