import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Posts from './components/Guest/Posts'
import Post from './components/Guest/Post'
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
import AdmitCard from './components/Admin/AdmitCard'
import AnswerKey from './components/Admin/AnswerKey'
import CreateAdmitCard from './components/Admin/CreateAdmitCard'
import CreateAnswerKey from './components/Admin/CreateAnswerKey'
import EditAdmitCard from './components/Admin/EditAdmitCard'
import EditAnswerKey from './components/Admin/EditAnswerKey'

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
        path : "/admin/admitcard",
        element : <AdmitCard/>
    },
    {
        path : "/admin/answerkey",
        element : <AnswerKey/>
    },
    {
        path : "/admin/answerkey/edit/:id",
        element : <EditAnswerKey/>
    },
    {
        path : "/admin/admitcard/edit/:id",
        element : <EditAdmitCard/>
    },
    {
        path : "/admin/createadmitcard",
        element : <CreateAdmitCard/>
    },
    {
        path : "/admin/createanswerkey",
        element : <CreateAnswerKey/>
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
