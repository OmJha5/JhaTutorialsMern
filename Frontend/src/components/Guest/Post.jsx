import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import axios from "axios";
import { POST_API_ENDPOINT } from "@/utils/apiendpoint";
import { Loader2 } from "lucide-react";
import InternalServerError from "./InternalServerError";

export default function Post() {
    let params = useParams();
    let id = params.id;
    let [posts, setAllPosts] = useState([]);
    let [currPost, setCurrPost] = useState([]);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    let navigate = useNavigate();

    // This will convert any valid date into 22 Mar 2025 type format
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    useEffect(() => {

        let getTop9Post = async () => {
            try {
                setLoading(true);
                let res = await axios.get(`${POST_API_ENDPOINT}/gettop9`, { withCredentials: true });

                if (res.data.success) {
                    setAllPosts(res.data.topPosts);
                }
            }
            catch (e) {
                setError(true);
            }
            finally {
                setLoading(false);
            }
        }

        getTop9Post();
    }, [])

    useEffect(() => {
        const getCurrPost = async () => {
            try {
                let res = await axios.get(`${POST_API_ENDPOINT}/get/${id}`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    setCurrPost(res.data.post);
                }
            } catch (e) {
                setError(true);
            }
        };

        getCurrPost();
    }, [id]);

    if (error) {
        return <InternalServerError />
    }

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

                        <div className="max-w-[90%] mx-auto mt-6 max-sm:mt-3 p-6 max-md:p-4 max-sm:p-3 rounded-xl shadow-md">
                            <h1 className="bg-gray-200 p-4 max-sm:p-2 rounded-md text-xl max-sm:text-sm font-semibold text-center">
                                {currPost?.posttitle}
                            </h1>

                            <div className="flex flex-col gap-4 mt-6 max-sm:mt-3 text-gray-700">
                                <h2 className="max-sm:text-sm">
                                    <span className="text-green-700 font-bold">Post Name:</span>&nbsp;
                                    {currPost?.postname}
                                </h2>
                                <h2 className="max-sm:text-sm">
                                    <span className="text-green-700 font-bold">Total Vacancy:</span>&nbsp;
                                    {currPost?.totalvacancies}
                                </h2>
                                <h2 className="max-sm:text-sm">
                                    <span className="text-green-700 font-bold">Latest Update:</span>&nbsp;
                                    {formatDate(currPost?.updatedAt)}
                                </h2>
                                <h2 className="max-sm:text-sm">
                                    <span className="text-green-700 font-bold">Post Date:</span>&nbsp;
                                    {formatDate(currPost?.createdAt)}
                                </h2>
                            </div>

                            <div className="my-6 max-sm:my-3">
                                <p className="text-gray-800 max-sm:text-sm">
                                    <span className="text-red-600 font-bold">Brief Information:</span>&nbsp;
                                    <span className="">{currPost?.briefinformation}</span>
                                </p>
                            </div>

                            {/* Box Sections */}
                            <div className="flex flex-col p-4 max-sm:p-2">
                                <h1 className="text-2xl max-sm:text-sm my-4 max-sm:my-3 text-center font-semibold">
                                    {currPost?.postshortname}
                                </h1>

                                <div className="grid sm:grid-cols-2 gap-6 p-4 max-sm:p-0">
                                    {currPost?.boxes?.slice(0, -1).map((box) => (
                                        <div key={box?.id} className="p-5 max-sm:p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50" >
                                            <h2
                                                className="text-xl max-sm:text-lg font-normal text-center mb-2 !leading-snug"
                                                dangerouslySetInnerHTML={{ __html: box?.heading }}
                                            ></h2>
                                            <p
                                                className="text-gray-700 max-sm:text-sm"
                                                dangerouslySetInnerHTML={{ __html: box?.content }}
                                            ></p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tables Section */}
                            <div className="flex flex-col gap-4 my-4">
                                {currPost?.tables?.map((table) => (
                                    <div key={table?.id} className="overflow-x-auto border border-gray-200 shadow-md rounded-lg">
                                        <div className="w-full overflow-x-auto">
                                            <table className="w-full text-sm border-collapse">
                                                {/* Table Caption */}
                                                <caption className="text-lg max-sm:text-sm font-semibold bg-gray-100 text-center p-4 border-gray-300">
                                                    {table?.name}
                                                </caption>

                                                {/* Table Header */}
                                                <thead className="bg-blue-500 text-white uppercase text-center">
                                                    <tr>
                                                        {table?.headers?.map((header, index) => (
                                                            <th
                                                                key={index}
                                                                className="border border-gray-300 px-4 py-3 font-normal whitespace-nowrap"
                                                            >
                                                                <span dangerouslySetInnerHTML={{ __html: header }}></span>
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>

                                                {/* Table Body */}
                                                <tbody>
                                                    {table?.data?.map((row, rowIndex) => (
                                                        <tr
                                                            key={rowIndex}
                                                            className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                                                        >
                                                            {row?.map((cell, cellIndex) => (
                                                                <td
                                                                    key={cellIndex}
                                                                    className="border border-gray-300 px-4 py-3 whitespace-nowrap"
                                                                >
                                                                    <span className="flex flex-col items-center" dangerouslySetInnerHTML={{ __html: cell }}></span>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            {/* How to fill the form Box */}
                            <div className="my-8 max-sm:my-5">
                                {
                                    currPost?.boxes?.slice(-1)?.map((box) => {
                                        return (
                                            <div key={box?.id} className="p-5 max-sm:p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50" >
                                                <h2
                                                    className="text-xl max-sm:text-lg leading-snug font-normal text-center mb-3"
                                                    dangerouslySetInnerHTML={{ __html: box?.heading }}
                                                ></h2>
                                                <p
                                                    className="text-gray-700 max-sm:text-sm"
                                                    dangerouslySetInnerHTML={{ __html: box?.content }}
                                                ></p>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <h1 className="text-red-700 text-lg max-sm:text-sm font-semibold">
                                Click &nbsp;
                                <span className="underline text-blue-600 hover:text-blue-800">
                                    <a href={currPost?.notificationLink} target="_blank">
                                        Here
                                    </a>
                                </span>
                                &nbsp; to download the Notification PDF.
                            </h1>

                            {
                                (currPost?.officialwebsitelink) ? (
                                    <h1 className="text-red-700 text-lg max-sm:text-sm font-semibold my-3">
                                        Click &nbsp;
                                        <span className="underline text-blue-600 hover:text-blue-800">
                                            <a href={currPost?.officialwebsitelink} target="_blank">
                                                Here
                                            </a>
                                        </span>
                                        &nbsp; to visit the official website .
                                    </h1>
                                ) : ""
                            }

                            {
                                currPost?.youtubelink ? (
                                    <div>
                                        <h1 className="text-lg max-sm:text-sm font-semibold my-3">For More information about the post checkout the video</h1>
                                        <iframe src={currPost?.youtubelink} className="border border-gray-200 p-3 rounded-md" width={325} frameborder="0" allowFullScreen></iframe>
                                    </div>
                                ) : (
                                    ""
                                )
                            }

                            {/* Job Notifications Section */}
                            <div className="mt-8 max-sm:mt-4 bg-gray-50 p-6 rounded-lg shadow-md">
                                <h1 className="font-semibold text-lg text-gray-700">Job Notifications</h1>
                                <ul className="mt-3 space-y-2">
                                    {posts?.map((post) => (
                                        <li
                                            key={post._id}
                                            className="text-blue-600 cursor-pointer hover:underline max-sm:text-sm"
                                            onClick={() => navigate(`/post/${post._id}`)}
                                        >
                                            {post?.postname}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
