import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  };

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        handleResponse(res, true)
    })
  };

  const signOut = () => {
      handleSignOut()
      .then(res => {
          handleResponse(res, false)
      })
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordNumber
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] =e.target.value;
      setUser(newUserInfo);
    }
  };


  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true)
        })
    }
    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true)
        })
    }
    e.preventDefault();
  }


  return (
         <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={() => signOut()}>Sign Out</button> :
        <button onClick={() =>googleSignIn()}>Sign In With Google</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in with Facebook</button>
      {
        user.isSignedIn && <div>
            <p>Welcome, {user.name}</p>
            <p>Your Email: {user.email}</p>
            <img src={user.photo} alt=""/>

        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label> 
      <form action="" onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} required placeholder="Your name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your Email" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>{user.error}User { newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;
