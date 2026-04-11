import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({isAuthenticated}: {isAuthenticated: boolean}) {
  if(!isAuthenticated) return <Navigate to="/login" replace/>
  return <Outlet />
}

export default ProtectedRoute