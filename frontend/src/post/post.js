import './post.css';
import { likePost, dislikePost } from '../posts/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import Comments from '../comments/comments';
import { setPostToBeCommented } from '../comments/commentsSlice';
import { getCommentsByPost } from '../comments/commentsSlice';


const Post = ({ post }) => {

    const { postToBeCommented } = useSelector(state => state.comments);
    const { userLoggedIn } = useSelector(state => state.users);
    const dispatch = useDispatch()
    const userLoggedInID = jwt_decode(userLoggedIn).user_id;

    // this will like a post when you click on heart
    // if the user disliked disliked the post it 
    // will remove the dislike and add the like
    const likePostClickEvent = async (post, userLoggedInID) => {
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        const response = await dispatch(likePost({ post, userLoggedInID, accessToken }));
        if (post.dislikes.includes(userLoggedInID)) {
            dispatch(dislikePost({ post, userLoggedInID, accessToken }));
        };
    };

    // this will dislike a post when you click on heart
    // if the user disliked disliked the post it 
    // will remove the like and add the dislike
    const dislikePostClickEvent = async (post, userLoggedInID) => {
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        const response = await dispatch(dislikePost({ post, userLoggedInID, accessToken }));
        if (post.likes.includes(userLoggedInID)) {
            dispatch(likePost({ post, userLoggedInID, accessToken }));
        };
    };

    // when clicking on the commends this will open the reply section
    // the input for the comment and the comments for the post clicked on
    // setPostToBeCommented() will make sure that only the post clicked
    // on shows the reply sections by using the conditional
    // postToBeCommented === post.id && <Comments post={post} />
    // if the post to be commeted is the same id as the post clicked on
    // then show reply section. 
    // getCommentsByPost will get the comments for a specific post. 
    const showCommentsAndReplyFormClickEvent = (post) => {
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        const paginatedURL = `http://localhost:8001/getCommentsByPost/${post.id}`
        dispatch(setPostToBeCommented(post));
        dispatch(getCommentsByPost({ paginatedURL, accessToken }));
    };

    return (
        <div>
            <div className="card shadow-sm mb-2 w-100" id='postContainer'>
                <div className="card-body">

                    <img className='bd-placeholder-img rounded-circle'
                        src={`http://localhost:8001${post.profile_image}`} height='80' width='80' alt='Profile_image'
                        style={{ cursor: 'pointer' }} />

                    <p className="card-text">{post.content}</p>

                    <div className="d-flex justify-content-between align-items-center">

                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary"
                                style={post.likes.includes(userLoggedInID) ? { backgroundColor: '#70EE9C' } : { backgroundColor: '' }}
                                onClick={() => likePostClickEvent(post, userLoggedInID)}>
                                <i className="bi bi-heart-fill me-1" style={{ color: '#D11149' }}></i>
                                <span id='likeNumber'>{post.likes.length}</span>
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-secondary"
                                style={post.dislikes.includes(userLoggedInID) ? { backgroundColor: '#9E2A2B' } : { backgroundColor: '' }}
                                onClick={() => dislikePostClickEvent(post, userLoggedInID)}>
                                <i className="bi bi-heartbreak-fill me-1" style={{ color: '#212529' }}></i>
                                <span id='dislikeNumber'>{post.dislikes.length}</span>
                            </button>

                            <button type="button" className="btn btn-sm btn-outline-secondary"
                                onClick={() => showCommentsAndReplyFormClickEvent(post)}>
                                <i className="bi bi-chat-left-dots-fill me-1" style={{ color: '#212529' }}></i>
                                <span id='dislikeNumber'>{post.comments.length}</span>
                            </button>

                        </div>

                        <small className="text-muted">{new Date(post.posted_date).toLocaleString()}</small>

                    </div>
                </div>

                {postToBeCommented === post.id && <Comments post={post} />}

            </div >
        </div>
    )
};


export default Post