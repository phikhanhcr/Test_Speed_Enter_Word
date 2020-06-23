import React, { Component } from 'react';
import './Login.css'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    let logined = false;
    if (localStorage.getItem('token')) {
      logined = true;
    }
    this.state = {
      username: "",
      password: "",
      logined, 
      checkUser : true,
      checkPassword : true
    }
  }

  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      checkUser : true , 
      checkPassword : true
    })
  }

  handleOnSubmit = async event => {
    console.log("Hihi")
    event.preventDefault();
    const { username, password } = this.state;
    await Axios.get('http://localhost:3001/api/user')
      .then(res => {
        console.log(res)
        const allUser = res.data;
        const currentUser = allUser.filter(ele => {
          return ele.username === username;
        })
        if (!currentUser.length) {
          this.setState({
            checkUser : false
          })
          return;
        }
        if (currentUser[0].password !== password) {
          this.setState({
            checkPassword : false
          })
          return;
        }
        this.setState({
          logined: true
        })

        localStorage.setItem('token', currentUser[0].username)

      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    const { username, password, logined, checkUser, checkPassword } = this.state;
    console.log({ username, password })
    if (logined) {
      return <Redirect to="/" />
    }
    let classNameUser = "alert alert-warning display"
    if(!checkUser) {
      classNameUser = "alert alert-warning"
    }
    let classNamePass = "alert alert-warning display"
    if(!checkPassword) {
      classNamePass = "alert alert-warning"
    }
    return (
      <div className="Login" style={{ backgroundImage: 'url("https://cdn.glitch.com/ca73df87-f769-4b2e-898e-f63b7172462c%2Flogin.jpg?v=1592747408938")' }}>
        <div className="wrapper">
          <h1>Crazy Login Form</h1>
          <div className={classNameUser}  role="alert">
            Username doesn't exist !!
          </div>
          <div className={classNamePass} role="alert">
            Opps! Wrong Password ?
          </div>
          <div className="form-group wrapper-form">
            <p className="fill">Fill out the form below to login</p>
            
            <div>
              <form onSubmit={this.handleOnSubmit} className="form-wrapper form-group" method="POST">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChangeInput}
                  required
                  value={username}
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChangeInput}
                  required
                  value={password}
                />
                <a className="forgot" href="/login/forgot">Forgot Password</a>
                <button className="btn">
                  Login
                </button>
                <a className="btn" href="/signin">Sign In</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
