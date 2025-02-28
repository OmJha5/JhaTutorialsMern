import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Posts from './components/Guest/posts'
import Post from './components/Guest/post'
import Home from './components/Guest/Home'
import Admin from './components/Admin/Admin'
import CreatePost from './components/Admin/CreatePost'
import AdminLogin from './components/Admin/AdminLogin'
import AdminUsers from './components/Admin/AdminUsers'
import AdminPosts from './components/Admin/AdminPosts'
import EditPost from './components/Admin/EditPost'
import Browse from './components/Guest/Browse'
import Donate from './components/Guest/Donate'
import About from './components/Guest/About'
import NotFound from './components/Guest/NotFound'

const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <Home/>
    },
    {
        path : "/donate",
        element : <Donate/>
    },
    {
        path : "/about",
        element : <About/>
    },
    {
        path : "/browse",
        element : <Browse/>
    },
    {
        path : "/posts",
        element : <Posts/>
    },
    {
        path : "/post/:id",
        element : <Post/>
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
    {
        path : "/admin/posts/edit/:id",
        element : <EditPost/>
    },
    {
        path : "*",
        element : <NotFound/>
    },
    
])

export default function App() {
  return (
    <div>
        <RouterProvider router={appRouter}></RouterProvider>
    </div>
  )
}
