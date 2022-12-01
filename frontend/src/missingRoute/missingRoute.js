import { Navigate } from "react-router-dom"


// this route will redirect if the user
// navigates to an unknown url. 
const MissingRoute = () => {
    return <Navigate to={{pathname: '/'}}/>
};


export default MissingRoute;