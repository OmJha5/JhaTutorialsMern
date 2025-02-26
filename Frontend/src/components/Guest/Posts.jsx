import React, { useEffect, useState } from 'react'
import Navbar from './Shared/Navbar'
import axios from 'axios';
import { POST_API_ENDPOINT } from '@/utils/apiendpoint';
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

export default function Posts() {
  let [posts, setAllPosts] = useState([]);

  useEffect(() => {

    const getAllPosts = async () => {
      try {
        let res = await axios.get(`${POST_API_ENDPOINT}/get`, { withCredentials: true });

        if (res.data.success) {
          setAllPosts(res.data.allPosts);
        }
      }
      catch (e) {
        toast.error(e?.response?.data?.message)
      }
    }

    getAllPosts();
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

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
                  <TableCell>{post.endingdate}</TableCell>
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