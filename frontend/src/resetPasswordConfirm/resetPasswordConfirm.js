import './resetPasswordConfirm.css';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordConfirm } from '../users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export const ResetPasswordConfirm = () => {

    const { uid, token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { resetPasswordError, resetPasswordSuccess } = useSelector(state => state.users)

    const resetPasswordClickEvent = () => {
        const objectForNewPassword = {
            'uid': uid,
            'token': token,
            'new_password': document.getElementById('new_password').value,
        }
        dispatch(resetPasswordConfirm({ objectForNewPassword }));
    };

    
    useEffect(() => {
        if (resetPasswordError) {
            console.log(resetPasswordError)
        }
        console.log(resetPasswordSuccess)
        if (resetPasswordSuccess) {
            navigate('/login')
        }
    }, [resetPasswordError, resetPasswordSuccess])

    return (
        <div className="container resetPasswordConfirm-container">
            <div className='row justify-content-center'>
                <div className="col-md-6 resetPasswordConfirm-form">
                    <h3>Password Reset</h3>
                    {resetPasswordError && <p style={{color: 'white'}}>{resetPasswordError.new_password[0]}</p>}
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Enter New Password" id='new_password' />
                    </div>
                    <div className="form-group">
                        <button className="btnSubmit" onClick={resetPasswordClickEvent} >Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default ResetPasswordConfirm;