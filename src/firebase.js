import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update, push, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "your-actual-apikey",
  authDomain: "meetq-a4574.firebaseapp.com",
  databaseURL: "https://meetq-a4574-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "meetq-a4574",
  storageBucket: "meetq-a4574.appspot.com",
  messagingSenderId: "518564324839",
  appId: "1:518564324839:web:545c15781fb16ff71f8942"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, onValue, update, push, get };