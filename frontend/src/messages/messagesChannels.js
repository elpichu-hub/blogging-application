import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Message } from "../message/message";
import jwtDecode from "jwt-decode";
import { useRef } from "react";
import { setMessages, setNewMessage } from "./messagesSlice";
import endPoint from "../httpEndPoint";

export const MessagesChannels = () => {

    const { messages } = useSelector((state) => state.messages)
    const { userReceivingMessage, userLoggedIn, room } = useSelector((state) => state.users)

    // chatSocket will be inside a useRef because
    // when used with useState the rest of the component
    // would not be able to see the chatSocket outside
    // the useEffect. 
    const chatSocket = useRef(null)
    const userLoggedInID = jwtDecode(userLoggedIn).user_id;
    const dispatch = useDispatch()

    // This useEffect hook will create a new websocket
    // the websocket will create a path using
    // a room number based on users in the chat IDs:
    // userLoggedInID, userReceivingMessage.
    useEffect(() => {
        chatSocket.current = new WebSocket(
            'wss://' 
            + 'blogging-applications.herokuapp.com'
            + '/ws/chat/'
            + room
            + '/'
            + userLoggedInID
            + '/'
            + userReceivingMessage
        )

        // chatSocket.current.onopen = function (e) {
        //     console.log('opened')
        // }

        // when the websocket gets a new message from server
        // it will user either user setNewMessage if a command is sent
        // with the date of 'new_message' to set a new message to the 
        // client or if the command is not 'new_message' then 
        // setMessages will set all the messages to show in the ui
        chatSocket.current.onmessage = function (e) {
            const data = JSON.parse(e.data);
            // handle incoming message
            if (data.command === 'new_message') {
                dispatch(setNewMessage(data['message']))
            } else {
                dispatch(setMessages(data['messages']))
            }
        };

        chatSocket.current.onclose = function (e) {
            console.error('Chat socket closed');
            // chatSocket.current = new WebSocket(
            //     'ws://'
            //     + 'blogging-applications.herokuapp.com'
            //     + '/ws/chat/'
            //     + room
            //     + '/'
            //     + userLoggedInID
            //     + '/'
            //     + userReceivingMessage
            //   );
        };

        // everytime useEffect runs this functions
        // will clear the side effect to avoid having
        // more than one chatSocket instance running.
        return () => {
            chatSocket.current.close()
        }
    }, []);

    // this will get the message typed and chekc if it is > than 0 
    // in length if so it will sen the message to the server. 
    const sendNewMessage = () => {
        const newMessage = document.getElementById('messageInput').value;
        if (newMessage.length > 0) {
            chatSocket.current.send(JSON.stringify({ 'message': newMessage }))
        };
    };

    // this will make sure to scroll to the buttom of the page everytime you
    // add new text to keep the view in the message input box and more
    // recent texts.
    useEffect(() => {
        const messageInput = document.getElementById('messageInput')
        messageInput.scrollIntoView()
    }, [messages]);

    return (
        <div className="container emp-messages" id='emp-messages'>
            <div className="row messages-container">
                <div className="col">
                    {messages && messages.map((message, index) => (
                        <div key={index}>
                            <Message message={message} userLoggedInID={userLoggedInID} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="row justify-content-center mt-4">
                <div className="col-md-12 col-lg-8">
                    <div className="card-footer">
                        <div className="input-group ">
                            <div className="input-group-append">
                                <span className="input-group-text attach_btn"><i className="bi bi-paperclip"></i></span>
                            </div>

                            <textarea name="" className="form-control type_msg" placeholder="Type your message..." id='messageInput' />

                            <div className="input-group-append" onClick={sendNewMessage}>
                                <span className="input-group-text send_btn" >
                                    <i className="bi bi-send-fill" ></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};