import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const Profile = (props) => {

  console.log(props.user.avatar);
  return (
      <React.Fragment>
        <h1>Profile</h1>
        <p>{'Username: ' + props.user.user.username}</p>
        <p>{'Fullname: ' + props.user.user.full_name}</p>
        <p>{'Email: ' + props.user.user.email}</p>
        <p>Avatar: </p>
        <div id="container2">
          <img src={'http://media.mw.metropolia.fi/wbma/uploads/' +
          props.user.avatar.filename}
               alt={props.user.avatar.title}/>
        </div>
        <Button variant='contained' button component={Link} to="/logout">Logout</Button>

      </React.Fragment>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
};

export default Profile;