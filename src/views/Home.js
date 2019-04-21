import React from 'react';
import PicArray from '../components/PicArray';
import PropTypes from 'prop-types';
import {tokenCheck} from '../utils/MediaAPI';
import {GridList, GridListTile, ListSubheader} from '@material-ui/core';

const Home = (props) => {
  tokenCheck(localStorage.getItem('Login-token')).then(data => {
    if (data.message) {
      props.history.push('/');
    }
  });

  return (
      <GridList>
        <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
          <ListSubheader component="div">Home</ListSubheader>
        </GridListTile>
          <PicArray picArray={props.picArray}/>
      </GridList>
  );
};

Home.propTypes = {
  picArray: PropTypes.array,
  history: PropTypes.object,
};

export default Home;

