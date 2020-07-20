import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.actions';
import Logo from '../../assets/logo.png';
import './authSideNav.styles.scss';

const AuthSideNav = ({ user, signOutStart }) => {
  const history = useHistory();

  const navToggle = e => {
    let menu = document.getElementById('openSidebarMenu').checked;
    if (menu) document.getElementById('openSidebarMenu').checked = false;
    // let ht = window
    //   .getComputedStyle(elem, null)
    //   .getPropertyValue('transform');
  };

  useEffect(() => []);
  return (
    // <!-- NAV MENU -->
    <div className="authSideNav">
      <div className="authSideNav__section1">
        <img src={Logo} />
        <div>
          <p>FIRS HILAL COPERATIVE</p>
          <p>SOCIETY</p>
        </div>
      </div>
      <div className="authSideNav__section2"></div>
      <div className="authSideNav__section3"></div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthSideNav);
