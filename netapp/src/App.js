import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketio from './lib/ws_client';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        data: {}
    }
  }

  componentDidMount(){
    let dtobj = {};
    socketio.on('connect', () => {
      console.log("socketio.id: " + socketio.id); // Generate ID of client
      //Change the id of client and send it to the server
      dtobj.id = socketio.id;
    });

    socketio.on('shouldReload', (data)=>{
      if(data == "reload"){
        window.location.reload();
      }
    });

    socketio.on('disconnect', () =>{

      console.log('user disconnected');
    });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
