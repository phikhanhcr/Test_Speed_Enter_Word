import React, { useState, useEffect } from 'react';
import RandomText from './RandomText';
import Speed from './Speed';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

function Main() {
  const [userInput, setUserInput] = useState("");
  const [symbol, setSymbol] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(5);
  const [correctWord, setCorrectWord] = useState(0)
  
  const [randomText, setRandomText] = useState(`Lorem ipsum dolor sit amet consectetur
  adipisicing elit. Tenetur qui reiciendis nemo,
  culpa magni sint corporis quia distinctio eius dolores
  perferendis voluptatum laboriosam officiis. Laboriosam dolorem
  temporibus similique quam dolor.`)

  function countCorrectSymbol(userInput) {
    const text = randomText.replace(' ', '');
    return userInput.replace(' ', '').split('').filter((ele, index) => {
      return ele === text[index]
    }).length;
  }

  function CountCorrectWords(userInput) {
    const input = userInput.split(' ');
    const textDefault = randomText.split(" ");
    return input.filter((ele, index) => {
      return ele === textDefault[index]
    }).length;
  }

  const handleInput = (event) => {
    setUserInput(event.target.value)
    setSymbol(countCorrectSymbol(event.target.value))
    setCorrectWord(CountCorrectWords(event.target.value))
    setStarted(true)
  }
  useEffect(() => {
    if (started) {
      var idInterval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      if (timer === 0) {
        clearInterval(idInterval)
        setFinished(true)
      }
    }
    console.log(timer)
    return () => {
      clearInterval(idInterval)
    }
  }, [started, timer])

  const handleReset = () => {
    setUserInput('');
    setStarted(false)
    document.getElementById('textarea').focus();
    setSymbol(0)
    setTimer(60)
    setFinished(false)
    setCorrectWord(0)
  }


  const handleSave = function () {
    console.log('save')
    // save when time's up that means timer === 0
    console.log(localStorage.getItem('token'))
    console.log(symbol);
    console.log(correctWord);
    const username = localStorage.getItem('token')
    let result = {
      username,
      wpm: correctWord,
      cpm: symbol
    }
    Axios.post('http://localhost:3001/api/result', { result })
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="Main">
      <Speed symbol={symbol} correctWord={correctWord} />
      <div className="count-down">
        <p>{timer} secs</p>
      </div>
      <RandomText randomText={randomText} userInput={userInput} />
      <div className="Typing">
        <textarea
          id="textarea"
          autoFocus
          placeholder="Start Typing...."
          defaultValue={""}
          value={userInput}
          onChange={handleInput}
          readOnly={finished}
        />
      </div>
      <div className="button">
        {
          localStorage.getItem('token') !== null &&
          <a href="#" onClick={handleSave}>
            <img
              src="https://cdn.glitch.com/10c9d348-7ac9-4866-a5e9-597207407019%2Fsave.png?v=1592558540910"
              alt="save"
            />
          </a>
        }

        <img
          className="reset-button"
          src="https://cdn.glitch.com/10c9d348-7ac9-4866-a5e9-597207407019%2Frestart.png?v=1592558548060"
          alt="reset"
          onClick={handleReset}
        />
      </div>
      {
        localStorage.getItem('token') === null && <p>You must login before saving your result
        <a href="/login" className="btn btn-light mustLogin">Login Now</a>
        </p>
      }


    </div>
  );
}

export default Main;