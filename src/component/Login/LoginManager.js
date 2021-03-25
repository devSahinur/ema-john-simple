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
        photo: photoURL
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
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        return user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
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
        success: ''
      }
      return signOutUser;
    })
    .catch(err => {
      console.log(err);
    })
  };

// export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then((res) => {
//           // Signed in 
//           const newUserInfo = {...user};
//           newUserInfo.error = '';
//           newUserInfo.success = true;
//           setUser(newUserInfo);
//           updateUserName(user.name)
//           // ...
//         })
//         .catch((error) => {
//           const newUserInfo = {...user};
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           setUser(newUserInfo);
//           // ..
//         });
// };

// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//       .then((res) => {
//         const newUserInfo = {...user};
//           newUserInfo.error = '';
//           newUserInfo.success = true;
//           setUser(newUserInfo);
//           setLoggedInUser(newUserInfo);
//           history.replace(from);
//           console.log('sign in user info');
//           console.log(res);
//       })
//       .catch((error) => {
//         const newUserInfo = {...user};
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           setUser(newUserInfo);
//       });
// };

// const updateUserName = name => {
//     var user = firebase.auth().currentUser;

//       user.updateProfile({
//         displayName: name,
//       })
//       .then(function() {
//         console.log("User name Update successful");
//         // Update successful.
//       })
//       .catch(function(error) {
//         console.log(error);
//         // An error happened.
//       });
//   };