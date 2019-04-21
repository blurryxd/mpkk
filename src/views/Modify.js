import React, {Component} from 'react';
import {doUpdate, getSingleMedia, tokenCheck} from '../utils/MediaAPI';
import PropTypes from 'prop-types';
import {Button, Typography} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class Modify extends Component {
  state = {
    file: {},
  };

  componentDidMount() {
    const {match: {params}} = this.props;
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

  doUpdate = (evt) => {
    evt.persist();
    doUpdate(this.state.file.title, this.state.file.description,
        this.state.file.file_id, localStorage.getItem('Login-token'));
    this.props.history.push('/my-files');
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    //console.log(name, value);
    this.setState((prevState) => {
      return {
        file: {
          ...prevState.file,
          [name]: value,
        },
      };
    });
  };

  render() {
    return (
        <React.Fragment>

          <Typography variant="h2" gutterBottom>Modify file</Typography>

          <ValidatorForm onSubmit={this.doUpdate}
                         instantValidate={false}
                         onError={errors => console.log(errors)}>
            <TextValidator type="text" name="title" label="Title"
                           value={this.state.file.title}
                           validators={['required']}
                           errorMessages={['this field is required']}
                           onChange={this.handleInputChange}/>

            <br/>
            <TextValidator type="textarea" label="Description (optional)"
                           name="description" multiline
                           value={this.state.file.description}
                           onChange={this.handleInputChange}/>
            <br/>
            <br/>

            <Button id="uploadButton" type="submit" variant="contained"
                    disabled={false}>Update</Button>
          </ValidatorForm>
        </React.Fragment>
    );
  }
}

Modify.propTypes = {
  history: PropTypes.object,
  updatePics: PropTypes.func,
  match: PropTypes.object,
};

export default Modify;