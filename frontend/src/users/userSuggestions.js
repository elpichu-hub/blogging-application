import { getAllUsers } from './userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { createRoom, setUserReceivingMessage } from './userSlice';
import { useRef } from 'react';

const UserSuggestions = () => {

    const { userSuggestions, userLoggedIn } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userLoggedInDecoded = useRef(null)

    // Had to pust userLoggedInDecoded inside a useRef because
    // of error boundary errors. The app would not redirect
    // because of that error.
    useEffect(() => {
        try {
            userLoggedInDecoded.current = jwtDecode(localStorage.getItem('access'));
        } catch (error) {
            console.error(error.message)
        }
        const accessToken = `Bearer ${localStorage.getItem('access')}`;
        dispatch(getAllUsers(accessToken))
    }, [dispatch])

    // This will get two parameters the userLoggedIn and
    // the userReceivingMessage, will arrange them so that
    // they result is always the same number combination
    // the smallerID_biggerID. after creating the room
    // this will redirect to ('/chat/')
    const roomCreator = (fromUser, toUser) => {
        dispatch(setUserReceivingMessage(toUser));
        if (Number(fromUser) > Number(toUser)) {
            const new_room = `${toUser}_${fromUser}`
            dispatch(createRoom(new_room))
        } else {
            const new_room = `${fromUser}_${toUser}`
            dispatch(createRoom(new_room))
        }
        navigate(`/chat/`)
    }

    return (
        <div className="col-md-6 mb-4">
            <div className="h-100 pe-2 ps-2 bg-light border rounded-3">
                <div className="my-3 p-3 bg-body rounded shadow-sm">
                    <h6 className="border-bottom pb-2 mb-0">Suggestions</h6>
                    {
                        userSuggestions && (
                            userSuggestions.map((user, index) => (
                                user.username !== jwtDecode(userLoggedIn).username && (
                                    <div className="d-flex text-muted pt-3" key={index} onClick={() => roomCreator(userLoggedInDecoded.current.user_id, user.id)}>
                                        <img className='bd-placeholder-img rounded-circle'
                                            src={`http://localhost:8001${user.profile_image}`}
                                            height='40' width='40' alt='logo'
                                            style={{ cursor: 'pointer', marginRight: 7 }} />

                                        <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                                            <div className="d-flex justify-content-between">
                                                <strong className="text-gray-dark">{user.username}</strong>
                                                <p>Follow</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                        )
                    }
                    <small className="d-block text-end mt-3">
                        <p>All suggestions</p>
                    </small>
                </div>
            </div>
        </div>
    )
};


export default UserSuggestions;