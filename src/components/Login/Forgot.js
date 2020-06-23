import React from 'react';

function Forgot() {
  return (

    <div className="Login" style={{ backgroundImage: 'url("https://cdn.glitch.com/ca73df87-f769-4b2e-898e-f63b7172462c%2Flogin.jpg?v=1592747408938")' }}>
      <div className="wrapper">
        <h1>Hey, stupid man ! ^_^</h1>
        <div className="form-group wrapper-form">
          <p className="fill">Why did you forget your password ? </p>
          <div>
            <form className="form-wrapper form-group" method="POST">
              <input type="text" placeholder="Email" name="email" required />
              <input type="text" placeholder="Username" name="name" required />
              <input type="password" placeholder="New Password" name="pass" required />
              <input type="password" placeholder="New Password again" name="pass1" required />
              <button className="btn">Oke em oi</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;