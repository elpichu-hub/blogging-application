import './body.css';
import Posts from "../posts/posts";
import Users from "../users/userSuggestions";
import PostForm from "../postForm/postForm";
import { useDispatch } from "react-redux";
import { clearPosts, getPosts } from "../posts/postSlice";
import { useEffect, useRef } from "react";
import endPoint from '../httpEndPoint';


const Body = () => {

    const dispatch = useDispatch()

    // offset is used for pagination of posts. it's
    // the starting position for the next set of 
    // results.
    let offset = useRef(0)

    // At the start of the application once logged in this will
    // get the first 5 posts and render them. you can change the number
    // of posts by changing the page size in settings.py
    //  The offset indicates the starting position of the query in
    // relation to the complete set of unpaginated items.
    const onLoad = async () => {
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        const paginatedUrl = `${endPoint.url}/getPosts?offset=${offset.current}`;
        // eslint-disable-next-line
        const posts = await dispatch(getPosts({ paginatedUrl, accessToken }));
    };

    // once the user scrolls all the way to the button of the page
    // this will call onload() to add more posts to show then
    // increase offset by 5
    const scrollEventForInfinateLoading = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight) {
            onLoad()
            console.log('on load 1 ran')
            offset.current += 5;
        };
    };
    
    // This will scroll all the way to the top of 
    // the page when a user visits ('/') then
    // call onLoad() to get the initial posts
    // increases offset by 5
    useEffect(() => {
        window.scrollTo(0, 0)
        onLoad()
        console.log(' on load 2 mounted')
        offset.current += 5;
    }, [])

    // event listener inside the useEffect without a depency array
    // in order to listen to every change in scroll event
    // everytime the user scrolls scrollEventForInfinateLoading will 
    // run checking if the scroll bar is at the bottom of the page
    // that being the case it will load more posts. In this useEffect
    // I use the return function to remove side effects for 
    // scrollEventForInfinateLoading. If you don't remove the side
    // effects the function will load multiple times at the same
    useEffect(() => {
        // document.body.scrollTop = document.documentElement.scrollTop = 0;
        window.addEventListener('scroll', scrollEventForInfinateLoading)
        return () => {
            window.removeEventListener('scroll', scrollEventForInfinateLoading)
            dispatch(clearPosts())
        }
    }, [])

    return (
        <div className="container py-4">
            <div className="row align-items-md-stretch" >
                <Users />
                <PostForm />
            </div>
            <Posts />
        </div>
    )
};


export default Body;

