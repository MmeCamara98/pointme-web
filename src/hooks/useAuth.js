import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, clearError } from '../features/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const login = async (credentials) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return { success: true, user: result };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    clearAuthError
  };
};