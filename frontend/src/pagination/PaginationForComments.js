// import Repeat from 'react-repeat-component';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCommentsByPost } from '../comments/commentsSlice';


// I added page pagination for posts and comments but
// i did not like it. Ended up using and infinite loading
// technique instead which will do pagination based on 
// an offset number. When user scroll to the buttom of the
// page the app will get fetch more post.  
// const PaginationForComments = ({ post }) => {

//     // posts will be the complete state returned by the pagination api 
//     // from django-rest. the object has: posts.count, next, previous,
//     // results. results will be the posts retrived already paginated.
//     // in settings.py in 'REST_FRAMEWORK' you can change the 
//     // posts in a page by changing PAGE_SIZE.
//     const comments = useSelector(state => state.comments.comments);
//     const dispatch = useDispatch();

//     // On the next buttom you will go to the next page
//     const nextPageEvent = () => {
//         const accessToken = `Bearer ${localStorage.getItem('access')}`;
//         const paginatedURL = comments.next;
//         console.log(paginatedURL)
//         dispatch(getCommentsByPost({ paginatedURL, accessToken }));
//     };

//     // On the previous buttom you will go to the previous page
//     const previousPageEvent = () => {
//         const accessToken = `Bearer ${localStorage.getItem('access')}`;
//         const paginatedURL = comments.previous;
//         dispatch(getCommentsByPost({ paginatedURL, accessToken }));
//     };

//     // You can select the page you want to go to.
//     const choosePageEvent = (pageNumber) => {
//         const accessToken = `Bearer ${localStorage.getItem('access')}`;
//         const paginatedURL = `http://localhost:8000/getCommentsByPost/${post.id}?page=${pageNumber}`;
//         dispatch(getCommentsByPost({ paginatedURL, accessToken }));
//     };

//     const chooseLastPage = () => {
//         const accessToken = `Bearer ${localStorage.getItem('access')}`;
//         const paginatedURL = `http://localhost:8000/getCommentsByPost/${post.id}?page=${Math.ceil(comments.count / 2)}`;
//         dispatch(getCommentsByPost({ paginatedURL, accessToken }));
//     };

//     return (
//         <div className="container py-5" >
//             <nav aria-label="posts results">
//                 <ul className="pagination justify-content-center">
//                     {/* if posts.previous is null then the button will appear disabled */}
//                     <li className={comments.previous === null ? "page-item disabled" : 'page-item'}>
//                         <button className="page-link" onClick={previousPageEvent}>Previous</button>
//                     </li>
                    

//                     {/* if posts.next is null then the button will appear disabled */}
//                     <li className={comments.next ? "page-item" : "page-item disabled"}>
//                         <button className="page-link" onClick={nextPageEvent}>Next</button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     )
// };


// export default PaginationForComments;