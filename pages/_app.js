import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import LoginPage from './LoginPage';

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  if (!user) return <LoginPage></LoginPage>
  return <Component {...pageProps} />
}

export default MyApp
