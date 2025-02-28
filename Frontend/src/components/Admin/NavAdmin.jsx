import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Users, Menu, X, BriefcaseBusiness } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setActiveTab } from '@/redux/userSlice';

export default function NavAdmin() {
    let { user } = useSelector((state) => state.user);
    let { activeTab } = useSelector((state) => state.user);
    let [sidebarOpen, setSidebarOpen] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Dispatch the action when the user leaves the page
            dispatch(setActiveTab("Dashboard"));  
        };

        // Attach the beforeunload event listener
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dispatch]);

    return (
        <div className='fixed top-0 left-0 md:h-full max-md:w-full z-[10]'>
            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden p-4 flex justify-between items-center bg-gray-900 text-white">
                <h1 className="text-xl font-bold ">Admin Panel</h1>
                <Button variant="ghost" className="relative z-[60]" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
            </div>

            {/* Sidebar */}
            <div className={cn(
                "bg-gray-900 text-white p-5 flex flex-col space-y-5 md:w-64 fixed md:relative top-0 left-0 h-full transition-transform duration-300 ease-in-out",
                sidebarOpen ? "w-full h-full z-50" : "-translate-x-full md:translate-x-0"
            )}>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <nav className="flex flex-col gap-2">

                    {/* Dashboard */}
                    <Button
                        key={"Dashboard"}
                        onClick={() => { setSidebarOpen(false); dispatch(setActiveTab("Dashboard")); navigate("/admin") }}
                        variant="ghost"
                        className={`flex items-center gap-3 px-4 py-2 w-full ${"md:justify-start"} ${activeTab === "Dashboard" && "bg-gray-700"}`}
                    >
                        <Home className="w-5 h-5" />
                        Dashboard
                    </Button>

                    {/* Jobs */}
                    <Button
                        key={"Posts"}
                        onClick={() => { setSidebarOpen(false); dispatch(setActiveTab("Posts")); navigate("/admin/posts") }}
                        variant="ghost"
                        className={`flex items-center gap-3 px-4 py-2 w-full ${"md:justify-start"} ${activeTab === "Posts" && "bg-gray-700"}`}
                    >
                        <BriefcaseBusiness className="w-5 h-5" />
                        Posts
                    </Button>

                    {/* Users */}
                    {
                        // Below is preety simple agar nav item users nhi hai tab to show ho jaye ya to nav item user to hai but role superadmin hai woh bhi thik case hai so show the button
                        (user?.role == "superadmin") && (
                            <Button
                                key={"Users"}
                                onClick={() => { dispatch(setActiveTab("Users")); setSidebarOpen(false); navigate("/admin/users") }}
                                variant="ghost"
                                className={`flex items-center gap-3 px-4 py-2 w-full ${"md:justify-start"} ${activeTab === "Users" && "bg-gray-700"}`}
                            >
                                <Users className="w-5 h-5" />
                                Users
                            </Button>
                        )
                    }

                </nav>
            </div>
        </div>
    )
}