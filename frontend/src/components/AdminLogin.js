import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { adminLogin } from "../actions/adminActions";
import { useDispatch, useSelector  } from "react-redux";

const Login = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const admin = useSelector((state)=> state.admin.adminDetails.data)

  const onSubmit = async (e) => {
      e.preventDefault();
      dispatch(adminLogin(email, password))
  };

  useEffect(()=> {
    if(admin && admin.isAdmin===true) {
      history.push("/admin/access")
    }
  },[admin])


  return (
    <div className="login">
      <div className="loginDiv">
        <div className="left">
          <img src={""} alt="logo" className="logo" />
          <h1>Welcome, Admin!</h1>
          <hr />
          <p>
            Not an admin? Visit our{" "}
            <a href="https://localhost:3000/">website!</a>
          </p>
        </div>
        <div className="signin">
          <h1>Sign In</h1>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div>
              <button className="loginButton">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
