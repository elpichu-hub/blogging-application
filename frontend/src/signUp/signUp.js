import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './signUp.css';
import { logout, signUp, setUserLoggedIn } from "../users/userSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";


export const SignUp = () => {

    const { userError, newUser } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // when first rendered the signup components this
    // will log out whatever user is logged in
    // and remove the userLoggedIn state. 
    useEffect(() => {
        dispatch(logout())
        dispatch(setUserLoggedIn(null))
        if (newUser) {
            navigate('/login')
        }
    }, [newUser])


    // on click this will collected credentials entered
    // by the user and dispatch signUp which will be received
    // by UserCreateAPIView which will hash the password
    // to store it in the database. 
    const signUpEvent = () => {
        const newCredentials = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        console.log(newCredentials)
        dispatch(signUp({ accessToken, newCredentials }))
    };

    return (
        <div className="container signup-container">
            <div className='row justify-content-center'>
                <div className="col-md-6 signup-form-1">
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Username" id='username' />
                    </div>
                    {
                        userError.username && (
                            <h6 id='errorForSignup'>{userError.username}</h6>
                        )
                    }

                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Your Password" id='password' />
                    </div>
                    {
                        userError.password && (
                            <h6 id='errorForSignup'>{userError.password}</h6>
                        )
                    }

                    <div className="form-group">
                        <button className="btnSubmit" onClick={signUpEvent} >Sign up</button>
                    </div>
                    <div className="form-group">
                        <p className="haveAnAccount">
                            Have an Account? 
                            <Link to='/login'>
                                <span id='signOn'>Sign On!</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};