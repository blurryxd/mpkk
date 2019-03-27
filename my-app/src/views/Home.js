import React from 'react';
import PicArray from '../components/PicArray';
import PropTypes from 'prop-types';

const Home = (props) => {
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
};

export default Home;

