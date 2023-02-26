import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import env from "react-dotenv";
// import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId,
  databaseURL: env.databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const productsCollectionRef = collection(database, "products");
export const categoryCollectionRef = collection(database, "category");
export const ordersCollectionRef = collection(database, "orders");

// custom hook
export function useAuth() {
  //
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return unSubscribe;
  }, []);
  return currentUser;
}
