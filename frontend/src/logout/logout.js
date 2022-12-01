import './logout.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, setUserLoggedIn } from "../users/userSlice";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // when user is logged out first:
    // setuserLoggedIn will remove the user
    // from usersSlice state so that the logout/login
    // button can change since the rendering
    // depends on if there is a user signed in.
    // Second logout will be called an remove
    // the jwt tokens from localStorage.
    useEffect(() => {
        dispatch(setUserLoggedIn(null))
        dispatch(logout())
    }, [dispatch])

    // onclick will take you to login page.
    const navigateToLogInClick = () => {
        navigate('/login')
    };

    return (
        <div className="container logout-container">
            <div className='row justify-content-center'>
                <div className="col-md-6">
                    <h3>Logged Out</h3>
                    <p>Thank you for visiting us.</p>
                    <button type="button" className="btn btn-info" id='signinAgainButton' onClick={navigateToLogInClick}>Sign in Again</button>
                </div>
            </div>
        </div>
    )
};

export default Logout;