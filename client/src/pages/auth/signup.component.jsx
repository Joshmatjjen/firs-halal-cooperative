import React, { useState, useEffect, useCallback } from 'react';
import SEO from '../../components/seo/seo.component';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import {
  selectError,
  selectSuccess,
  selectIsLoading
} from '../../redux/user/user.selector';
import './signin-signup.styles.scss';
import AuthSideNav from '../../components/navigation/authSideNav.component';
import HelpCta from '../../components/cta/helpCta.component';
import StepOne from './signup/step-one.component';
const SignUp = ({ signUpStart, success, error, isLoading }) => {
  const [loadBar, setLoadBar] = useState(0);
  const [message, setMessage] = useState('');
  const [userCredentials, setCredentials] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { userName, email, password, confirmPassword } = userCredentials;
  const startLoader = useCallback(() => {
    setLoadBar(100);
  }, []);
  const onLoaderFinished = () => {
    setLoadBar(0);
  };
  useEffect(() => {
    if (error) {
      setMessage(<div className="errorMessage">{error}</div>);
    }
    if (success) {
      setMessage(<div className="successMessage">{success}</div>);
    }
    startLoader();
  }, [success, error]);
  const handleSubmit = async event => {
    event.preventDefault();
    // const btn = event.currentTarget.querySelector('button');
    // const loaderbtn = btn.querySelector('div');
    // const downloadbtn = btn.querySelector('p');

    setCredentials({
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    signUpStart(userName, email, password);
    setTimeout(() => {}, 7000);
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="auth">
      <div className="auth-section__greenBg"></div>
      <div className="auth-section">
        <div className="signin-signup card">
          <AuthSideNav />
          <div className="signin-signup__form">
            <HelpCta />
            <StepOne />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError,
  success: selectSuccess,
  isLoading: selectIsLoading
});

const mapDispatchToProps = dispatch => ({
  signUpStart: (userName, email, password) =>
    dispatch(signUpStart({ userName, email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
