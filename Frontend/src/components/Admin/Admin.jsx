import useCheckUser from '@/hooks/useCheckUser';
import React, { useEffect } from 'react'
import { useState } from "react";
import NavAdmin from './NavAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveTab } from '@/redux/userSlice';

export default function Admin() {
    useCheckUser();
    let {user} = useSelector((state) => state.user)
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
          document.title = "Jha Tutorials | Dashboard"
    } , [])
    
    useEffect(() => {
        dispatch(setActiveTab("Dashboard"));
    } , [])

    return (
        <div className="flex h-screen flex-col max-md:mt-16 md:flex-row relative">
            <NavAdmin />

            {/* Main Content */}
            <div className="flex-1 p-6 md:ml-80 transition-all duration-300 ease-in-out">
                <div className="text-2xl text-center">Welcome to the Dashboard</div>
            </div>
        </div>
    );
}