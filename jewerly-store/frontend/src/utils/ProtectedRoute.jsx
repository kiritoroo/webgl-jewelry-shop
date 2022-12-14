import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector(state => state.auth)

  if (loading === false) {
    if (isAuthenticated == false) {
      console.log(isAuthenticated)
      return <Navigate to="/" />;
    }
    else if (isAuthenticated && user.role != 'admin' ) {
      return <Navigate to="/" />;
    }
    else {
      return children
    }
  }
}

export default ProtectedRoute;
