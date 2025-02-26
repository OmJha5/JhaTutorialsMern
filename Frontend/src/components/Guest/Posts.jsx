import React, { useEffect, useState } from 'react';
import Navbar from './Shared/Navbar';
import axios from 'axios';
import { POST_API_ENDPOINT } from '@/utils/apiendpoint';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Posts() {
  let [posts, setAllPosts] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        let res = await axios.get(`${POST_API_ENDPOINT}/get`, { withCredentials: true });

        if (res.data.success) {
          setAllPosts(res.data.allPosts);
        }
      } catch (e) {
        toast.error(e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    getAllPosts();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center py-20 text-lg">Loading...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-20 text-lg text-gray-500">No posts available</div>;
  }

  return (
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
  );
}
