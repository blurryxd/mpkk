import React, {Component} from 'react';
import {login} from '../utils/MediaAPI';

class Login extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    full_name: '',
  };

  componentDidMount() {
  }

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    //console.log(value, name);

    this.setState({
      [name]: value,
    });
  };

  login = (evt) => {
    evt.preventDefault();
    login(this.state.username, this.state.password);
  };

  render() {
    return (
        <React.Fragment>
          <h1>Login</h1>
          <form onSubmit={this.login}>
            <input type="text" name="username" placeholder="username"
                   value={this.state.username}
                   onChange={this.handleInputChange}/>

            <input type="password" name="password" placeholder="password"
                   value={this.state.password}
                   onChange={this.handleInputChange}/>

            <button type="submit">Login</button>

          </form>
        </React.Fragment>
    );
  }
}

export default Login;