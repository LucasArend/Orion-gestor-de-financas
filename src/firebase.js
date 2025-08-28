import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4FMHhdskxmGMtTJ_EynvFOXCxpagHMi4",
  authDomain: "orion-f2f9e.firebaseapp.com",
  projectId: "orion-f2f9e",
  storageBucket: "orion-f2f9e.firebasestorage.app",
  messagingSenderId: "841983267944",
  appId: "1:841983267944:web:bdbc3ed2f64c2c536457dd",
  measurementId: "G-QLEVH3T77V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();