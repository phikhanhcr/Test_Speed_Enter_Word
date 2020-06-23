import React from 'react';

import '../App.css';
import Header from './ChildComponent/Header';
import Main from './ChildComponent/Main';
import History from './ChildComponent/History';

function MainCourse() {
  const user = localStorage.getItem('token')
  console.log(user)
  return (
    <div className="App">
      <div className="container">
        <div className="app">
          
            <Header />
            <Main />
            <History />
        </div>
      </div>
    </div>
  );
}

export default MainCourse;
