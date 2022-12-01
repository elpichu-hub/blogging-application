import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { setUserLoggedIn } from "../users/userSlice";
import { useDispatch, useSelector } from "react-redux";


// Private route will make sure the user is Logged In.
// if not user then redirects to login page.
const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch()
    const { userLoggedIn } = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(setUserLoggedIn(localStorage.getItem('user')))
    }, [dispatch])

    return userLoggedIn ? children : <Navigate to='/login' />
};

export default PrivateRoute;