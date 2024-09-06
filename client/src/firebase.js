// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jkestate-2a722.firebaseapp.com",
  projectId: "jkestate-2a722",
  storageBucket: "jkestate-2a722.appspot.com",
  messagingSenderId: "548672022434",
  appId: "1:548672022434:web:3213ff6596b1ff9809b4fb"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export default app;