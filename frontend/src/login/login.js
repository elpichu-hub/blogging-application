import './login.css';
import { login, resetUserRequestNewPassword, removeResetPasswordSuccessState } from '../users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    setUserLoggedIn,
    setEmptyFieldsErrorForLogIn,
    removeNewUserState
} from '../users/userSlice';
import { clearPostErrors } from '../posts/postSlice';

const Login = () => {

    const {
        userLoggedIn, userError,
        newUser, userRequestNewPassword,
        resetPasswordError, resetPasswordSuccess
    } = useSelector(state => state.users)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // When the user is on the login page first:
    // clearPostErrors will remove any errors
    // from the posts slice since on posts.js
    // there is a useEffect with a conditional
    // where if a postError occurs it will 
    // navigate the user to logout page. 
    // if you don't clear the error here
    // then once you attempt to log in you might
    // get redirected again towards logout since
    // there could still be a postError state.
    // Second: if a user is logged in it will
    // redirect the user to ('/') home page. 
    useEffect(() => {
        dispatch(clearPostErrors())
        if (userLoggedIn) {
            navigate('/')
        }
        if (resetPasswordError) {
            navigate('/reset_password')
        }
    }, [userLoggedIn]);

    // this will gather the credentials entered to 
    // the log in form. if both fields are > 0
    // this will dispatch login() action from user slice
    // right after setUserLoggedIn will set the userLoggedIn state
    // if one of both credentails are not > 0 then
    // setEmptyFieldsErrorForLogIn will set an error
    // for the users slice. 
    // this will always remove a success sign up message
    // if there is one. using removeNewUserState()
    const logInEvent = async () => {
        const credentials = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };
        // eslint-disable-next-line
        if (credentials.username.length > 0 & credentials.password.length > 0) {
            const loginAction = await dispatch(login({ credentials }));
            dispatch(setUserLoggedIn(localStorage.getItem('user')))
        } else {
            dispatch(setEmptyFieldsErrorForLogIn({ detail: 'Please Provide Username & Password' }))
        }
        dispatch(removeNewUserState())
        dispatch(resetUserRequestNewPassword())
        dispatch(removeResetPasswordSuccessState())
    };

    // Will navigate to ('reset_password') where user
    // will enter email to get token to reset password
    const navigateToResetPasswordClick = () => {
        navigate('/reset_password')
    };

    return (
        <div className="container login-container">
            <div className='row justify-content-center'>
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    {
                        newUser &&
                        (
                            <h5 id='signUpSucess'>Account Successfully Created!</h5>
                        )
                    }
                    {
                        userError && (
                            <h5 id='errorForLogIn'>{userError.detail}</h5>
                        )
                    }
                    {
                        userRequestNewPassword && <p style={{ color: 'white' }}>
                            If the email you provided is in out database,
                            you will receive an email with instructions to
                            reset your password. </p>

                    }
                    {resetPasswordSuccess && <h5 id='passWordResetSuccess'>Your Password Has Being Reset Successfully!</h5>}
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your Username" id='username' />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Your Password" id='password' />
                    </div>
                    <div className="form-group">
                        <button className="btnSubmit" onClick={logInEvent} >log in</button>
                    </div>
                    <div className="form-group">
                        <p className="btnForgetPwd" onClick={navigateToResetPasswordClick}>Forget Password?</p>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Login;