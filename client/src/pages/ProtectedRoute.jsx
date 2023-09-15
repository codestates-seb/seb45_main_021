import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ProtectedRoute({ requireAdmin, requireLogin, requireUnlogin, children }) {
  const user = useSelector((state) => state.user);
  const { projectId, portfolioId } = useParams();
  console.log(user);

  if (requireAdmin) {
  }
  if (requireLogin) {
  }
  if (requireUnlogin) {
  }
  return children;
}

// 잘못된 접근입니다.
