import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia, tokenCheck} from '../utils/MediaAPI';

class Single extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  state = {
    file: {
    },
  };



  componentDidMount() {
    const { match: { params } } = this.props;
    getSingleMedia(params.id).then(file => {
      this.setState({file: file});
    });
    tokenCheck(localStorage.getItem('Login-token')).then(data => {
      if (data.message) {
        localStorage.clear();
        this.props.history.push('/');
      } else {
        this.setState({user: data});
      }
    });
  }

  render() {
    return (
        <div id="container">
          <h1>{this.state.file.title}</h1>
          <img src={this.mediaUrl + this.state.file.filename}
               alt={this.state.file.title}/>
        </div>
    );
  }
}

Single.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default Single;