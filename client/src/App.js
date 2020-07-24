import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import './themes/mixins.scss';
import './App.scss';
import './themes/variables.scss';
import './themes/card.scss';
import './themes/button.scss';
import './themes/form.scss';
import './themes/update-faq.scss';

import { createStructuredSelector } from 'reselect';
// import Header from './components/header/header.component';
import Home from './pages/home/home.component';
import SignIn from './pages/auth/signin.component';
import SignUp from './pages/auth/signup.component';
import ChangePassword from './pages/auth/changePassword.component';
import ForgetPassword from './pages/auth/forgetPassword.component';
import {
  selectCurrentUser,
  // selectSubscription,
  selectToken,
} from './redux/user/user.selector';
import {
  checkUserSession,
  signOutStart,
  // setMessage,
} from './redux/user/user.actions';
import Message from './components/message/message.component';
import Error404 from './pages/Error/error404.component';
import Alert from './components/message/alert.component';
import Confirmation from './pages/auth/confirmation.component';
import ResetPassword from './pages/auth/resetPassword.component';

const App = ({ checkUserSession, currentUser, token, location, history }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession, currentUser, token]);

  useEffect(() => {
    ReactGA.initialize('UA-104203925-4');
    if (location.pathname.match('/') === '/') {
      ReactGA.pageview('/');
    } else {
      history.listen((locations) => ReactGA.pageview(locations.pathname));
    }
  }, [history, location.pathname]);

  const headerExclusionArray = ['/confirmation/', '/reset-password/'];
  return (
    <div className="App">
      <Alert />
      <Message />
      <Switch>
        <Route exact path="/" component={SignUp} />

        {/* <Route
          exact
          path="/instagram/post-by-username"
          render={() =>
            !currentUser ? (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { error: "You need to Signin or Signup first" },
                }}
              />
            ) : !currentUser.is_subscribed ? (
              <Redirect
                to={{
                  pathname: "/pricing",
                  state: {
                    error:
                      "You have to make sure your email as being confirmed, and also subscribe to one of our paid package to have access to post-by-username",
                  },
                }}
              />
            ) : (
              <PostByUsername />
            )
          }
        /> */}
        {/* Post-by-hashtag */}

        <Route
          path="/signin"
          render={() => (currentUser ? <Redirect to="/profile" /> : <SignIn />)}
        />
        <Route
          path="/signup"
          render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
        />
        <Route
          path="/change-password"
          render={() =>
            currentUser && currentUser.is_email_confirm ? (
              <ChangePassword />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/forgot-password"
          render={() =>
            currentUser ? <Redirect to="/" /> : <ForgetPassword />
          }
        />
        <Route exact path="/confirmation/" component={Confirmation} />
        <Route exact path="/reset-password/" component={ResetPassword} />
        {/* add 404 page */}
        <Route path="*" component={Error404} />
        {/* <Footer /> */}
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  signOutStart: () => dispatch(signOutStart()),
  // setMessage: (message)=> dispatch(setMessage(message))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
