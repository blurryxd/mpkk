import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {getAllMedia} from './utils/MediaAPI';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';
import Login from './views/Login';

class App extends Component {
  state = {
    picArray: [],
    user: [],
  };

  componentDidMount() {
    getAllMedia().then(pics => {
      this.setState({picArray: pics});
    });
  }



  render() {
    return (
        <Router>
            <Nav/>
              <Route exact path="/" component={Login}/>
              <Route exact path="/home" render={(props) => (
                  <Home {...props} picArray={this.state.picArray}/>
              )}/>
              <Route exact path="/profile" component={Profile}/>
              <Route exact path="/single/:id" component={Single}/>
        </Router>
    );
  }
}


export default App;
