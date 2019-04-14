import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {Avatar, Typography, Grid} from '@material-ui/core';
import {Redirect} from 'react-router';


const Profile = (props) => {
  if (props.user.user === null) {
    return <Redirect to="/" />
  }


  return (
      <React.Fragment>
        <Typography variant="h2" gutterBottom>Profile</Typography>
        <Grid container>
          <Grid item md={2} xs={6}>
          <Avatar alt="Avatar"
                  src={'http://media.mw.metropolia.fi/wbma/uploads/' +
                  props.user.avatar.filename}
                  style={{width: 200, height: 200}}
          />
          </Grid>
          <Grid item md={4} xs={6}>
          <Typography variant="body1" gutterBottom>{'Username: ' +
          props.user.user.username}</Typography>
          <Typography variant="body1" gutterBottom>{'Fullname: ' +
          props.user.user.full_name}</Typography>
          <Typography variant="body1" gutterBottom>{'Email: ' +
          props.user.user.email}</Typography>
          </Grid>
        </Grid>
        <br/>
        <Button variant='contained' button component={Link}
                to="/logout">Logout</Button>
      </React.Fragment>
  );
};

Profile.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
};

export default Profile;