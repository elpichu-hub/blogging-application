import './header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../users/userSlice';
import { setUserLoggedIn } from '../users/userSlice';
import { filterPosts } from '../posts/postSlice';

const Header = () => {

    const { userLoggedIn } = useSelector(state => state.users);
    const dispatch = useDispatch();

    // When you click to log out this will
    // delete all from localStorage and
    // remmove the userLoggedIn State
    const logOutEvent = () => {
        dispatch(logout())
        dispatch(setUserLoggedIn(null))
    };

    const getFilteredPostsEvent = () => {
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        const data = document.getElementById('searchInputField').value;
        dispatch(filterPosts({accessToken, data}));
    };

    return (
        <header className="p-3 bg-dark text-white" id='header'>
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                    </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <Link to='/'>
                            <li className="nav-link px-2 text-white">Home</li>
                        </Link>
                        <Link to='/profile'>
                            <li className="nav-link px-2 text-white">Profile</li>
                        </Link>
                        <li className="nav-link px-2 text-white">FAQs</li>
                        <li className="nav-link px-2 text-white">About</li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" className="form-control form-control-dark" 
                        placeholder="Search..." aria-label="Search"
                         id='searchInputField' onChange={getFilteredPostsEvent} />
                    </form>

                    <div className="text-end">
                        {
                            userLoggedIn ? (
                                <Link to='/logout'>
                                    <button className='btn' clasonClick={() => logOutEvent()} id='logoutButton'>Logout</button>
                                </Link>
                            ) : (
                                <Link to='/login'>
                                    <button className='btn' id='loginButton'>Login</button>
                                </Link>
                            )
                        }
                        <Link to='/signup'>
                            <button type="button" className="btn btn-warning" id='signupButton'>Sign-up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;