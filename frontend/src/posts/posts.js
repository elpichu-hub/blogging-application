import './posts.css';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../post/post';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Posts = () => {

    const { posts, postError } = useSelector(state => state.posts);
    const navigate = useNavigate()

    // if there is a post error from postSlice this 
    // useEffect will take the user to '/logout'.
    // this will happen if there is issesu with auth
    // or the server. 
    useEffect(() => {
        if (postError) {
            navigate('/logout')
        }
    }, [postError])


    return (
        <div className="mb-4 bg-light rounded-3" id='postsContainer'>
            <div className="container-fluid py-5">
                <div className='row justify-content-center'>
                    {
                        posts.length > 0 &&
                        <div className="col-sm-10 col-md-8 col-lg-8 col-xl-8">
                            {posts.map((post, index) => (
                                <Post post={post} key={index} />
                            ))}
                        </div>
                    }
                    {/* <PaginationForPosts /> */}
                </div>
            </div>
        </div>
    )
};


export default Posts;