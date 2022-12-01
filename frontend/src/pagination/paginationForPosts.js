// import { useDispatch, useSelector } from 'react-redux';
// import { getPosts } from '../posts/postSlice';
// import { useEffect } from 'react';
// import { setPage } from '../posts/postSlice';


// I added page pagination for posts and comments but
// i did not like it. Ended up using and infinite loading
// technique instead which will do pagination based on 
// an offset number. When user scroll to the buttom of the
// page the app will get fetch more post.  
// const PaginationForPosts = () => {

//     // posts will be the complete state returned by the pagination api 
//     // from django-rest. the object has: posts.count, next, previous,
//     // results. results will be the posts retrived already paginated.
//     // in settings.py in 'REST_FRAMEWORK' you can change the 
//     // posts in a page by changing PAGE_SIZE.
//     const posts = useSelector(state => state.posts.posts);
//     const {postToBeCommented} = useSelector(state => state.comments);
//     const dispatch = useDispatch();

//     // On the next buttom you will go to the next page
//     const nextPageEvent = () => {
//         const accessToken = `Bearer ${localStorage.getItem('access')}`;
//         const paginatedUrl = posts.next;
//         dispatch(setPage(Number(posts.next.split('=')[1])))
//         dispatch(getPosts({ paginatedUrl, accessToken }));
//     };

//     // On the previous buttom you will go to the previous page
//     const previousPageEvent = () => {
//         const accessToken = `Bearer ${localStorage.getItem('access')}`;
//         const paginatedUrl = posts.previous;
//         dispatch(setPage(Number(posts.previous.split('=')[1])))
//         dispatch(getPosts({ paginatedUrl, accessToken }));
//     };

//     // You can select the page you want to go to.
//     const choosePageEvent = (pageNumber) => {
//         const accessToken = `Bearer ${localStorage.getItem('access')}`;
//         const paginatedUrl = `http://localhost:8000/getPosts?page=${pageNumber}`;
//         dispatch(setPage(pageNumber))
//         dispatch(getPosts({ paginatedUrl, accessToken }));
//     };

//     const chooseLastPage = () => {
//         const accessToken = `Bearer ${localStorage.getItem('access')}`;
//         const paginatedUrl = `http://localhost:8000/getPosts?page=${Math.ceil(posts.count / 2)}`;
//         dispatch(setPage(Math.ceil(posts.count / 2)))
//         dispatch(getPosts({ paginatedUrl, accessToken }));
//     };

//     return (
//         <div className="container py-5" >
//             <nav aria-label="posts results">
//                 <ul className="pagination justify-content-center">
//                     {/* if posts.previous is null then the button will appear disabled */}
//                     <li className={posts.previous === null ? "page-item disabled" : 'page-item'}>
//                         <button className="page-link" onClick={previousPageEvent}>Previous</button>
//                     </li>
                    

//                     <li className="page-item">
//                         <button className="page-link" onClick={() => choosePageEvent(1)} >
//                             1
//                         </button>
//                     </li>

//                     <li className="page-item">
//                         <button className="page-link" onClick={() => choosePageEvent(2)} >
//                             2
//                         </button>
//                     </li>

//                     <li className="page-item">
//                         <button className="page-link" onClick={() => choosePageEvent(3)} >
//                             3
//                         </button>
//                     </li>

//                     <li className="page-item" onClick={chooseLastPage}>
//                         <button className="page-link" >
//                             ...
//                         </button>
//                     </li>



//                     {/* if posts.next is null then the button will appear disabled */}
//                     <li className={posts.next ? "page-item" : "page-item disabled"}>
//                         <button className="page-link" onClick={nextPageEvent}>Next</button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     )
// };


// export default PaginationForPosts;