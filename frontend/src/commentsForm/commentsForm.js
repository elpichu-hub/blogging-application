import './commentsForm.css';
import { createComment } from "../comments/commentsSlice";
import { useDispatch } from "react-redux";
import jwt_decode from 'jwt-decode';


const CommentsForm = ({ post }) => {

    const dispatch = useDispatch();
    
    // This will create a new comment, then clear the reply input
    // then focus back on it. 
    // I could put accessToken & 
    // userLoggedInID in usersSlice that will allow me to 
    // have more readable code.  
    const createCommentClickEvent = async () => {
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        const userLoggedInID = jwt_decode(localStorage.getItem('access')).user_id;
        const newComment = {
            body: document.getElementById('reply').value,
            post: post.id,
            author: userLoggedInID,
        };
        const newCommentAction = await dispatch(createComment({ accessToken, newComment }));
        document.getElementById('reply').value = '';
        document.getElementById('reply').focus();
    };

    return (
        <div className="row justify-content-center">
            <div className="col-10 mb-2">
                <div className="h-100 p-5 bg-light border rounded-3">
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="reply" style={{ height: 110 }}></textarea>
                        <label htmlFor="floatingTextarea">Type Your Reply</label>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={createCommentClickEvent}>Reply</button>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default CommentsForm;