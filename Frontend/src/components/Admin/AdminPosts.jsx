import useCheckUser from '@/hooks/useCheckUser';
import React, { useEffect } from 'react'
import { useState } from "react";
import NavAdmin from './NavAdmin';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

export default function AdminPosts() {
    useCheckUser();
    let { user } = useSelector((state) => state.user)
    let navigate = useNavigate();

    return (
        <div className="flex h-screen flex-col md:flex-row relative">
            <NavAdmin />

            {/* Main Content */}
            <div className="flex-1 p-6 md:ml-80 max-md:mt-16 transition-all duration-300 ease-in-out mr-16">
                <div className="flex justify-end">
                    <Button className="bg-blue-500 hover:bg-blue-400 hover:cursor-pointer" onClick={() => navigate("/admin/posts/create")}>Create</Button>
                </div>


            </div>
        </div>
    );
}
