import React, {Component} from 'react';

class PicArray extends Component {
  render() {
    return this.props.picArray.map((picArr) => (
        <tr>
          <td>
            <img src={picArr.thumbnails.w160} alt='Picture not viewable.' />
          </td>
          <td>
            <h3>{picArr.title}</h3>
            <p>{picArr.description}</p>
          </td>
          <td>
            <a href={picArr.filename}>View</a>
          </td>
        </tr>

    ));
  }
}

export default PicArray;