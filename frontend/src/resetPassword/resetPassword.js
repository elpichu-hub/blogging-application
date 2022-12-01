import './resetPassword.css';
import { resetPassword } from '../users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const ResetPassword = () => {

    const dispatch = useDispatch();
    const navitate = useNavigate();
    const { userError } = useSelector(state => state.users);

    // user will enter their email associated with their
    // account if found this will send an email to user
    // can click and reset new password using djoser.
    // this will dispatch resetPassword which will
    // be a djoser endpoint then redirect to log in
    const resetPasswordClickEvent = async () => {
        const emailEnteredByUser = document.getElementById('email').value;
        const email = {
            'email': emailEnteredByUser,
        }
        const password = await dispatch(resetPassword(email));
        navitate('/login')
    };

    return (
        <div className="container resetPassword-container">
            <div className='row justify-content-center'>
                <div className="col-md-6 resetPassword-form">
                    <h3>Request Password Request</h3>
                    {userError && (<p style={{color: 'white'}}>{userError.email}</p>)}
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Enter Email Address" id='email' />
                    </div>
                    <div className="form-group">
                        <button className="btnSubmit" onClick={resetPasswordClickEvent}>Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ResetPassword;