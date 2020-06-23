import React, { useState, useEffect } from 'react';

function Countdown() {
  const [time , setTimer ] = useState(60);
  useEffect(() => {
    const id = setInterval(() => {
      setTimer(time - 1)
    }, 1000);
    return () => {
      clearInterval(id)
    }
  })
  return (
    <div className="count-down">
        <p>{time} secs</p>
      </div>
  );
}

export default Countdown;