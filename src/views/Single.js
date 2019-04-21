import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia, tokenCheck, fetchUser} from '../utils/MediaAPI';

class Single extends Component {
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  state = {
    file: {},
    filters: {
      brightness: 100,
      contrast: 100,
      sepia: 0,
      blur: 0,
      saturate: 100,
    },
  };

  componentDidMount() {
    const {match: {params}} = this.props;
    getSingleMedia(params.id).then(file => {
      this.setState({file: file});
      this.setState({filters: this.getFilters(this.state.file.description)});
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

  getFilters = (text) => {
    const pattern = '\\[f\\](.*?)\\[\\/f\\]';
    const re = new RegExp(pattern);
    try {
      return JSON.parse(re.exec(text)[1]);
    } catch (e) {
      // console.log(e);
      return this.state.filters;
    }
  };

  getDescription = (text) => {
    const pattern = '\\[d\\]((.|[\\r\\n])*?)\\[\\/d\\]';
    const re = new RegExp(pattern);
    //console.log(re.exec(text));
    try {
      return re.exec(text)[1];
    } catch (e) {
      return text;
    }
  };

  render() {
    return (
        <React.Fragment>
          <h1>{this.state.file.title}</h1>
          <div id="container">
            {(this.state.file.media_type === 'image' &&
                <img src={this.mediaUrl + this.state.file.filename}
                     alt={this.state.file.title} style={{
                  filter: 'brightness(' + this.state.filters.brightness + '%) ' +
                      'contrast(' + this.state.filters.contrast + '%) sepia(' +
                      this.state.filters.sepia + '%)',
                }}/>)
            || (this.state.file.media_type === 'video' &&
                <video src={this.mediaUrl + this.state.file.filename}
                       alt={this.state.file.title} controls
                       poster={this.mediaUrl + this.state.file.screenshot}/>)
            || <audio controls src={this.mediaUrl + this.state.file.filename}
                      alt={this.state.file.title}/>
            }
          </div>
          <p>Uploaded by: {fetchUser(this.state.file.user_id)}</p>
          <p>{this.getDescription(this.state.file.description)}</p>
        </React.Fragment>
    );
  }
}

Single.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default Single;