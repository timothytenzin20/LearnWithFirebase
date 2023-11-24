import { signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { auth } from "../../firebaseConfig.js";
    
// Function handles the users signin with their google account 
export async function signInUserWithGoogle () {

    /* STEP 2: Create a new instance of the Firebase Google Authenticator Proivider
    We are going to look at the following documentation to figure out how we might do 
    this: https://firebase.google.com/docs/auth/web/google-signin */
    const provider = new GoogleAuthProvider();

    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // // auth.languageCode = 'it';
    // // To apply the default browser preference instead of explicitly setting it.
    // auth.useDeviceLanguage();

    // provider.setCustomParameters({
    //     'login_hint': 'user@example.com'
    //   });
      
    try {

        /* STEP 3: Create a pop-up window to appear so users may enter there google emails to
        complete the authetication process. We are going to look at the following documentation 
        to figure out how we might do this: https://firebase.google.com/docs/auth/web/google-signin */
        await signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
        // return the string "success" if sign-in was complete
        return "success";
    
    // If there was an error when signing-in
    } catch (error) {
        console.error(error);
        return "error";
    }
};








