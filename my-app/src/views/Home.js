import React from 'react';
import PicArray from '../components/PicArray';
import PropTypes from 'prop-types';

const Home = (props) => {
  return (
      <React.Fragment>
        <h1>Home</h1>
        <PicArray picArray={props.picArray}/>
      </React.Fragment>
  );
};

Home.propTypes = {
  picArray: PropTypes.array,
};

export default Home;

