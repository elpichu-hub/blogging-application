// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getMessagesForRoom, createMessage, checkForNewMessages } from "./messagesSlice";
// import { Message } from "../message/message";
// import jwtDecode from "jwt-decode";
// import './message.css';
// import { useInterval } from "./useInterval";
// import { addNewMessageFromOtherUser } from "./messagesSlice";

// Tried doing the messaging through regular HTTP but it's not too efficient
// so i did it using websockts. django-channels. 
// export const Messages = () => {
//     const userLoggedInID = jwtDecode(localStorage.getItem('access')).user_id;
//     const dispatch = useDispatch()
//     const { messages, newMessages } = useSelector((state) => state.messages)
//     const { room, userReceivingMessage } = useSelector((state) => state.users)

//     useEffect(() => {
//         const interval = setInterval(() => {
//           console.log('This will run every second!');
//           dispatch(getMessagesForRoom({ room_id: room }))
//         }, 3000);
//         return () => clearInterval(interval);
//       }, [dispatch]);

    

//     useEffect(() => {
//         dispatch(getMessagesForRoom({ room_id: room }))
//         console.log('top')
//     }, [dispatch, room])

//     useInterval(async () => {
//         // console.log('useInterval is working');
//         const messagesList = await dispatch(checkForNewMessages({ room_id: room }))

//         // console.log(messages[0].id)
//         // console.log(newMessages[0].id)     // check what is the last message on messages first then if any new on newMessages add it to messages. 

//         const latestMessageUI = messages[messages.length - 1];
//         newMessages.forEach(element => {
//             console.log(element.id, latestMessageUI.id)
//             if (element.id > latestMessageUI.id) {
//                 console.log('bigger')
//                 dispatch(addNewMessageFromOtherUser(element))
//             } else {
//                 console.log('not bigger')
//             }
//         })

//     }, 5000)



//     const createMessageEvent = () => {
//         const accessToken = `Bearer ${localStorage.getItem('access')}`;
//         const messageInput = document.getElementById('messageInput').value;
//         const message = {
//             to_user: userReceivingMessage,
//             message_text: messageInput,
//             room_name: room,
//         }
//         dispatch(createMessage({ accessToken, message }))
//     }

//     return (
//         <div className="container emp-profile">
//             <div className="row">
//                 <div className="col" >
//                     {messages.map((message, index) => (
//                         <div key={index}>
//                             <Message message={message} userLoggedInID={userLoggedInID} />
//                         </div>
//                     ))}
//                 </div>

//                 <div className="row justify-content-center mt-4">
//                     <div className="col-md-12 col-lg-8">
//                         <div className="card-footer">
//                             <div className="input-group">
//                                 <div className="input-group-append">
//                                     <span className="input-group-text attach_btn"><i className="bi bi-paperclip"></i></span>
//                                 </div>

//                                 <textarea name="" className="form-control type_msg" placeholder="Type your message..." id='messageInput' />

//                                 <div className="input-group-append">
//                                     <span className="input-group-text send_btn" onClick={createMessageEvent}>
//                                         <i className="bi bi-send-fill"></i>
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// };