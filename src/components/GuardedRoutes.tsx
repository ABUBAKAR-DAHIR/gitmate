import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function GuardedRoutes({isProfiled} : {isProfiled: boolean}) {
  if(!isProfiled) return <Navigate to="/details" replace/>
  return <Outlet />
}

export default GuardedRoutes