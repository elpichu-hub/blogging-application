import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import endPoint from '../httpEndPoint';


// This will get a post and send it to the server
// will be receive by PostCreateAPIView which will
// add the user of the post depending on whta user
// is making the request. 
export const createPost = createAsyncThunk(
    'allPosts/createPost',
    async (args, { rejectWithValue }) => {
        const { accessToken, postContent } = args;
        try {
            const response = await fetch(`${endPoint.url}/createPost`, {
                method: 'POST',
                body: JSON.stringify(postContent),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            } else {
                const jsonResponse = await response.json();
                return rejectWithValue(jsonResponse);
            }
        } catch (error) {
            console.error(error)
        }
    }
);

// this will dislike a post. if the post is disliked
// then remove the dislike. if the post is liked it
// will then remove the like and add the dislike. 
// will be received by PostDislikeAPIView
export const dislikePost = createAsyncThunk(
    'allPosts/dislikePost',
    async (args, { rejectWithValue }) => {
        const { post, userLoggedInID, accessToken } = args;
        try {
            const response = await fetch(`${endPoint.url}/dislikePost/${post.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    dislikes: post.dislikes.includes(userLoggedInID) ?
                        post.dislikes.filter(dislike => dislike !== userLoggedInID) :
                        [...post.dislikes, userLoggedInID]
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                },
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse
            } else {
                const jsonResponse = await jsonResponse.json();
                return rejectWithValue(jsonResponse)
            };
        } catch (error) {
            console.error(error)
        }
    }
);

// this will like a post if the post is liked it will remove
// the like if the post is disliked it will remove the dislike
// and add the like. will be received by PostlikeAPIView
export const likePost = createAsyncThunk(
    'allPosts/likePost',
    async (args, { rejectWithValue }) => {
        const { post, userLoggedInID, accessToken } = args;
        try {
            const response = await fetch(`${endPoint.url}/likePost/${post.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    likes: post.likes.includes(userLoggedInID) ?
                        post.likes.filter(like => like !== userLoggedInID) :
                        [...post.likes, userLoggedInID]
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: accessToken,
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return jsonResponse;
            } else {
                const jsonResponse = await response.json();
                return rejectWithValue(jsonResponse);
            }
        } catch (error) {
            console.error(error)
        }
    }
);

// This will get posts PostListAPIView. The url will contain an
// offset number which starts at 0 then when this runs it increases
// to 5. this will do pagination effect. This is run in body.js
export const getPosts = createAsyncThunk(
    'allPosts/getPosts',
    async (args, { rejectWithValue }) => {
        const { accessToken, paginatedUrl } = args;
        try {
            const response = await fetch(paginatedUrl, {
                headers: {
                    Authorization: accessToken
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse)
                return jsonResponse
            } else {
                const jsonResponse = await response.json();
                return rejectWithValue(jsonResponse)
            };
        } catch (error) {
            console.error(error)
        }
    }
);

export const filterPosts = createAsyncThunk(
    'allPosts/FilterPosts',
    async (args, {rejectWithValue}) => {
        const {accessToken, data} = args;
        try {
            const response = await fetch(`${endPoint.url}/getPosts?search=${data}`, {
                headers: {
                    Authorization: accessToken
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
            console.error(error)
        }
    }
);


const allPostsSlice = createSlice({
    name: 'allPosts',
    initialState: {
        posts: [],
        isLoading: false,
        postError: null,
    },
    reducers: {
        clearPosts: (state, action) => {
            state.posts = []
        },
        clearPostErrors: (state, action) =>{
            state.postError = false;
        }
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.postError = false;
        },
        [getPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.postError = false;
            state.posts = state.posts.concat(action.payload.results)
        },

        [getPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.postError = action.payload;
            console.log('get Posts rejected')
        },

        [likePost.pending]: (state, action) => {
            state.isLoading = true;
            state.postError = false;
        },
        [likePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.postError = false;
            console.log(action.payload)
            state.posts.map(post => post.id === action.payload.id ? post.likes = action.payload.likes : post)

        },
        [likePost.rejected]: (state, action) => {
            state.isLoading = false;
            state.postError = action.payload;
            console.log(action.payload)
        },

        [dislikePost.pending]: (state, action) => {
            state.isLoading = true;
            state.postError = false;
        },
        [dislikePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.postError = false;
            state.posts.map(post => post.id === action.payload.id ? post.dislikes = action.payload.dislikes : post)

        },
        [dislikePost.rejected]: (state, action) => {
            state.isLoading = false;
            state.postError = action.payload;
        },

        [createPost.pending]: (state, action) => {
            state.isLoading = true;
            state.postError = false;
        },
        [createPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.postError = false;
            state.posts.unshift(action.payload)
            console.log(action.payload)
        },
        [createPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.postError = action.payload;
        },

        [filterPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.postError = false;
            console.log(`posts filtered pending`)
        },
        [filterPosts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.postError = false;
            state.posts = action.payload.results
            console.log(`posts filtered ${action.payload.results}`)
        },
        [filterPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.postError = action.payload;
            console.log(`error filtered ${action.payload}`)
        }
    }
});


export const { clearPosts, clearPostErrors } = allPostsSlice.actions;
export const selectAllPostsSlice = state => state.allPosts;
export default allPostsSlice.reducer;