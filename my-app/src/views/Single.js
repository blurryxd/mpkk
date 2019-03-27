import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia} from '../utils/MediaAPI';

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
  }

  render() {
    return (
        <React.Fragment>
          <h1>{this.state.file.title}</h1>
          <img src={this.mediaUrl + this.state.file.filename}
               alt={this.state.file.title}/>
        </React.Fragment>
    );
  }
}

Single.propTypes = {
  match: PropTypes.object,
};

export default Single;