import './message.css';

// Message Component will render a message passed down
// as a prop also userLoggedInID used to render messages to
// right or left depenidng on if the message is from
// userLoggedIn or not. 
export const Message = ({ message, userLoggedInID }) => {

    return (
        <div className='container mt-5'>
            <div className='row'>
                {
                    userLoggedInID !== message.user_id ?
                        (
                            <div className="d-flex justify-content-start mb-4">
                                <div className="img_cont_msg">
                                    <img src={`http://localhost:8001${message.user_profile}`} className="rounded-circle user_img_msg" />
                                </div>
                                <div className="msg_cotainer">
                                    {message && message.message_text}
                                    <span className="msg_time-right">{new Date(message.sent_datetime).toLocaleString()}</span>
                                </div>
                            </div>
                        ) :
                        (
                            <div className="d-flex justify-content-end mb-4">
                                <div className="msg_cotainer">
                                    {message && message.message_text}
                                    <span className="msg_time-right">{new Date(message.sent_datetime).toLocaleString()}</span>
                                </div>
                                <div className="img_cont_msg">
                                    <img src={`http://localhost:8001${message.user_profile}`} className="rounded-circle user_img_msg" />
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
};

