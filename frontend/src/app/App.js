import './App.css';
import Header from '../header/header';
import Body from '../body/body';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from '../profile/profile';
import Login from '../login/login';
import Logout from '../logout/logout';
import PrivateRoute from '../privateRoute/privateRoute';
import { MessagesChannels } from '../messages/messagesChannels';
import PrivateRouteForMessages from '../privateRouteForMessages/privateRouteForMessages';
import { useDispatch } from 'react-redux';
import { refreshToken, setUserLoggedIn } from '../users/userSlice';
import { useEffect } from 'react';
import MissingRoute from '../missingRoute/missingRoute';
import { SignUp } from '../signUp/signUp';
import ResetPassword from '../resetPassword/resetPassword';
import ResetPasswordConfirm from '../resetPasswordConfirm/resetPasswordConfirm';

function App() {

  const dispatch = useDispatch();

  // everytime the user visits the page or refreshes it
  // the ACCESS_TOKEN_LIFETIME will be reset to 10 days.
  // if the user does not visits the page in 10 days
  // the session ends. Everytime the app runs this will
  // also set the userLoggedIn.
  useEffect(() => {
    const token = localStorage.getItem('refresh')
    dispatch(refreshToken({ refresh: token }));
    dispatch(setUserLoggedIn(localStorage.getItem('user')))

  }, [])

  return (
    <div className="App" id='App'>
      <BrowserRouter>
        <Header />
        <Routes >

          <Route path='/' element={
            <PrivateRoute>
              <Body />
            </PrivateRoute>
          } />

          <Route path='/chat' element={
            <PrivateRouteForMessages>
              <MessagesChannels />
            </PrivateRouteForMessages>
          } />

          <Route path='/profile' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />

          {/* Route leading to MissingRoute will redirect
          users who go to an invalid address back to Missing
          Route Component */}
          <Route path='*' element={<MissingRoute />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/reset_password' element={<ResetPassword />} />
          <Route path='password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
