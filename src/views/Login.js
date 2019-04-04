import React, {Component} from 'react';
import {login, tokenCheck} from '../utils/MediaAPI';
import PropTypes from 'prop-types';
import {registerUser} from '../utils/MediaAPI';
import {checkIfUserNameExists} from '../utils/MediaAPI';

class Login extends Component {
  state = {
    user: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    toggleForm: true,
    userAvailable: true,
  };

  componentDidMount() {
    tokenCheck(localStorage.getItem('Login-token')).then(data => {
      if (data.message) {
        console.log('No token found. No redirection needed.');
      } else {
        this.props.history.push('/home');
      }
    });
  }

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    //console.log(name, value);
    this.setState((prevState) => {
      return {
        user: {
          ...prevState.user,
          [name]: value,
        },
      };
    });
  };

  login = (evt) => {
    evt.preventDefault();
    login(this.state.user.username, this.state.user.password).then((user) => {
      if (user.token) {
        this.props.setUser(user);
        this.props.history.push('/home');
      } else {
        window.alert(user.message);
      }
    });
  };

  register = (evt) => {
    evt.preventDefault();
    checkIfUserNameExists(this.state.user.username).then((isAvailable) => {
      if (isAvailable.available === true) {
        registerUser(this.state.user.username, this.state.user.password,
            this.state.user.full_name, this.state.user.email).then((data) => {
          if (data.error) {
            window.alert(data.message + '\n' + data.error);
          } else {
            this.login(evt);
            window.alert(data.message + '\nLogging in...');
          }
        });
      } else {
        window.alert('username not available');
      }
    });
  };

  render() {
    return (
        <React.Fragment>
          <h1>Login</h1>
          <form onSubmit={this.login}>
            <input type="text" name="username" placeholder="username"
                   value={this.state.user.username}
                   onChange={this.handleInputChange}/>

            <input type="password" name="password" placeholder="password"
                   value={this.state.user.password}
                   onChange={this.handleInputChange}/>

            <button type="submit">Login</button>

          </form>
          <br/>

          <h1>Register</h1>
          <form onSubmit={this.register}>
            <input type="text" name="username" placeholder="username"
                   value={this.state.user.username}
                   onChange={this.handleInputChange}/>

            <input type="password" name="password" placeholder="password"
                   value={this.state.user.password}
                   onChange={this.handleInputChange}/>

            <br/>

            <input type="text" name="full_name" placeholder="fullname"
                   value={this.state.user.full_name}
                   onChange={this.handleInputChange}/>

            <input type="text" name="email" placeholder="email"
                   value={this.state.user.email}
                   onChange={this.handleInputChange}/>

            <button type="submit">Register</button>

          </form>
        </React.Fragment>
    );
  }
}

Login.propTypes = {
  setUser: PropTypes.func,
  history: PropTypes.object,
};

export default Login;