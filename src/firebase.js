import { initializeApp } from 'firebase/app';
import { getFirestore} from '@firebase/firestore';
import { getAuth} from "firebase/auth";
import { GoogleAuthProvider } from '@firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFF1StW4SUlS9O-ejKeqt7sKAZX2RFeEU",
  authDomain: "snapchat-clone-5aa80.firebaseapp.com",
  projectId: "snapchat-clone-5aa80",
  storageBucket: "snapchat-clone-5aa80.appspot.com",
  messagingSenderId: "527935060875",
  appId: "1:527935060875:web:9a818dfcae7f2a543dcd8e"
};

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider()
  const storage = getStorage(app);

  export {auth,provider,db,storage}