import React, {Component} from 'react';
import './App.css';
import PicArray from './components/PicArray';

class App extends Component {
  state = {
    picArray: [ ],
  };

  componentDidMount() {
    fetch( 'test.json').then((response) => {
      return response.json();
    }).then( (json) => {
      console.log(json);
      this.setState({picArray:json});
    })
  }

  render() {
    return (
        <table>
          <tbody>
          <PicArray picArray={this.state.picArray}/>
          </tbody>
        </table>
    );
  }
}

export default App;
