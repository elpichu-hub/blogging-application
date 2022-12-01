import { useSelector, useDispatch } from 'react-redux';
import './profile.css';
import { updateUser, retrieveUser } from '../users/userSlice';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import {
    updateProfile, updateProfileImage,
    UserRetrieveByEmailAPIView, removeEmailExistsMessage
} from './profileSlice';
import { getProfileForUserLoggedIn } from './profileSlice';
import { useRef } from 'react';
import { ProfileUpdater } from '../profileUpdater/profileUpdater';
import { ErrorPopup } from '../errorPopup/errorPopup';
import { ProfileButtons } from '../profileButtons/profileButtons';



const Profile = () => {

    const dispatch = useDispatch();
    const [profileEdit, setProfileEdit] = useState(false)
    const { userLoggedInDecoded, userError } = useSelector(state => state.users)
    const { error, profile, emailExists } = useSelector(state => state.profiles)
    const userDecoded = useRef(null)
    console.log(profile)

    // Had to put userDecoded inside a useRef because
    // of error boundary errors. The app would not redirect
    // because of that error. use Try catch to catch any
    // possible errors here. 
    useEffect(() => {
        dispatch(removeEmailExistsMessage())
        try {
            userDecoded.current = jwtDecode(localStorage.getItem('access'));
            const accessToken = `Bearer ${localStorage.getItem('access')}`;
            const userID = userDecoded.current.user_id
            const userLoggedInID = userDecoded.current.user_id
            dispatch(retrieveUser({ userID, accessToken }))
            dispatch(getProfileForUserLoggedIn({ userLoggedInID, accessToken }))
        } catch (error) {
            console.error(error)
        }

    }, [dispatch])

    // This will update the image for profile. will send the image over
    // using FormData() 
    const updateProfileImageClick = (e) => {
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        let profileID = userDecoded.current.profile_id;
        console.log(userDecoded.current)
        const newProfileImage = e.target.files[0];
        const formData = new FormData();
        formData.append('image', newProfileImage);
        dispatch(updateProfileImage({ profileID, accessToken, formData }));
    }

    // Lets fix this next!!!!!!! I don't like it. 
    const showUpdateProfileFormClickEvent = () => {
        setProfileEdit(!profileEdit)
    }

    const updateProfileEvent = async () => {
        let first_name = document.getElementById('first_name').value;
        let last_name = document.getElementById('last_name').value;
        let email = document.getElementById('email').value;
        let phone_number = document.getElementById('phone_number').value;
        let profession = document.getElementById('profession').value;
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        let profileID = userDecoded.current.profile_id;
        let userID = userDecoded.current.user_id
        const newProfileData = {
            profession: profession,
            phone_number: phone_number
        };
        const newUserData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
        };
        // Check if  the email is already in use if in use though message 
        // advising the email is being used already.
        // CONTINUE HERE
        const checkEmail = await dispatch(UserRetrieveByEmailAPIView({ email, accessToken }))
        if (checkEmail.payload.count < 1) {
            const updatingUser = await dispatch(updateUser({ userID, accessToken, newUserData }))
        } else {
            delete newUserData.email;
            const updatingUser = await dispatch(updateUser({ userID, accessToken, newUserData }))
        }
        const updatingProfile = await dispatch(updateProfile({ profileID, accessToken, newProfileData }));
        setProfileEdit(!profileEdit);
    };

    return (
        userLoggedInDecoded.id && (
            <div className="container emp-profile">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src={profile.image} alt="" />
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" onChange={(e) => updateProfileImageClick(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5 style={{ color: '#FFF9FB' }}>
                                {userLoggedInDecoded.username} {userLoggedInDecoded.last_name}

                            </h5>
                            <h6 style={{ color: '#FFF9FB' }}>
                                {userLoggedInDecoded.profession}
                            </h6>
                        </div>
                    </div>
                    <div className="col-md-2 my-3">
                        <i className="bi bi-pencil-square" style={{ fontSize: '2.0rem', color: '#6CA6C1' }} onClick={showUpdateProfileFormClickEvent}></i>
                    </div>
                </div>

                {error && <ErrorPopup error={error} />}

                {userError && <ErrorPopup error={userError} />}


                {/* {emailExists && <ErrorPopup error={{ error: 'Email Already Exists. Please Try Again!' }} />} */}

                <ProfileUpdater profileEdit={profileEdit} userLoggedInDecoded={userLoggedInDecoded} />

                {
                    profileEdit &&
                    <ProfileButtons
                        profileEdit={profileEdit}
                        setProfileEdit={setProfileEdit}
                        updateProfileEvent={updateProfileEvent} />
                }
            </div>
        )
    )
};


export default Profile;