// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBht2R-r4U7mQ0ysOanh6ImSIIr90rCAsc",
  authDomain: "thunderdome-aa580.firebaseapp.com",
  projectId: "thunderdome-aa580",
  storageBucket: "thunderdome-aa580.appspot.com",
  messagingSenderId: "713203365288",
  appId: "1:713203365288:web:82e111a24c3ea893d0199d",
  measurementId: "G-3S045CKGTY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);


export const getIdToken = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error("Error fetching ID token:", error);
    }
  }

  return null;
};