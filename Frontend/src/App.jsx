import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Jobs from './components/Guest/Jobs'
import Home from './components/Guest/Home'
import Admin from './components/Admin/Admin'
import CreatePost from './components/Admin/CreatePost'
import AdminLogin from './components/Admin/AdminLogin'
import AdminUsers from './components/Admin/AdminUsers'
import AdminPosts from './components/Admin/AdminPosts'

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
    {
        path : "/admin/posts/create",
        element : <CreatePost/>
    },
    {
        path : "/admin/posts",
        element : <AdminPosts/>
    },
    {
        path : "/admin/users",
        element : <AdminUsers/>
    },
    
])

export default function App() {
  return (
    <div>
        <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}
