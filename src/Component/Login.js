///https://www.youtube.com/watch?v=X3qyxo_UTR4&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&index=2
import React, { useRef, useState, useEffect } from "react";
///import AuthContext from "../Context/AuthProvider";
import axios from "../api/axios"; //axios section
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/auth"; //use with axios

const Login = () => {
  const { setAuth } = useAuth;

  const userRef = useRef(); ///when for user input focus
  const errorRef = useRef(); /// error reference accesability

  const navigate = useNavigate(); //navigate
  const location = useLocation(); //location
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState(""); //tied to user input
  const [password, setPassword] = useState(""); //tied to password input
  const [errorMsg, setErrorMsg] = useState(""); //if error
  ///const [success, setSuccess] = useState(false); // if succesfull

  /// displaying userName
  ///const [headingText, setHeading] = useState("!");

  ////setting the focus when  the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  ///empty error message if/when the user or password changes
  useEffect(() => {
    setErrorMsg("");
  }, [user, password]);

  ///handle submit without backend
  /*
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user, password);
    setUser("");
    setPassword("");
    setSuccess(true);
    //display Name
    setHeading(" " + user + "!");
  };
*/
  //// displaying User Name
  /*  function handleClick() {
    setHeading(" " + user + "!");
  }*/

  ///with axios handle submit - node.js
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      /// console.log(user, password);
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));

      ///access token
      const accessToken = response?.data?.accessToken;
      //roles
      const roles = response?.data?.roles;

      setAuth({ user, password, roles, accessToken });

      setUser("");
      setPassword("");
      //setSuccess(true);
      navigate(from, { replace: true });

    } catch (error) {
      if (!error?.response) {
        setErrorMsg("no server response");
      } else if (error.response?.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrorMsg("unauthorised");
      } else {
        setErrorMsg("login Failed");
      }
      errorMsg.current.focus();
    }
  };

  return (
    <>
   {  /* {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            Welcome, {headingText}! <br />
            <Link to="/">Home</Link>
          </p>
        </section>
      ) : ( */}
        <section>
          <p ref={errorRef} className={errorMsg ? "errorMsg" : "offscreen"}>
            {" "}
            {errorMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              value={user}
              required
              onChange={(event) => setUser(event.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here - lead back to Registration form*/}
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
    { /* } )} */}
    </>
  );
};

export default Login;
////https://codesandbox.io/p/sandbox/get-input-form-value-in-react-773y1?file=%2Fsrc%2Fcomponents%2FApp.jsx  - helpful
//https://codesandbox.io/p/sandbox/react-forms-multiple-inputs-rwyml
