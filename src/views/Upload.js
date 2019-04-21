import React, {Component} from 'react';
import {tokenCheck} from '../utils/MediaAPI';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Button, Typography} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Slider from '@material-ui/lab/Slider';

class Upload extends Component {
  state = {
    upload: {
      title: '',
      description: '',
      file: '',
    },
    completed: 0,
    brightness: 100,
    contrast: 100,
    sepia: 0,
  };

  componentDidMount() {
    tokenCheck(localStorage.getItem('Login-token')).then(data => {
      if (data.message) {
        this.props.history.push('/');
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  doUpload = (evt) => {
    evt.persist();
    const fd = new FormData();
    fd.append('title', this.state.upload.title);
    fd.append('description', this.state.upload.description);
    fd.append('file', this.state.upload.file);
    console.log(fd);
    fetch('http://media.mw.metropolia.fi/wbma/media', {
      method: 'POST',
      headers: {
        'x-access-token': localStorage.getItem('Login-token'),
      },
      body: fd,
    }).then((response) => {
      return response.json();
    }).then((result) => {
      console.log(result);
      this.props.updatePics();
      document.querySelector('#lataus').style.display = 'block';
      this.timer = setInterval(this.progress, 200);
    });
  };

  progress = () => {
    const {completed} = this.state;
    if (completed === 100) {
      this.props.history.push('/home');
    } else {
      const diff = Math.random() * 10;
      this.setState({completed: Math.min(completed + diff, 100)});
    }
  };

  createPreview = (file) => {
    const img = document.querySelector('#previewimg');
    document.querySelector('#container3').style.display = 'block';
    if (file.type.startsWith('image/')) {
      document.querySelector('#filters').style.display = 'block';
      img.src = window.URL.createObjectURL(file);
    } else if (file.type.startsWith('audio/')) {
      img.src = 'https://i.imgur.com/eiQCC9I.jpg';
    } else if (file.type.startsWith('video/')) {
      img.src = 'https://i.imgur.com/eiQCC9I.jpg';
    } else {
      img.alt = 'Filetype not image, audio or video.';
    }

  };

  saveFileToState = (evt) => {
    evt.persist();
    this.setState((prevState) => {
      return {
        upload: {
          ...prevState.upload,
          file: evt.target.files[0],
        },
      };
    });
    this.createPreview(evt.target.files[0]);
    this.enableUpload();
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    //console.log(name, value);
    this.setState((prevState) => {
      return {
        upload: {
          ...prevState.upload,
          [name]: value,
        },
      };
    });
    this.enableUpload();
  };

  enableUpload = () => {
    if (this.state.upload.title.length !== 0 &&
        this.state.upload.file.length !== 0) {
      document.querySelector('#uploadButton').setAttribute('disabled', '{false}');
    }
  };

  brightnessAdjust = (event, value) => {
    this.setState({brightness: value});
  };

  contrastAdjust = (event, value) => {
    this.setState({contrast: value});
  };

  sepiaAdjust = (event, value) => {
    this.setState({sepia: value});
  };

  resetFilters = (evt) => {
    evt.preventDefault();
    this.setState({brightness: 100, contrast: 100, sepia: 0});
  };

  resetForm = (evt) => {
    evt.preventDefault();
    this.resetFilters(evt);
    this.setState({
      upload: {
        title: '',
        description: '',
        file: '',
      },
      completed: 0,
      brightness: 100,
      contrast: 100,
      sepia: 0,
    });
    document.querySelector('#container3').style.display = 'none';
    document.querySelector('#filters').style.display = 'none';
    document.querySelector('#previewimg').src = '';
    document.querySelector('#mediaFile').value = '';
  };

  render() {
    return (
        <React.Fragment>
          <LinearProgress id="lataus" variant="determinate"
                          value={this.state.completed}
                          style={{display: 'none'}}/>
          <Typography variant="h2" gutterBottom>Upload</Typography>

          <ValidatorForm onSubmit={this.doUpload}
                         instantValidate={false}
                         onError={errors => console.log(errors)}>
            <TextValidator type="text" name="title" label="Title"
                           value={this.state.upload.title}
                           validators={['required']}
                           errorMessages={['this field is required']}
                           onChange={this.handleInputChange}/>

            <br/>
            <TextValidator type="textarea" label="Description (optional)"
                           name="description"
                           value={this.state.upload.description}
                           onChange={this.handleInputChange}/>
            <br/>
            <input id="mediaFile" type="file" accept="audio/*,video/*,image/*"
                   onChange={this.saveFileToState}
                   required
            />
            <Button id="uploadButton" type="submit" variant="contained"
                    disabled={false}>Upload</Button>
          </ValidatorForm>
          <br/>
          <div id="container3" style={{display: 'none'}}>
            <Typography variant="h4" gutterBottom>Preview</Typography>
            <img id="previewimg" src="" alt="" style={{
              filter: 'brightness(' + this.state.brightness + '%) ' +
                  'contrast(' + this.state.contrast + '%) sepia(' +
                  this.state.sepia + '%)',
              WebkitTransition: 'all',
              msTransition: 'all',
            }}/>
            <br/>
            <div id="filters" style={{display: 'none'}}>
              <Typography id="label">Brightness</Typography>
              <Slider
                  value={this.state.brightness}
                  onChange={this.brightnessAdjust}
                  max={200}
              />
              <br/>
              <Typography id="label">Contrast</Typography>
              <Slider
                  value={this.state.contrast}
                  onChange={this.contrastAdjust}
                  max={200}
              />
              <br/>
              <Typography id="label">Sepia</Typography>
              <Slider
                  value={this.state.sepia}
                  onChange={this.sepiaAdjust}
              />
              <br/>
              <Button variant="contained" onClick={this.resetFilters}>Reset
                filters</Button>
            </div>
          </div>
          <br/>
          <Button onClick={this.resetForm} variant="contained">Reset
            form</Button>
        </React.Fragment>
    );
  }
}

Upload.propTypes = {
  history: PropTypes.object,
  updatePics: PropTypes.func,
};

export default Upload;