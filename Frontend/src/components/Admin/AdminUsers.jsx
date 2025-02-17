import React, { use, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/apiendpoint';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import DialogCreateUser from './DialogCreateUser';
import useCheckUser from '@/hooks/useCheckUser';
import NavAdmin from './NavAdmin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function AdminUsers() {
    useCheckUser();
    let [allUsers, setAllUsers] = useState([]);
    let [open, setOpen] = useState(false); // State to manage whether user clicked on create user button or not.
    let [filteredUsers, setFilteredUsers] = useState([]);
    let {user} = useSelector((state) => state.user)
    let navigate = useNavigate();

    useEffect(() => {
        setFilteredUsers(allUsers)
    }, [allUsers])

    const capatalize = (str) => {
        let ch = str[0];
        return ch.toUpperCase() + str.slice(1);
    }

    const deleteClickHandler = async (currUser) => {
        try {
            let res = await axios.delete(`${USER_API_ENDPOINT}/delete/${currUser._id}`, { withCredentials: true });
            if (res.data.success) {
                let filteredUsers = allUsers.filter((user) => user._id != currUser._id);
                setAllUsers(filteredUsers);
                toast.success(res.data.message);
            }
        }
        catch (e) {
            toast.error(e?.response?.data?.message)
        }
    }

    const filterHandler = (e) => {
        let text = e.target.value;

        let updatedUsers = allUsers.filter((user) =>
            user.email.toLowerCase().includes(text.toLowerCase()) || user.role.toLowerCase().includes(text.toLowerCase()) || text == ""
        )

        setFilteredUsers(updatedUsers);
    }

    useEffect(() => {
        let showAllUsers = async () => {
            try {
                let res = await axios.get(`${USER_API_ENDPOINT}/showallusers`, { withCredentials: true });
                if (res.data.success) {
                    setAllUsers(res.data.allUsers);
                }
            }
            catch (e) {
                toast.error(e?.response?.data?.message);
            }
        }

        showAllUsers();
    }, [])

    return (
        <div className="flex h-screen flex-col md:flex-row relative">
            <NavAdmin />

            {/* Main Content */}
            <div className="flex-1 p-6 md:ml-80 max-md:mt-16 transition-all duration-300 ease-in-out">
                <div className='lg:px-20'>
                    <div className="flex flex-col gap-10">
                        <div className="flex max-sm:flex-col max-sm:gap-3 justify-between items-center">
                            <Input placeholder="Filter by email , role" className="w-fit" onChange={filterHandler} autoFocus onFocus={(e) => e.target.focus()} />
                            <Button className="w-fit bg-blue-500 hover:bg-blue-400" onClick={() => setOpen(true)}>Create User</Button>
                        </div>

                        <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4'>
                            {
                                filteredUsers.length > 0 ? filteredUsers.map((user) => {
                                    return (
                                        <div key={user._id} className="flex flex-col shadow-lg p-4">
                                            <div className='flex flex-col gap-2'>
                                                <p className="text-md font-medium text-gray-900">{user.email}</p>
                                                <p className="text-xs text-gray-500">{capatalize(user.role)}</p>
                                            </div>

                                            <Button size="icon" className="mt-3 hover:bg-red-400 bg-red-500" onClick={() => deleteClickHandler(user)}><Trash className="w-4 h-4" /></Button>
                                        </div>
                                    )
                                }) : (
                                    <span className='absolute max-sm:text-center'>Oops No Users Found as per you filter!</span>
                                )


                            }
                        </div>


                    </div>

                    <DialogCreateUser open={open} setOpen={setOpen} allUsers={allUsers} setAllUsers={setAllUsers} />
                </div>
            </div>
        </div>



    )
}