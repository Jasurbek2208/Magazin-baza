import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDX9mFqgeH4KAfBDI-qwqtzJyLm-tie0A8",
    authDomain: "magazin-baza.firebaseapp.com",
    projectId: "magazin-baza",
    storageBucket: "magazin-baza.appspot.com",
    messagingSenderId: "259064293428",
    appId: "1:259064293428:web:ef7685b7a598bcc00d4261"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
