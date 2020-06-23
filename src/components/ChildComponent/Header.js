import React, { useState, useEffect } from 'react';
import Axios from 'axios';


function Header() {
  const [user, setUser] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3001/api/user')
      .then(res => {
        const currentUser = res.data.filter(ele => {
          return ele.username === localStorage.getItem('token')
        })
        setUser(currentUser[0])
      }).catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="Login-header">
      <div className="wrapper-login">
        <img src={user.avatar} />
        <h4>{user.username}</h4>
      </div>
      {
        user ? <a
          href="/login"
          className="btn btn-light"
          onClick={() => localStorage.clear('token')}
        >
          Log Out
      </a> : <a
            href="/login"
            className="btn btn-light"
          >
            Log In
      </a>
      }

    </div>
  );
}

export default Header;