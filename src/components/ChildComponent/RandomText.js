import React, { useState } from 'react';


function RandomText(props) {
  
  //setRandomText
  
  const userInput = props.userInput.split('');
  const text = props.randomText.split('');
  return (
    <div className="random-text">
        {
          text.map((ele , index ) => {
            let color;
            if(index < userInput.length ) {
              color = ele === userInput[index] ? '#dfffa0' : "#fcbea4"
            }
            return <span key={index} style={{backgroundColor : color}}>{ele}</span>
          })
        }
      </div>
  );
}

export default RandomText;