import { createSlice } from "@reduxjs/toolkit";


// Tried doing the messaging through regular HTTP but it's not too efficient
// so i did it using websockts. django-channels. 
// export const checkForNewMessages = createAsyncThunk(
//     'messages/checkForNewMessages',
//     async (args, { rejectWithValue }) => {
//         // put some logic here to check for new messages then if there are new messages add those new messages to messages.
//         const { room_id, accessToken } = args;
//         try {
//             const response = await fetch(`http://localhost:8000/getMessages/${room_id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-type': 'application/json',
//                     Authorization: accessToken
//                 }
//             })
//             if (response.ok) {
//                 const jsonResponse = await response.json()
//                 return jsonResponse
//             } else {
//                 const jsonResponse = await response.json()
//                 console.log(jsonResponse)
//                 return rejectWithValue(jsonResponse)
//             }
//         } catch (error) {
//             alert(error)
//         }
//     }
// )


// export const getMessagesForRoom = createAsyncThunk(
//     'messages/getMessagesForRoom',
//     async (args, { rejectWithValue }) => {
//         const { room_id, accessToken } = args;
//         try {
//             const response = await fetch(`http://localhost:8000/getMessages/${room_id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-type': 'application/json',
//                     Authorization: accessToken
//                 }
//             })
//             if (response.ok) {
//                 const jsonResponse = await response.json()
//                 return jsonResponse
//             } else {
//                 const jsonResponse = await response.json()
//                 console.log(jsonResponse)
//                 return rejectWithValue(jsonResponse)
//             }
//         } catch (error) {
//             alert(error)
//         }
//     }
// );


// export const createMessage = createAsyncThunk(
//     'messages/createMessage',
//     async (args, { rejectWithValue }) => {
//         const { accessToken, message } = args;
//         try {
//             const response = await fetch('http://localhost:8000/createMessage', {
//                 method: 'POST',
//                 body: JSON.stringify(message),
//                 headers: {
//                     'Content-type': 'application/json',
//                     Authorization: accessToken
//                 }
//             })
//             if (response.ok) {
//                 const jsonResponse = await response.json()
//                 return jsonResponse
//             } else {
//                 const jsonResponse = await response.json()
//                 return rejectWithValue(jsonResponse)
//             }
//         } catch (error) {
//             alert(error)
//         }
//     }
// )
const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        // newMessages: [],
        // isLoading: false,
        // hasError: false,
    },
    reducers: {
        // addNewMessageFromOtherUser: (state, action) => {
        //     state.messages.push(action.payload)
        // },
        // The webSocket will recieve the messages
        // from the server. this action will
        // set the messages for the ui.
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        // if the server send a command of new message
        // this action will add the new message to 
        // the messages to show in the ui
        setNewMessage: (state, action) => {
            state.messages.push(action.payload)
        },
    },
    extraReducers: {
        // [getMessagesForRoom.pending]: (state, action) => {
        //     state.messages = [];
        //     state.isLoading = true;
        //     state.hasError = false;
        // },
        // [getMessagesForRoom.fulfilled]: (state, action) => {
        //     state.messages = action.payload.results;
        //     state.isLoading = false;
        //     state.hasError = false;

        // },
        // [getMessagesForRoom.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.hasError = action.payload;
        // },

        // [createMessage.pending]: (state, action) => {
        //     state.isLoading = true;
        //     state.hasError = false;
        // },
        // [createMessage.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     state.hasError = false;
        //     state.messages.push(action.payload)
        // },
        // [createMessage.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.hasError = action.payload;
        // },

        // [checkForNewMessages.rejected]: (state, action) => {
        //     state.isLoading = true;
        //     state.hasError = false;
        // },
        // [checkForNewMessages.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     state.hasError = false;
        //     state.newMessages = action.payload.results;
        // },
        // [checkForNewMessages.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.hasError = action.payload;
        // }
    }
});


export const { setMessages, setNewMessage } = messagesSlice.actions;
export const selectMessagesSlice = state => state.messages;
export default messagesSlice.reducer;