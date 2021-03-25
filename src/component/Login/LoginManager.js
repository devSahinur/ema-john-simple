import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
};

export const handleGoogleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser ={
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }; 

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        user.success = true;
        return user;
        var accessToken = credential.accessToken;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage, errorCode, email, credential);
      });
  };

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res =>{
      const signOutUser ={
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
        error: '',
        success: false
      }
      return signOutUser;
    })
    .catch(err => {
      console.log(err);
    })
  };

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          updateUserName(name)
          return newUserInfo;
        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
        });
};

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          return newUserInfo;
      })
      .catch((error) => {
        const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;
      });
};

const updateUserName = name => {
    var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
      })
      .then(function() {
        console.log("User name Update successful");
        // Update successful.
      })
      .catch(function(error) {
        console.log(error);
        // An error happened.
      });
  };