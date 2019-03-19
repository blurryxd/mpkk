import React, {Component} from 'react';
import './App.css';
import PicArray from './components/PicArray';

class App extends Component {
  state = {
    picArray: [ ],
  };

  componentDidMount() {
    fetch( 'http://media.mw.metropolia.fi/wbma/media/').then((response) => {
      return response.json();
    }).then( (json) => {
      //console.log(json);
      json.map(item => {
        return fetch('http://media.mw.metropolia.fi/wbma/media/' + item.file_id).then(response => {
              return response.json();
        }).then(items => {
          console.log(items);
          //this.setState({picArray:items});
          this.setState({
            picArray: [...this.state.picArray, items]
          })
        });
      });
    });
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
