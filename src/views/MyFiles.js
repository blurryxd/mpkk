import React, {Component} from 'react';
import {deleteMedia, getUserMedia} from '../utils/MediaAPI';
import {GridList, GridListTile, ListSubheader} from '@material-ui/core';
import PicArray from '../components/PicArray';
import PropTypes from 'prop-types';
import {tokenCheck} from '../utils/MediaAPI';


class MyFiles extends Component {
  state = {
    picArray: [],
  };

  updateImages = () => {
    getUserMedia(localStorage.getItem('Login-token')).then((pics) => {
      this.setState({picArray: pics});
    })
  };

  deleteFile = (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      console.log('delete ', id);
      deleteMedia(id, localStorage.getItem('Login-token')).then(data => {
        console.log(data);
      });
      this.updateImages();
    }
  };

  componentDidMount() {
    this.updateImages();
    tokenCheck(localStorage.getItem('Login-token')).then(data => {
      if (data.message) {
        this.props.history.push('/');
      }
    });
  }

  render(){
    return(
        <GridList>
          <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
            <ListSubheader component="div">My files</ListSubheader>
          </GridListTile>
          <PicArray picArray={this.state.picArray} edit={true} deleteFile={this.deleteFile}/>
        </GridList>
    )
  }

}

MyFiles.propTypes = {
  picArray: PropTypes.array,
  history: PropTypes.object,
};

export default MyFiles;