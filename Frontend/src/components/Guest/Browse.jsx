import { POST_API_ENDPOINT } from '@/utils/apiendpoint';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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

export default function Browse() {
    let { query } = useSelector((state) => state.post);
    let [posts, setPosts] = useState([]);

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
                let res = await axios.get(`${POST_API_ENDPOINT}/browse?keyword=${query}`, { withCredentials: true });

                if (res.data.success) {
                    setPosts(res.data.allPosts);
                }
            }
            catch (e) {
                console.log(e?.response?.data?.message);
            }
        }

        getAllPostsByQuery();
    }, [query])

    return (
        <div>
            <Navbar />

            <div className='w-[85%] mx-auto my-5'>
                <Table>
                    <TableCaption>A list of All {posts.length} Posts</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Post Date</TableHead>
                            <TableHead>Post</TableHead>
                            <TableHead>Total Vacancies</TableHead>
                            <TableHead>Last Date</TableHead>
                            <TableHead>Location</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            posts.map((post) => {
                                return <TableRow key={post._id}>
                                    <TableCell>{formatDate(post.createdAt)}</TableCell>
                                    <TableCell><Link to={`/post/${post._id}`} className='underline text-blue-500'>{post.postname}</Link></TableCell>
                                    <TableCell>{post.totalvacancies}</TableCell>
                                    <TableCell>{formatDate(post.endingdate)}</TableCell>
                                    <TableCell>{post.location}</TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </div>

        </div>
    )
}
