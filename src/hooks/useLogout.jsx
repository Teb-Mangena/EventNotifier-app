import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove users from localstorage
    localStorage.removeItem('user');

    // update auth context
    dispatch({type:'LOGOUT'});
  }

  return {logout}
}