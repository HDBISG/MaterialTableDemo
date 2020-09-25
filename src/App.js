import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListTransactions from './component/ecoTable';

function App() {
  return (
    <div className="App">
      <h1> List CO</h1>
      <ListTransactions/>
    </div>
  );
}

export default App;
