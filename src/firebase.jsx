import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyALd-oVpH6wyS0zXob7HdKlj9aJHKa0lCQ",
    authDomain: "portfolio-4ef75.firebaseapp.com",
    projectId: "portfolio-4ef75",
    storageBucket: "portfolio-4ef75.appspot.com",
    messagingSenderId: "118334952212",
    appId: "1:118334952212:web:6af006bf83241f58b76801",
    measurementId: "G-12QGCDLBVK"
  };


const fireBaseApp = initializeApp(firebaseConfig);

const db = getFirestore(fireBaseApp);
const auth = getAuth(fireBaseApp);
const storage = getStorage(fireBaseApp)

export { auth, db, storage };