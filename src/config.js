// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAzUvsrdWTHlMj4t-RJCnYV5Mj30iz8osc',
  authDomain: 'lktransport-bb5a0.firebaseapp.com',
  projectId: 'lktransport-bb5a0',
  storageBucket: 'lktransport-bb5a0.appspot.com',
  messagingSenderId: '716808554008',
  appId: '1:716808554008:web:e48fb15ed56a0ff4f5256d',
  measurementId: 'G-6R4RNFZJ4S'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
