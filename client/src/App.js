
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { message: 'deu certo não' };
  }
  componentDidMount() {
    fetch('/testes/object')
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(message => {
        console.log(message);
        this.setState({ message })
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1 className="App-intro">{this.state.message.title}</h1>
        <h4 className="App-intro">{this.state.message.subtitle}</h4>
      </div>
    );
  }
}

export default App;