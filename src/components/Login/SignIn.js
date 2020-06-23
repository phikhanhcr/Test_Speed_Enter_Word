import React, { Component } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      signined: false, 
      checkUser : true, 
      checkPass : true
    }
  }
  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value, 
      checkUser : true, 
      checkPass : true
    })
  }
  submitHandle = async event => {
    event.preventDefault();
    const { username, password, password2 } = this.state;
    console.log({ username, password, password2 })
    Axios.get('http://localhost:3001/api/user')
      .then(res => {
        console.log(res.data)
        const allUser = res.data;
        const checkUser = allUser.filter(ele => {
          return ele.username === username
        })
        if (checkUser.length) {
          this.setState({
            checkUser : false
          })
          return;
        }
        if (password !== password2) {
          this.setState({
            checkPass : false
          })
          return;
        }
        const newUser = {
          username,
          password
        }
        Axios.post('http://localhost:3001/api/user', { newUser })
          .then(res => {
            console.log(res)
            this.setState({
              signined: true
            })
          }).catch(err => {
            console.log(err)
          })
      }).catch(err => {
        console.log(err)
      })
  }
  render() {
    const { username, password, password2, signined, checkUser, checkPass } = this.state;
    
    if(signined) {
      return <Redirect to="/login" />
    }
    let classNameUser = "alert alert-warning display"
    if(!checkUser) {
      classNameUser = "alert alert-warning"
    } 
    let classNamePass = "alert alert-warning display"
    if(!checkPass) {
      classNamePass = "alert alert-warning"
    }

    return (
      <div className="Login" style={{ backgroundImage: 'url("https://cdn.glitch.com/ca73df87-f769-4b2e-898e-f63b7172462c%2Flogin.jpg?v=1592747408938")' }}>
        <div className="wrapper">
          <h1>Nothing is impossible</h1>
          <div className={classNameUser} role="alert">
            Username already exists !!
          </div>
          <div className={classNamePass} role="alert">
            Oops! Password doesn't match ?
          </div>
          <div className="form-group wrapper-form" style={{ height: '400px' }}>
            <p className="fill">Sign in for free</p>
            <div>
              <form onSubmit={this.submitHandle} className="form-wrapper form-group">

                <input type="text" placeholder="Username" name="username" required
                  onChange={this.handleInput}
                  value={username}
                />
                <input type="password" placeholder="Password" name="password" required
                  onChange={this.handleInput}
                  value={password}
                />
                <input type="password" placeholder="Password Again" name="password2" required
                  onChange={this.handleInput}
                  value={password2}
                />
                <a className="forgot" href="/login">Get Back</a>
                <button className="btn" style={{ marginTop: '20px' }}>
                  Sign In
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default SignIn;