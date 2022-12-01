import './comments.css';
import CommentsForm from '../commentsForm/commentsForm';
import { useSelector } from 'react-redux';


const Comments = ({ post }) => {

    const { comments } = useSelector(state => state.comments);

    return (
        <div>
            <CommentsForm post={post} />
            {comments.results && (
                comments.results.map((comment, index) => (
                    <div className='container ' key={index}>
                        <div className='row justify-content-center'>
                            <div className="col-10" style={{padding: 0}}>
                                <div className="card shadow-sm mb-2 " id='commentBody'>
                                    <div className="card-body">
                                        <img className='bd-placeholder-img rounded-circle'
                                            src={`http://localhost:8001${comment.profile_image}`} height='80' width='80' alt='Profile_image'
                                            style={{ cursor: 'pointer' }} />
                                        <p className="card-text">{comment.body}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted">{new Date(comment.created_on).toLocaleString()}</small>
                                        </div>
                                    </div>
                                </div >
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* <PaginationForComments post={post} /> */}

        </div>
    )
};


export default Comments;