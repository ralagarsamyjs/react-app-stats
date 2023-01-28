import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import Dashboard from './components/dashboard';
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
//render(<App />, document.getElementById("root"));
