import React, { useState, useEffect } from 'react';
import RandomText from './RandomText';
import Speed from './Speed';
import { Fade } from 'reactstrap';

function Main() {
  const [userInput, setUserInput] = useState("");
  const [symbol, setSymbol] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(5)
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

  function handleInput(event) {
    if (!started) {
      setStarted(true)
    }
    setUserInput(event.target.value)
    setSymbol(countCorrectSymbol(event.target.value))
    onFinish();
    console.log(timer)
  }

  function onFinish() {
    if (timer === 0) {
      setFinished(true);
    }
  }


  const handleReset = () => {
    setUserInput('');
    document.getElementById('textarea').focus();
    setSymbol(0)
    setTimer(60)
    setStarted(false)
    setFinished(false)
  }

  const [checkUser, setCheckUser] = useState(false)
  const username = localStorage.getItem('token')
  useEffect(() => {
    if (username !== null) {
      setCheckUser(true)
    }
    var id;
    if (started) {
      id = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      if (timer === 0) {
        clearInterval(id)
      }
    }
    return () => {
      clearInterval(id)
    }
  })
  return (
    <div className="Main">
      <Speed symbol={symbol} />
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
      {
        checkUser ? <div className="button">
          <a href="#">
            <img src="https://cdn.glitch.com/10c9d348-7ac9-4866-a5e9-597207407019%2Fsave.png?v=1592558540910" alt="save" />
          </a>
          <img
            className="reset-button"
            src="https://cdn.glitch.com/10c9d348-7ac9-4866-a5e9-597207407019%2Frestart.png?v=1592558548060"
            alt="reset"
            onClick={handleReset}
          />
        </div> : <div className="button">
            <img
              className="reset-button"
              src="https://cdn.glitch.com/10c9d348-7ac9-4866-a5e9-597207407019%2Frestart.png?v=1592558548060"
              alt="reset"
              onClick={handleReset}
            />
          </div>
      }

    </div>
  );
}

export default Main;