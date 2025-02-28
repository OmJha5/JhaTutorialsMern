import React, { useEffect, useState } from 'react';
import Navbar from './Shared/Navbar';
import axios from 'axios';
import { POST_API_ENDPOINT } from '@/utils/apiendpoint';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import InternalServerError from './InternalServerError';

export default function Posts() {
  let [posts, setAllPosts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);

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
        setError(true);
      }
      finally {
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

  const isNewPost = (createdAt) => {
    const postTime = new Date(createdAt);
    const now = new Date();
    const diffInHours = (now - postTime) / (1000 * 60 * 60); // Convert milliseconds to hours
    return diffInHours <= 6; // Returns true if within 6 hours
  };

  return (
    <div>
      {loading ? (
        <div className='w-full h-screen flex justify-center items-center'>
          <Loader2 className='animate-spin' size={25} />
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="w-[85%] mx-auto my-8">
            <h2 className="md:text-3xl max-md:text-2xl max-sm:text-xl font-bold mb-6 text-gray-800">
              All {posts.length} Posts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-8 max-sm:gap-3">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white border relative border-gray-300 p-6 max-sm:p-4 rounded-xl shadow-md hover:shadow-2xl transition-all ease-in-out duration-300 transform hover:scale-105"
                >
                  <Link
                    to={`/post/${post._id}`}
                    className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-all ease-in-out duration-200 max-sm:text-sm"
                  >
                    {post?.postname}
                  </Link>
                  {isNewPost(post.createdAt) && (
                    <span className="bg-red-500 absolute left-[-15px] top-[-8px] text-white text-xs font-bold px-2 py-1 rounded">
                      New
                    </span>
                  )}
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
      )}
    </div>
  );

}
