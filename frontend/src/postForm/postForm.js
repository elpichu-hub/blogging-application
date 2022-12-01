import { createPost } from "../posts/postSlice";
import { useDispatch } from "react-redux";


const PostForm = () => {

    const dispatch = useDispatch()

    // on click this will gather the post content typed into newPost 
    // then call createPost from postSlice to create a new post. 
    // clear newPost and focus on it, scroll to top of page.
    const createPostOnClickEvent = async () => {
        const postContent = { content: document.getElementById('newPost').value };
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        dispatch(createPost({ postContent, accessToken }));
        document.getElementById('newPost').value = '';
        document.getElementById('newPost').focus();
        window.scrollTo(0, 0)
    };

    return (
        <div className="col-md-6 mb-4">
            <div className="h-100 p-5 bg-light border rounded-3">
                <div className="form-floating" >
                    <textarea className="form-control" placeholder="Leave a comment here" id="newPost" style={{ height: 130 }}></textarea>
                    <label htmlFor="floatingTextarea">Type Your New Post</label>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={createPostOnClickEvent}>Create Post</button>
                </div>
            </div>
        </div>
    )
};


export default PostForm;