import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


class PicArray extends Component {
  render() {
    return this.props.picArray.map((picArr, i) => (
    <tr key={i}>
          <td>
            <img src={'http://media.mw.metropolia.fi/wbma/uploads/' + picArr.thumbnails.w160} alt={picArr.title} />
          </td>
          <td>
            <h3>{picArr.title}</h3>
            <p>{picArr.description}</p>
          </td>
          <td>
            <Link to={'/single/' + picArr.file_id}>View</Link>
          </td>
        </tr>
    ))
  }
}

PicArray.propTypes = {
  picArray: PropTypes.array,
};

export default PicArray;