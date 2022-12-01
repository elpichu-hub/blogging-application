import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import endPoint from "../httpEndPoint";


// this will be give a userID send it to the server,
// ProfileListAPIView will then return the profile for
// that user. 
export const getProfileForUserLoggedIn = createAsyncThunk(
    'profile/getProfileForUserLoggedIn',
    async (args, { rejectWithValue }) => {
        const { userLoggedInID, accessToken } = args;
        try {
            const response = await fetch(`${endPoint.url}/getProfile/${userLoggedInID}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: accessToken
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
            alert(error)
        }
    }
);


// this will gather information enter by user on the ui
// and update the profile for a user. will be recieved
// by ProfileUpdateView
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (args, { rejectWithValue }) => {
        const { profileID, accessToken, newProfileData } = args;
        try {
            const response = await fetch(`${endPoint.url}/updateProfile/${profileID}`, {
                method: 'PATCH',
                body: JSON.stringify(newProfileData),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: accessToken
                },
            })
            if (response.ok) {
                const jsonResponse = await response.json()
                return jsonResponse
            } else {
                const jsonResponse = await response.json()
                return rejectWithValue(jsonResponse)
            }
        } catch (error) {
            alert(error)
        }
    }
);

// This will update the profile Picture for users
// in order to pass an image I Had to create a FormData
// const formData = new FormData() then use append('key', 'value')
// in the headers could not add a application/type because
// it would give some errors about invalid format. 
// you get the image file by targeting the input element
// e.g: e.target.files that will give you the list
// of files you selected. this will passs a profile ID to
// ProfileUpdateView will update the profile image. 
export const updateProfileImage = createAsyncThunk(
    'profile/updateProfileImage',
    async (args, { rejectWithValue }) => {
        const { profileID, accessToken, formData } = args;
        try {
            const response = await fetch(`${endPoint.url}/updateProfile/${profileID}`, {
                method: 'PATCH',
                body: formData,
                headers: {
                    Authorization: accessToken
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json()
                return jsonResponse
            } else {
                const jsonResponse = await response.json()
                return rejectWithValue(jsonResponse)
            }
        } catch (error) {
            alert(error)
        }
    }
);

// this will check if there is an user using the email
// already before updating the email at '/profile'
// this will make a call at UserRetrieveByEmailAPIView
export const UserRetrieveByEmailAPIView = createAsyncThunk(
    'profile/checkIfEmailExist',
    async (args, { rejectWithValue }) => {
        const { email, accessToken } = args;
        try {
            const response = await fetch(`${endPoint.url}/UserRetrieveByEmailAPIView/${email}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: accessToken
                },
            })
            if (response.ok) {
                const jsonResponse = await response.json()
                return jsonResponse
            } else {
                const jsonResponse = await response.json()
                return rejectWithValue(jsonResponse)
            }
        } catch (error) {
            alert(error)
        }
    }
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isLoading: false,
        error: null,
        profile: {},
        emailExists: null,
    },
    reducers: {
        removeEmailExistsMessage: (state, action) => {
            state.emailExists = null;
        },
    },
    extraReducers: {
        [updateProfile.pending]: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.profile = action.payload;
        },
        [updateProfile.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [updateProfileImage.pending]: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        [updateProfileImage.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.profile = action.payload;
        },
        [updateProfileImage.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [getProfileForUserLoggedIn.pending]: (state, action) => {
            state.isLoading = true;
            state.error = false;
        },
        [getProfileForUserLoggedIn.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.profile = action.payload['results'][0]
        },
        [getProfileForUserLoggedIn.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
            console.error(action.payload)
        },

        [UserRetrieveByEmailAPIView.pending]: (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.emailExists = null;
        },
        [UserRetrieveByEmailAPIView.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.emailExists = action.payload.count;
        },
        [UserRetrieveByEmailAPIView.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.emailExists = null;
        },

    }
});


export const { removeEmailExistsMessage } = profileSlice.actions;
export const selectProfileSlice = (state) => state.profile;
export default profileSlice.reducer;


