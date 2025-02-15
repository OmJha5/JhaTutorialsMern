import useCheckUser from '@/hooks/useCheckUser';
import React from 'react'
import { useState } from "react";
import NavAdmin from './NavAdmin';
import AdminUsers from './AdminUsers';
import { useSelector } from 'react-redux';

export default function Admin() {
    useCheckUser();
    let {user} = useSelector((state) => state.user)

    function Dashboard() {
        return <div className="text-2xl text-center">Welcome to the Dashboard</div>;
    }

    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen flex-col md:flex-row relative">
            <NavAdmin activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 p-6 md:ml-32 transition-all duration-300 ease-in-out">
                {activeTab === "dashboard" && <Dashboard />}
                {user?.role=="superadmin" && activeTab === "users" && <AdminUsers />}
            </div>
        </div>
    );
}