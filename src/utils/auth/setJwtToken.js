import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setToken, logoutUser } from '../../redux/actions';
import store from '../../redux/store';

export default () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setToken(decoded));

    // check if token is expired
    // if so, redirect to login
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = '/';
    }
  }
}
