import { POST_API_ENDPOINT } from '@/utils/apiendpoint';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './Shared/Navbar';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Link } from 'react-router-dom';
import { setQuery } from '@/redux/postSlice';
import { Loader2 } from 'lucide-react';

export default function Browse() {
    let { query } = useSelector((state) => state.post);
    let [posts, setPosts] = useState([]);
    let dispatch = useDispatch();
    let [loading, setLoading] = useState(false);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    useEffect(() => {
        let getAllPostsByQuery = async () => {
            try {
                setLoading(true);
                let res = await axios.get(`${POST_API_ENDPOINT}/browse?keyword=${query}`, { withCredentials: true });

                if (res.data.success) {
                    setPosts(res.data.allPosts);
                }
            }
            catch (e) {
                console.log(e?.response?.data?.message);
            }
            finally {
                setLoading(false);
            }
        }

        getAllPostsByQuery();
    }, [query])

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            // Dispatch the action when the user leaves the page
            dispatch(setQuery(""));  // Set query to an empty string
        };

        // Attach the beforeunload event listener
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dispatch]);

    return (
        <div>
            {
                loading ? (
                    <div className='w-full h-screen flex justify-center items-center'>
                        <Loader2 className='animate-spin' size={25} />
                    </div>
                ) : (
                    <div>
                        <Navbar />

                        <div className="w-[85%] mx-auto my-8">
                            <h2 className="md:text-3xl max-md:text-2xl max-sm:text-xl font-bold mb-6 text-gray-800">All {posts.length} Posts</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-8 max-sm:gap-3">
                                {posts.map((post) => (
                                    <div
                                        key={post._id}
                                        className="bg-white border border-gray-300 p-6 max-sm:p-4 rounded-xl shadow-md hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105"
                                    >
                                        <Link
                                            to={`/post/${post._id}`}
                                            className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-all ease-in-out duration-200 max-sm:text-sm"
                                        >
                                            {post?.postname}
                                        </Link>
                                        <div className="mt-4 sm:mt-2 text-gray-700">
                                            <p>
                                                <span className="font-medium text-sm">Last Date: </span>
                                                <span className="text-red-600 text-sm">{formatDate(post.endingdate)}</span>
                                            </p>
                                            <p>
                                                <span className="font-medium text-sm">Total Vacancies: </span>
                                                <span className="text-sm">{post?.totalvacancies}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}
