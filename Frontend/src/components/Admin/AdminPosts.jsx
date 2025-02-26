import useCheckUser from '@/hooks/useCheckUser';
import React, { useEffect } from 'react'
import { useState } from "react";
import NavAdmin from './NavAdmin';
import AdminPostsTable from './AdminPostsTable';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import axios from 'axios';
import { POST_API_ENDPOINT } from '@/utils/apiendpoint';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function AdminPosts() {
    useCheckUser();
    let { user } = useSelector((state) => state.user)
    let navigate = useNavigate();
    let [posts, setAllPosts] = useState([]);
    let [filteredPosts, setFilteredPosts] = useState([]);
    let [loading, setLoading] = useState(false);

    useEffect(() => {

        const getAllPosts = async () => {
            try {
                setLoading(true);
                let res = await axios.get(`${POST_API_ENDPOINT}/get`, { withCredentials: true });

                if (res.data.success) {
                    setAllPosts(res.data.allPosts);
                }
            }
            catch (e) {
                toast.error(e?.response?.data?.message)
            }
            finally {
                setLoading(false);
            }
        }

        getAllPosts();
    }, [])

    useEffect(() => {
        setFilteredPosts(posts);
    }, [posts])

    let filterHandler = (e) => {
        let text = e.target.value;

        let updatedAllPosts = posts.filter((post) =>
            post.posttitle.toLowerCase().includes(text.toLowerCase()) || post.briefinformation.toLowerCase().includes(text.toLowerCase())
            || post.location.toLowerCase().includes(text.toLowerCase()) || post.qualification.toLowerCase().includes(text.toLowerCase())
            || post.postcategory.toLowerCase().includes(text.toLowerCase())
        )

        setFilteredPosts(updatedAllPosts)

    }

    return (
        <div>
            {
                loading ? (
                    <div className='w-full h-screen flex justify-center items-center'>
                        <Loader2 className='animate-spin' size={25} />
                    </div>
                ) : (
                    <div className="flex h-screen flex-col md:flex-row relative">
                        <NavAdmin />

                        {/* Main Content */}
                        <div className="flex-1 p-6 md:ml-80 max-md:mt-16 transition-all duration-300 ease-in-out mr-16">
                            <div className="flex justify-between">
                                <Input placeholder="Filter by Any Thing" className="w-fit" onChange={filterHandler} autoFocus onFocus={(e) => e.target.focus()} />
                                <Button className="bg-blue-500 hover:bg-blue-400 hover:cursor-pointer" onClick={() => navigate("/admin/posts/create")}>Create</Button>
                            </div>

                            <AdminPostsTable posts={posts} setAllPosts={setAllPosts} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} />

                        </div>
                    </div>
                )
            }
        </div>
    );
}
