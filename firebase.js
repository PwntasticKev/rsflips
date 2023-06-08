import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

let initialized = false;
let auth = null;

export default async function ({ $config }) {
  if (!initialized) {
    const config = {
      apiKey: $config.firebase.config.apiKey,
      authDomain: $config.firebase.config.authDomain,
      projectId: $config.firebase.config.projectId
      // Add more Firebase configuration properties as needed
    };

    if (!firebase.apps.length) firebase.initializeApp(config);

    auth = firebase.auth();
    console.log(auth, '------auth');
    initialized = true;
  }
}

export const signIn = async () => {
  try {
    const provider = new this.$fireModule.auth.GoogleAuthProvider();
    const user = await this.$fire.auth.signInWithPopup(provider);
    console.log(user); // here you can do what you want with the user data
    this.$router.push('/'); // that return from firebase
  } catch (e) {
    // handle the error
  }
};

export const signOut = async () => {
  try {
    await this.$fire.auth.signOut();
    // User is now signed out
  } catch (e) {
    // Handle the error
  }
};

export const getUser = () => (auth ? auth.currentUser : null);
