import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Jobs from './components/Guest/Jobs'
import Home from './components/Guest/Home'
import Admin from './components/Admin/Admin'
import AdminLogin from './components/Admin/AdminLogin'

const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <Home/>
    },
    {
        path : "/jobs",
        element : <Jobs/>
    },
    {
        path : "/admin",
        element : <Admin/>
    },
    {
        path : "/admin/login",
        element : <AdminLogin/>
    },
    
])

export default function App() {
  return (
    <div>
        <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}
