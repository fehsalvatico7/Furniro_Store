import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBA6DLfudENNqkHRiZNIYBzsQv_Y6QdbRQ",
  authDomain: "validaremail-40c92.firebaseapp.com",
  projectId: "validaremail-40c92",
  storageBucket: "validaremail-40c92.appspot.com",
  messagingSenderId: "560224321135",
  appId: "1:560224321135:web:d74876825bbb5b8d7dd79a"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
