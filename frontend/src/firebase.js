import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAWnlc7CtR31pwVXV7OmeNe3pGUpNFb1_E",
  authDomain: "opportunis-51.firebaseapp.com",
  projectId: "opportunis-51",
  storageBucket: "opportunis-51.firebasestorage.app",
  messagingSenderId: "90463639941",
  appId: "1:90463639941:web:a89d53e1d3b98ccf044cec"
};

const app = initializeApp(firebaseConfig);

export default app;