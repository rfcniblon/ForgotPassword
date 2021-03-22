import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import UpdateProfile from './UpdateProfile/UpdateProfile';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ResetPassword from './ResetPassword/ResetPassword';
import UpdatePassword from './UpdatePassword/UpdatePassword';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/reset/:token" component={ResetPassword} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route exact path="/userProfile/:username" component={Profile} />
      <Route exact path="/updateUser/:username" component={UpdateProfile} />
      <Route
        exact
        path="/updatePassword/:username"
        component={UpdatePassword}
      />
    </Switch>
  </div>
);

export default Routes;
