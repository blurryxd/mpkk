import React from 'react';
import PropTypes from 'prop-types';
import {tokenCheck} from '../utils/MediaAPI';

const Profile = (props) => {
  tokenCheck(localStorage.getItem('Login-token')).then(data => {
    if (data.message) {
      this.props.history.push('/');
    }
  });

  return (
      <React.Fragment>
        <h1>Profile</h1>
        <table>
          <tbody>
          <p>{'Username: ' + props.userData.user.username}</p>
          <p>{'Fullname: ' + props.userData.user.full_name}</p>
          <p>{'Email: ' + props.userData.user.email}</p>
          </tbody>
        </table>
      </React.Fragment>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
  userData: PropTypes.array,
};

export default Profile;