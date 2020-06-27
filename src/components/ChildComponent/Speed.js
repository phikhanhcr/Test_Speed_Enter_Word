import React from 'react';
import PropTypes from 'prop-types';


function Speed(props) {
  const symbols = props.symbol;
  const correctWord = props.correctWord;
  return (
    <div className="wrapper-wpm">
        <div className="wpm">
          <p className="speed">{correctWord}</p>
          <p>Words Per Minute </p>
        </div>
        <div className="wpm">
          <p className="speed">{symbols}</p>
          <p>Char Per Minute </p>
        </div>
      </div>
  );
}

export default Speed;