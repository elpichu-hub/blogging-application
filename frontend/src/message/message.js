import './message.css';

// The Message Component will render a message that is passed down as a prop. 
// The userLoggedInID prop is used to determine the alignment of the message, 
// with messages from the logged-in user being displayed on the right and 
// other messages being displayed on the left.
export const Message = ({ message, userLoggedInID }) => {

    return (
        <div className='container mt-5'>
            <div className='row'>
                {
                    userLoggedInID !== message.user_id ?
                        (
                            <div className="d-flex justify-content-start mb-4">
                                <div className="img_cont_msg">
                                    <img src={`${message.user_profile}`} className="rounded-circle user_img_msg" />
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
                                    <img src={`${message.user_profile}`} className="rounded-circle user_img_msg" />
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
};

