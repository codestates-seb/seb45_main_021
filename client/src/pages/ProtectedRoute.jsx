import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ requireLogin, requireUnlogin, children }) {
  const { isLogin } = useSelector((state) => state.user);

  if ((requireLogin && !isLogin) || (requireUnlogin && isLogin)) {
    return <Navigate to="/" />;
  }

  return children;
}
