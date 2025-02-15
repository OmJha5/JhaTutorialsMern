import React from 'react'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Users, Menu, X } from "lucide-react";
import { useSelector } from 'react-redux';

const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "users", name: "Users", icon: Users },
];

export default function NavAdmin({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
    let { user } = useSelector((state) => state.user);

    return (
        <div>
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
                    {menuItems.map((item) => (
                        
                        // Below is preety simple agar nav item users nhi hai tab to show ho jaye ya to nav item user to hai but role superadmin hai woh bhi thik case hai so show the button
                        (item.id != "users" || user?.role == "superadmin") && (
                            <Button
                                key={item.id}
                                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                                variant="ghost"
                                className={`flex items-center gap-3 px-4 py-2 w-full ${"md:justify-start"} ${activeTab === item.id && "bg-gray-700"}`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Button>
                        )

                    ))}
                </nav>
            </div>
        </div>
    )
}