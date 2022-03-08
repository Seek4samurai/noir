import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import LoginPage from './LoginPage';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading></Loading>
  if (!user) return <LoginPage></LoginPage>

  return <Component {...pageProps} />
}

export default MyApp
