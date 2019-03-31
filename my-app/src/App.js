import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {getAllMedia} from './utils/MediaAPI';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';
import {tokenCheck} from './utils/MediaAPI';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router';

class App extends Component {
  state = {
    picArray: [],
    user: [],
  };

  componentDidMount() {
    getAllMedia().then(pics => {
      this.setState({picArray: pics});
    });
    tokenCheck(localStorage.getItem('Login-token')).then(data => {
      if (data.message) {
        this.setState({errorMessage: data.message});
      } else {
        this.setState({user: data});
        this.setState({errorMessage: ''});
      }
    });
  }

  setUser = (data) => {
    this.setState({user: data});
    localStorage.setItem('Login-token', data.token);
    this.setState({errorMessage: ''});
  };

  logout = () => {
    this.setState({user: ''});
    localStorage.clear();
    tokenCheck(localStorage.getItem('Login-token')).then(data => {
      this.setState({errorMessage: data.message});
    });
    return <Redirect to='/'/>;
  };

  render() {
    return (
        <div id='container'>
          <Router basename="/~juhohuh/w2-routing-login">
            {!this.state.errorMessage && <Nav/>}
            <Route exact path="/" render={(props) => (
                <Login {...props} setUser={this.setUser}/>
            )}/>
            <Route exact path="/home" render={(props) => (
                <Home {...props} picArray={this.state.picArray}/>
            )}/>
            <Route exact path="/profile" render={(props) => (
                <Profile {...props} userData={this.state.user}/>
            )}/>
            <Route exact path="/single/:id" component={Single}/>
            <Route exact path="/logout" component={this.logout}/>
          </Router>
        </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
};

export default App;
