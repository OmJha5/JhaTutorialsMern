import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Shared/Navbar'
import axios from 'axios';
import { POST_API_ENDPOINT } from '@/utils/apiendpoint';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { setQuery } from '@/redux/postSlice';
import { Loader2 } from 'lucide-react';

export default function Home() {
  let [posts, setPosts] = useState([]);
  let [twelthPosts, setTwelthPosts] = useState([])
  let [graduationAndPgPosts, setGraduationAndPgPosts] = useState([]);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  let categoryHandler = (e) => {
    let text = e.target.innerText;
    let result = text.replace(/\s+/g, '');
    dispatch(setQuery(result));
    navigate("/browse");
  }

  useEffect(() => {

    let getTop9Post = async () => {
      try {
        setLoading(true);
        let res = await axios.get(`${POST_API_ENDPOINT}/gettop9`, { withCredentials: true });

        if (res.data.success) {
          setPosts(res.data.topPosts);
        }
      }
      catch (e) {
        toast.error(e?.response?.data?.message);
      }
      finally {
        setLoading(false);
      }
    }

    getTop9Post();
  }, [])

  useEffect(() => {

    const getTwelthPassJobs = async () => {
      try {
        let res = await axios.get(`${POST_API_ENDPOINT}/getTop5TwelthPosts`, { withCredentials: true });

        if (res.data.success) {
          setTwelthPosts(res.data.topPosts);
        }
      }
      catch (e) {
        toast.error(e?.response?.data?.message)
      }
    }

    getTwelthPassJobs();
  }, [])

  useEffect(() => {

    const getPgAndGraduationPosts = async () => {
      try {
        let res = await axios.get(`${POST_API_ENDPOINT}/getTop5GraduationAndPgPost`, { withCredentials: true });

        if (res.data.success) {
          setGraduationAndPgPosts(res.data.topPosts);
        }
      }
      catch (e) {
        console.log(e);
        toast.error(e?.response?.data?.message)
      }
    }

    getPgAndGraduationPosts();
  }, [])


  const marqueeRef1 = useRef(null);
  const marqueeRef2 = useRef(null);
  const marqueeRef3 = useRef(null);
  // Without ref: The onMouseOver and onMouseOut events were only triggered on the Link element, not the parent <marquee>. So when you hovered over the Link, the marquee's stop() and start() methods weren't triggered.
  // With ref: You're directly controlling the parent <marquee> element via the ref, so the marquee's behavior is unaffected by where the mouse is, whether it’s on the parent or a child (Link). Events are not relying on bubbling and are applied directly to the marquee.

  return (
    <div>
      {
        loading ? (
          <div className='w-full h-screen flex justify-center items-center'>
            <Loader2 className='animate-spin' size={25} />
          </div>
        ) : (
          <div className=''>
            <Navbar />

            <div className='max-w-[85%] mx-auto'>
              {/* Notification Box */}
              <div className="border border-gray-300 p-4 my-6 rounded-lg shadow-lg bg-white">
                <h1 className="text-center text-xl font-semibold mb-3">Latest Notifications</h1>

                {/* First Group Marquee */}
                <marquee ref={marqueeRef1} direction="left" behavior="alternate" onMouseOver={() => marqueeRef1.current.stop()} onMouseOut={() => marqueeRef1.current.start()}>
                  {posts?.slice(0, 3).map((post, ind) => (
                    <Link key={ind} to={`/post/${post?._id}`} className="text-blue-700 font-semibold mx-6 underline hover:text-blue-800 transition-all">
                      {post?.postshortname}
                    </Link>
                  ))}
                </marquee>

                {/* Second Group Marquee */}
                <marquee ref={marqueeRef2} direction="left" behavior="alternate" onMouseOver={() => marqueeRef2.current.stop()} onMouseOut={() => marqueeRef2.current.start()}>
                  {posts?.slice(3, 6).map((post, ind) => (
                    <Link key={ind} to={`/post/${post?._id}`} className="text-blue-700 font-semibold mx-6 underline hover:text-blue-800 transition-all">
                      {post?.postshortname}
                    </Link>
                  ))}
                </marquee>

                {/* Third Group Marquee */}
                <marquee ref={marqueeRef3} direction="left" behavior="alternate" onMouseOver={() => marqueeRef3.current.stop()} onMouseOut={() => marqueeRef3.current.start()}>
                  {posts?.slice(6).map((post, ind) => (
                    <Link key={ind} to={`/post/${post?._id}`} className="text-blue-700 font-semibold mx-6 underline hover:text-blue-800 transition-all">
                      {post?.postshortname}
                    </Link>
                  ))}
                </marquee>
              </div>

              {/* Category */}

              <div className="grid grid-cols-5 gap-3 my-5">
                <Button className="bg-teal-500 text-white hover:bg-teal-600 transition-all p-3 rounded-md" onClick={categoryHandler}>Teaching</Button>
                <Button className="bg-red-500 text-white hover:bg-red-600 transition-all p-3 rounded-md" onClick={categoryHandler}>Defence Jobs</Button>
                <Button className="bg-blue-500 text-white hover:bg-blue-600 transition-all p-3 rounded-md" onClick={categoryHandler}>Banking Jobs</Button>
                <Button className="bg-yellow-500 text-white hover:bg-yellow-600 transition-all p-3 rounded-md" onClick={categoryHandler}>SSC Jobs</Button>
                <Button className="bg-green-500 text-white hover:bg-green-600 transition-all p-3 rounded-md" onClick={categoryHandler}>Railway Jobs</Button>
                <Button className="bg-indigo-500 text-white hover:bg-indigo-600 transition-all p-3 rounded-md" onClick={categoryHandler}>12th Level Jobs</Button>
                <Button className="bg-purple-500 text-white hover:bg-purple-600 transition-all p-3 rounded-md" onClick={categoryHandler}>Diploma Level Jobs</Button>
                <Button className="bg-orange-500 text-white hover:bg-orange-600 transition-all p-3 rounded-md" onClick={categoryHandler}>Graduation Jobs</Button>
                <Button className="bg-pink-500 text-white hover:bg-pink-600 transition-all p-3 rounded-md" onClick={categoryHandler}>PG Pass Jobs</Button>
                <Button className="bg-cyan-500 text-white hover:bg-cyan-600 transition-all p-3 rounded-md" onClick={categoryHandler}>Tech Jobs</Button>
              </div>

              <div className="grid sm:grid-cols-[repeat(auto-fit,minmax(370px,1fr))] gap-6 p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-lg">
                {/* All India 12th Pass Jobs Section */}
                <div className="border border-gray-300 rounded-lg p-6 bg-white h-[400px]">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 py-2 text-center border-b">All India 12th Pass Jobs</h2>

                  <marquee behavior="scroll" direction="up" scrolldelay="150" className="h-[80%]">
                    <div className="flex flex-col gap-3 text-center">
                      {twelthPosts?.map((post, ind) => (
                        (
                          <Link key={ind} to={`/post/${post?._id}`} className="text-blue-700 font-semibold mx-6 underline hover:text-blue-800 transition-all">
                            {post?.postshortname}
                          </Link>
                        )
                      ))}
                    </div>
                  </marquee>

                </div>

                {/* State Wise Jobs Section */}
                <div className="flex flex-col gap-4 p-6 border border-gray-300 rounded-lg bg-white">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center py-2 border-b">State Wise Jobs</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>Bihar</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>Haryana</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>Uttar Pradesh</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>Rajasthan</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>Jharkhand</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>West Bengal</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>Punjab</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>Uttrakhand</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>Delhi</Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={categoryHandler}>Madhya Pradesh</Button>
                  </div>
                </div>

                {/* All India Graduate & Post Graduate Jobs Section */}
                <div className="border border-gray-300 rounded-lg p-6 bg-white h-[400px]">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 py-2 text-center border-b">All India Graduate & Post Graduate Jobs</h2>

                  <marquee behavior="scroll" direction="up" scrolldelay="150" className="h-[80%]">
                    <div className="flex flex-col gap-3 text-center">
                      {graduationAndPgPosts?.map((post, ind) => (
                        (
                          <Link key={ind} to={`/post/${post?._id}`} className="text-blue-700 font-semibold mx-6 underline hover:text-blue-800 transition-all">
                            {post?.postshortname}
                          </Link>
                        )
                      ))}
                    </div>
                  </marquee>

                </div>
              </div>

            </div>
          </div>
        )
      }
    </div>
  )
}
