import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import endPoint from '../httpEndPoint';


// This is used in profile.js to get the user 
// info. This will set the userLoggedInDecoded
// state. This will be received by UserRetrieveAPIView
// which will return the user with userID passed
// in the url. 
export const retrieveUser = createAsyncThunk(
    'users/retrieveUser',
    async (args, { rejectWithValue }) => {
        const { userID, accessToken } = args;
        try {
            const response = await fetch(`${endPoint.url}/retrieveUser/${userID}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
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
)

// This will update information about the user model.
// will pass the new changes to UserRetrieveAPIView.
// which will then update the user model.
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (args, { rejectWithValue }) => {
        const { userID, accessToken, newUserData } = args;
        try {
            const response = await fetch(`${endPoint.url}/updateUser/${userID}`, {
                method: 'PATCH',
                body: JSON.stringify(newUserData),
                headers: {
                    'Content-type': 'application/json',
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
)

// This will use the refresh token to get a new
// access and refresh token everytime the app starts.
// this endpoint is part of simple jwt. got it from
// the documentation.
// https://django-rest-framework-simplejwt.readthedocs.io/en/latest/#
export const refreshToken = createAsyncThunk(
    'users/refreshToken',
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch(`${endPoint.url}/api/token/refresh/`, {
                method: 'POST',
                body: JSON.stringify(token),
                headers: {
                    'Content-type': 'application/json',
                },
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

// This will gather the credentials entered by
// the user to log in. Then make a request to the end
// point which is part of simple jwt. if the user
// entered valid information the endpoint will
// return an access token and refresh token. 
// which you use then to authorize requests
// in the app. 
export const login = createAsyncThunk(
    'users/login',
    async (args, { rejectWithValue }) => {
        const { credentials } = args;
        try {
            const response = await fetch(`${endPoint.url}/api/token/`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    'Content-type': 'application/json',
                },
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

// This is used to get the list of all the users so
// that the app can suggest users in userSuggestions.js
// this will be receive by UserListAPIView
export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (accessToken, { rejectWithValue }) => {
        try {
            const response = await fetch(`${endPoint.url}/getUsers`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: accessToken
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json();
                return jsonResponse;
            } else {
                const jsonResponse = await response.json();
                return rejectWithValue(jsonResponse)
            }
        } catch (error) {
            console.error(error)
        }
    }
);

export const signUp = createAsyncThunk(
    'users/signUp',
    async (args, { rejectWithValue }) => {
        const { newCredentials, accessToken } = args;
        try {
            const response = await fetch(`${endPoint.url}/signup`, {
                method: 'POST',
                body: JSON.stringify(newCredentials),
                headers: {
                    'Content-type': 'application/json',
                    // Authorization: accessToken
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json()
                return jsonResponse
            } else {
                const jsonResponse = await response.json()
                return rejectWithValue(jsonResponse)
            }
        } catch (error) {
            console.error(error)
        }
    }
);

// this will send the email entered by a user to reset password to
// djoser endpoint. Will send an email with a link which user
// must click to reset password.
export const resetPassword = createAsyncThunk(
    'users/resetPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await fetch(`${endPoint.url}/auth/users/reset_password/`, {
                method: 'POST',
                body: JSON.stringify(email),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (response.status !== 204) {
                const jsonResponse = await response.json()
                return rejectWithValue(jsonResponse)
            }
        } catch (error) {
            console.error(error)
        }
    }
);

export const resetPasswordConfirm = createAsyncThunk(
    'users/resetPasswordConfirm',
    async (args, { rejectWithValue }) => {
        const { objectForNewPassword } = args;
        try {
            const response = await fetch(`${endPoint.url}/auth/users/reset_password_confirm/`, {
                method: 'POST',
                body: JSON.stringify(objectForNewPassword),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            if (response.status !== 204) {
                const jsonResponse = await response.json()
                return rejectWithValue(jsonResponse)
            }
        } catch (error) {
            console.error(error)
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        userSuggestions: [],
        isLoading: false,
        userError: false,
        userLoggedIn: {},
        userLoggedInDecoded: {},
        room: null,
        userReceivingMessage: null,
        newUser: false,
        userRequestNewPassword: null,
        resetPasswordError: null,
        resetPasswordSuccess : null,
    },
    reducers: {
        // This will clear the localStorage thus
        // loging out the user. 
        logout: (state, action) => {
            localStorage.clear();
        },
        // This will set the access token return
        // by simple jwt so that the app
        // knows who is the userLoggedIn
        setUserLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload;
        },
        // This will create a room for chat
        // based on the userLoggedIn and the
        // user selected userReceivingMessage
        // this will be called in userSuggestions.js
        createRoom: (state, action) => {
            state.room = action.payload;
        },
        // This will set userReceivingMessage when a user
        // selects a user to send a message
        setUserReceivingMessage: (state, action) => {
            state.userReceivingMessage = action.payload;
        },
        // This will call an error if a fields is missing
        // when log in. 
        setEmptyFieldsErrorForLogIn: (state, action) => {
            state.userError = action.payload;
        },
        // removed the newUser States so that the success
        // messages stop rendering in log in after
        // attempting to log in. 
        removeNewUserState: (state, action) => {
            state.newUser = false;
        },
        // This will be used to set the state userRequestNewPassword
        // to false once the user logged in. userRequestNewPassword will
        // on be be set to true when the user is requesting to update 
        // password.
        resetUserRequestNewPassword: (state, action) => {
            state.userRequestNewPassword = false;
        },

        // removeUserError: (state, action) => {
        //     state.userError = null;
        // },
        // This will be used to remove the resetPasswordSuccessState
        // at login event to remove the sucess message.
        removeResetPasswordSuccessState: (state, action) => {
            state.resetPasswordSuccess = false;
        }
    },
    extraReducers: {
        [getAllUsers.pending]: (state, action) => {
            state.isLoading = true;
            state.userError = false;
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userError = false;
            state.users = action.payload;
            // define two values to use randomly in do while
            // the purpuse is not not have the same value
            // for both variables.
            // if the number of users is less than 2 this will not
            // run
            let randomNumber1 = '';
            let randomNumber2 = '';
            if (action.payload.results.length > 1) {
                do {
                    randomNumber1 = Math.floor(Math.random() * action.payload.results.length);
                    randomNumber2 = Math.floor(Math.random() * action.payload.results.length);
                }
                while (randomNumber1 === randomNumber2)
                state.userSuggestions = [action.payload.results[randomNumber1], action.payload.results[randomNumber2]];
            } else {
                state.userSuggestions = action.payload.results;
            };
        },
        [getAllUsers.rejected]: (state, action) => {
            state.isLoading = false;
            state.userError = action.payload;
        },

        [login.pending]: (state, action) => {
            state.isLoading = true;
            state.userError = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userError = false;
            localStorage.setItem('access', action.payload.access)
            localStorage.setItem('refresh', action.payload.refresh)
            localStorage.setItem('user', action.payload.access)
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.userError = action.payload;
        },

        [refreshToken.pending]: (state, action) => {
            state.isLoading = true;
            state.userError = false;
            console.log('refresh pedning')
        },
        [refreshToken.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userError = false;
            localStorage.setItem('access', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
            localStorage.setItem('user', action.payload.access);
            console.log('refresh ran')
        },
        [refreshToken.rejected]: (state, action) => {
            state.isLoading = false;
            state.userError = action.payload;
            console.log('refresh rejected')
        },

        [updateUser.pending]: (state, action) => {
            state.isLoading = true;
            state.userError = false;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userError = false;
            state.userLoggedInDecoded = action.payload;
        },
        [updateUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.userError = action.payload;
        },

        [retrieveUser.pending]: (state, action) => {
            state.isLoading = true;
            state.userError = false;
        },
        [retrieveUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userError = false;
            state.userLoggedInDecoded = action.payload;
        },
        [retrieveUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.userError = action.payload;
        },

        [signUp.pending]: (state, action) => {
            state.isLoading = true;
            state.userError = false;
        },
        [signUp.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.userError = false;
            state.newUser = true;

        },
        [signUp.rejected]: (state, action) => {
            state.isLoading = false;
            state.userError = action.payload;
            state.newUser = false;
        },

        [resetPassword.pending]: (state, action) => {
            state.isLoading = true;
            state.resetPasswordError = false;
            state.resetPasswordSuccess = false;
            state.userRequestNewPassword = false;
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.resetPasswordError = false;
            state.userRequestNewPassword = true;
            state.resetPasswordSuccess = false;
        },
        [resetPassword.rejected]: (state, action) => {
            state.isLoading = false;
            state.resetPasswordError = action.payload;
            state.resetPasswordSuccess = false;
            state.userRequestNewPassword = false;
        },

        [resetPasswordConfirm.pending]: (state, action) => {
            state.isLoading = true;
            state.resetPasswordError = false;
            state.resetPasswordSuccess = false;
            console.log('password pending')
        },
        [resetPasswordConfirm.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.resetPasswordError = false;
            state.resetPasswordSuccess = true;
            console.log('password created')
        },
        [resetPasswordConfirm.rejected]: (state, action) => {
            state.isLoading = false;
            state.resetPasswordError = action.payload;
            state.resetPasswordSuccess = false;
            console.log('password rejected')
        }
    },
});


export const selectUsersSlice = (state) => state.users;
export const {
    setUserLoggedIn, logout, createRoom,
    setUserReceivingMessage, setEmptyFieldsErrorForLogIn,
    removeNewUserState, resetUserRequestNewPassword,
    removeUserError, removeResetPasswordSuccessState
} = usersSlice.actions;
export default usersSlice.reducer;