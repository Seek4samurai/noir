import firestore from "firebase/compat/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import { auth, db } from "../firebase";
import "../styles/globals.css";
import LoginPage from "./LoginPage";
import firebase from "firebase/compat/app";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading></Loading>;
  if (!user) return <LoginPage></LoginPage>;

  return <Component {...pageProps} />;
}

export default MyApp;
