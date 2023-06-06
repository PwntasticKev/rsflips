import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function ({ $config }) {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: $config.firebase.config.apiKey,
      authDomain: $config.firebase.config.authDomain,
      projectId: $config.firebase.config.projectId
      // Add more Firebase configuration properties as needed
    };

    firebase.initializeApp(firebaseConfig);
  }
}
