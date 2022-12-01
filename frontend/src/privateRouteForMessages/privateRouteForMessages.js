import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { setUserLoggedIn } from "../users/userSlice";
import { useDispatch, useSelector } from "react-redux";


// I created this Private route to redirect users
// to login page when there is not userLoggedIn,
// room or userReceivingMessage state. This is 
// to avoid getting a blank chat room. If one of those
// three are false. This route will redirect to login
// if user is logged in then it will redirect to
// body. children is the Route passed to PrivateRouteForMessages
// in App.js
const PrivateRouteForMessages = ({ children }) => {

    const dispatch = useDispatch()
    const {
        room, userLoggedIn,
        userReceivingMessage,
    } = useSelector((state) => state.users)

    // When the user Visits this route this useEffect
    // will make sure there is a userLoggedIn by 
    // setting the state userLoggedIn.
    // if the value is null  then it will redirect.
    useEffect(() => {
        dispatch(setUserLoggedIn(localStorage.getItem('user')))
    }, [dispatch])


    return userLoggedIn && room && userReceivingMessage ? children : <Navigate to='/login' />
};


export default PrivateRouteForMessages;