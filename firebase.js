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
    if (auth) {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
    }
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  try {
    if (auth) await auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const getUser = () => (auth ? auth.currentUser : null);
