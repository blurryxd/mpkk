import React from 'react';
import PicArray from '../components/PicArray';
import PropTypes from 'prop-types';
import {tokenCheck} from '../utils/MediaAPI';

const Home = (props) => {
  tokenCheck(localStorage.getItem('Login-token')).then(data => {
    if (data.message) {
      props.history.push('/');
    }
  });

  return (
      <React.Fragment>
        <h1>Home</h1>
        <table>
          <tbody>
          <PicArray picArray={props.picArray}/>
          </tbody>
        </table>
      </React.Fragment>
  );
};

Home.propTypes = {
  picArray: PropTypes.array,
  history: PropTypes.object,
};

export default Home;

