import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXDRVMSOeT0xmwO1KACbpQxDyQ-e79iYU",
  authDomain: "login-auth-a8be8.firebaseapp.com",
  projectId: "login-auth-a8be8",
  storageBucket: "login-auth-a8be8.appspot.com",
  messagingSenderId: "569478467964",
  appId: "1:569478467964:web:762871f011c048c08654f9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
