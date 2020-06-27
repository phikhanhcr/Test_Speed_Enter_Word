import React, { useState, useEffect } from 'react';
import Axios from 'axios';


function History() {
  const [history, setHistory] = useState([])
  useEffect(() => {
    function getResult() {
      Axios.get('http://localhost:3001/api/result')
        .then(res => {
          console.log(res)
          setHistory(res.data)
        }).catch(err => {
          console.log(err)
        })
    }
    getResult();
  }, [])
  return (
    <div className="History">
      <h3>History</h3>
      <p>Rank</p>
      <div className="wrapper-history">
        {
          history.length && history.map((ele, index) => (
            <div className="each-user">
              <div className="wrapper-login">
                <img src="https://scontent.fhph1-2.fna.fbcdn.net/v/t1.0-9/73244435_2997608627131456_2957342681333760000_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=AfkINelAhuMAX-evxNz&_nc_ht=scontent.fhph1-2.fna&oh=7d9accf48fded7fc2d3d5cb59a0eb27f&oe=5F12563C" alt="images" />
                <h4>{ele.username}</h4>
              </div>
              <div className="result">{ele.wpm} wpm</div>
              <div className="timer">{ele.cpm} cpm</div>
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default History;