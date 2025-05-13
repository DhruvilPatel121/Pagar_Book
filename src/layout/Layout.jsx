import React from 'react'
import Sidebar from '../component/Sidebar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar /> 
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout