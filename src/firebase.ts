import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCQbtxUmrTnY47--6zKnqnfjykO1l9W56E",
  authDomain: "react-chat-8c82e.firebaseapp.com",
  projectId: "react-chat-8c82e",
  storageBucket: "react-chat-8c82e.firebasestorage.app",
  messagingSenderId: "315240101049",
  appId: "1:315240101049:web:c2c3785cacbc2b59eb9768",
  measurementId: "G-RP30YEKWMZ"
};

export const VAPID_KEY = "BHdxQq8ymrxcBzEJBCkBnMZAviKaWi2_fuXMFoAbYtYgoHfXfyC_QzosHdUMNH9WQcfyG6aVOJy48MbsVU8Leqw"

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const messaging = getMessaging(app)

