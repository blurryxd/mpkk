import React, {Component} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Redirect} from 'react-router';
import './App.css';
import {getAllMedia, tokenCheck, getAvatar} from './utils/MediaAPI';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
import Upload from './views/Upload';
import MyFiles from './views/MyFiles';
import Modify from './views/Modify';

class App extends Component {
  state = {
    picArray: [],
    user: [],
  };

  componentDidMount() {
    this.updatePics();

    tokenCheck(localStorage.getItem('Login-token')).then(data => {
      if (data.message) {
        this.setState({errorMessage: data.message});
      } else {
        this.setState({user: data});
        this.setState({errorMessage: ''});
      }
    });
  }

  updatePics = () => {
    getAllMedia().then(pics => {
      this.setState({picArray: pics});
    });
  };

  setUser = (data) => {
    this.setState({user: data.user});
    localStorage.setItem('Login-token', data.token);
    this.setState({errorMessage: ''});
    getAvatar(this.state.user.user_id).then(avatarData => {
      this.setState({avatar: avatarData});
    });
  };

  logout = () => {
    this.setState({user: ''});
    this.setState({avatar: null});
    localStorage.clear();
    tokenCheck(localStorage.getItem('Login-token')).then(data => {
      this.setState({errorMessage: data.message});
    });
    return <Redirect to='/'/>;
  };

  render() {
    return (
        <Router>
          <Grid container>
            <Grid item md={2} xs={12}>
              {!this.state.errorMessage && <Nav/>}
            </Grid>
            <Grid item md={10} xs={12}>
              <Route exact path="/" render={(props) => (
                  <Login {...props} setUser={this.setUser}/>
              )}/>
              <Route exact path="/home" render={(props) => (
                  <Home {...props} picArray={this.state.picArray}/>
              )}/>
              <Route exact path="/profile" render={(props) => (
                  <Profile {...props} user={this.state}/>
              )}/>
              <Route exact path="/my-files" component={MyFiles}/>
              <Route exact path="/single/:id" component={Single}/>
              <Route exact path="/modify/:id" component={Modify}/>
              <Route exact path="/logout" component={this.logout}/>
              <Route exact path="/upload" render={(props) => (
                  <Upload {...props} updatePics={this.updatePics}/>
              )}/>
            </Grid>
          </Grid>
        </Router>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
};

export default App;
