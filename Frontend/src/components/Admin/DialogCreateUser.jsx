import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/apiendpoint';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import InternalServerError from '../Guest/InternalServerError';

export default function DialogCreateUser({ open, setOpen, allUsers, setAllUsers }) {
    let [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })
    let [loading, setLoading] = useState(false);
    let dispatch = useDispatch();
    let [error, setError] = useState(false);

    let isValidEmail = () => {
        var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        return re.test(input.email);
    }

    let isFormValid = () => {
        if (input.password == "") {
            toast.error("Password is Required");
            return false;
        }

        if (input.role == "") {
            toast.error("Role is required");
            return false;
        }

        if (!isValidEmail(input.email)) {
            toast.error("Please enter valid email");
            return false;
        }

        return true;
    }

    let submitHandler = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                setLoading(true);
                let res = await axios.post(`${USER_API_ENDPOINT}/create`, input, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })

                if (res.data.success) {
                    let updatedAllUsers = [...allUsers, res.data.newUser];
                    setAllUsers(updatedAllUsers);
                    setOpen(false);
                    setInput({
                        email: "",
                        password: "",
                        role: "",
                    });
                }

            }
            catch (e) {
                setError(true);
            }
            finally {
                setLoading(false);
            }
        }

    }

    let changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    return (
        <div>
            {
                (error) ? (
                    <InternalServerError />
                ) : (
                    <div>
                        <Dialog open={open}>
                            <DialogContent onInteractOutside={() => setOpen(false)} className="w-[95%]">
                                <DialogHeader>
                                    <DialogTitle>Create User</DialogTitle>
                                </DialogHeader>

                                <form onSubmit={submitHandler} className='flex flex-col gap-5 my-3'>
                                    <div>
                                        <Label className="mb-2" htmlFor="email" >Email</Label>
                                        <Input name="email" id="email" value={input.email} onChange={changeEventHandler} />
                                    </div>

                                    <div>
                                        <Label className="mb-2" htmlFor="password" >Password</Label>
                                        <Input type="password" name="password" id="password" value={input.password} onChange={changeEventHandler} />
                                    </div>

                                    <div className='flex gap-6'>
                                        <div className="flex gap-2 items-center">
                                            <Input type="radio" name="role" id="admin" value="admin" onChange={changeEventHandler} />
                                            <Label htmlFor="admin" >Admin</Label>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <Input type="radio" name="role" id="superadmin" value="superadmin" onChange={changeEventHandler} />
                                            <Label htmlFor="superadmin" >Superadmin</Label>
                                        </div>
                                    </div>

                                    {
                                        (loading) ? <Button className="bg-blue-500 hover:bg-blue-400"><Loader2 className='animate-spin w-5 h-5 mr-2' /><span>Please wait..</span></Button> : <Button type="submit" className="mt-3 h-0 py-4 bg-blue-500 hover:bg-blue-400">Submit</Button>
                                    }
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                )
            }
        </div>
    )
}