import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import axios from "axios";
import { POST_API_ENDPOINT } from "@/utils/apiendpoint";
import { Loader2 } from "lucide-react";
import InternalServerError from "./InternalServerError";
import Footer from "./Shared/Footer";

export default function Post() {
    let params = useParams();
    let id = params.id;
    let [posts, setAllPosts] = useState([]);
    let [currPost, setCurrPost] = useState([]);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        if(currPost?.postshortname) document.title = currPost?.postshortname
    } , [currPost])

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

    return (
        <div>
            {
                error ? (
                    <InternalServerError />
                ) : (
                    <div>
                        {
                            loading ? (
                                <div className='w-full h-screen flex justify-center items-center'>
                                    <Loader2 className='animate-spin' size={25} />
                                </div>
                            ) : (
                                <div>
                                    <Navbar />

                                    <div className="max-w-[90%] max-sm:max-w-[95%] mx-auto mt-6 max-sm:mt-3 p-6 max-md:p-4 max-sm:px-3 max-sm:py-4 rounded-xl shadow-md">
                                        <h1 className="bg-gray-200 sm:mb-2 p-4 max-sm:p-2 rounded-md text-xl max-sm:text-sm font-semibold max-sm:text-center">
                                            {currPost?.posttitle}
                                        </h1>
                                        <span className="text-gray-500 max-sm:text-xs">
                                            Last Updated at <span className="font-medium text-gray-700">{formatDate(currPost?.updatedAt)}</span>
                                        </span>


                                        <div className="flex flex-col gap-4 max-sm:gap-3 mt-6 max-sm:mt-3 text-gray-700">
                                            <h2 className="max-sm:text-sm">
                                                <span className="text-green-700 font-bold">Post Name:</span>&nbsp;
                                                <span className="max-sm:text-xs">{currPost?.postname}</span>
                                            </h2>
                                            <h2 className="max-sm:text-sm">
                                                <span className="text-green-700 font-bold">Total Vacancy:</span>&nbsp;

                                                <span className="max-sm:text-xs">{currPost?.totalvacancies}</span>
                                            </h2>
                                            <h2 className="max-sm:text-sm">
                                                <span className="text-green-700 font-bold">Post Date:</span>&nbsp;

                                                <span className="max-sm:text-xs">{formatDate(currPost?.createdAt)}</span>
                                            </h2>
                                        </div>

                                        <div className="my-6 max-sm:my-3">
                                            <p className="text-gray-800 max-sm:text-xs">
                                                <span className="text-red-600 font-bold">Brief Information:</span>&nbsp;
                                                <span className="">{currPost?.briefinformation}</span>
                                            </p>
                                        </div>

                                        {/* Box Sections */}
                                        <div className={`flex flex-col ${currPost?.boxes?.length >= 1 ? "my-7 max-sm:my-4" : ""} `}>

                                            <div className="grid sm:grid-cols-2 gap-6 max-sm:p-0 max-sm:justify-items-center">
                                                {currPost?.boxes?.slice(0, -1).map((box) => (
                                                    <div key={box?.id} className="max-sm:p-3 border border-gray-300 rounded-lg shadow-sm p-4 bg-gray-50" >
                                                        <h2
                                                            className="text-xl max-sm:text-base font-normal text-center mb-2 !leading-snug"
                                                            dangerouslySetInnerHTML={{ __html: box?.heading }}
                                                        ></h2>
                                                        <p
                                                            className="text-gray-700 max-sm:text-xs"
                                                            dangerouslySetInnerHTML={{ __html: box?.content }}
                                                        ></p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tables Section */}
                                        <div className="flex flex-col gap-4 mb-4">
                                            {currPost?.tables?.map((table) => (
                                                <div key={table?.id} className="max-sm:overflow-x-auto border border-gray-200 shadow-md rounded-lg">
                                                    <div className="w-full max-sm:overflow-x-auto">
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
                                                                            className="border border-gray-300 px-4 py-3 font-normal max-sm:whitespace-nowrap"
                                                                        >
                                                                            <span className="max-sm:text-xs" dangerouslySetInnerHTML={{ __html: header }}></span>
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
                                                                                className="border border-gray-300 px-4 py-3 max-sm:whitespace-nowrap"
                                                                            >
                                                                                <span className="flex flex-col items-center max-sm:text-xs" dangerouslySetInnerHTML={{ __html: cell }}></span>
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
                                                                className="text-xl max-sm:text-base leading-snug font-normal text-center mb-3"
                                                                dangerouslySetInnerHTML={{ __html: box?.heading }}
                                                            ></h2>
                                                            <p
                                                                className="text-gray-700 max-sm:text-xs"
                                                                dangerouslySetInnerHTML={{ __html: box?.content }}
                                                            ></p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div className="max-sm:overflow-x-auto border border-gray-200 shadow-md rounded-lg my-10 max-sm:my-6">
                                            <table className="w-full text-sm border-collapse">
                                                <caption className="text-lg max-sm:text-sm font-semibold bg-gray-100 text-center p-4 border-gray-300">
                                                    Some Important Links
                                                </caption>
                                                <tbody className="w-[50%]">
                                                    {/* Notification PDF Link */}
                                                    <tr>
                                                        <td className="px-4 py-2 font-semibold text-red-700 max-sm:text-xs">Download Notification PDF</td>
                                                        <td className="px-4 py-2 text-right max-sm:text-xs">
                                                            <a
                                                                href={currPost?.notificationLink}
                                                                target="_blank"
                                                                className="underline text-blue-600 hover:text-blue-800"
                                                            >
                                                                Click Here
                                                            </a>
                                                        </td>
                                                    </tr>

                                                    {/* Official Website Link (if available) */}
                                                    {currPost?.officialwebsitelink && (
                                                        <tr className="">
                                                            <td className="px-4 py-2 font-semibold text-red-700 max-sm:text-xs">Visit Official Website</td>
                                                            <td className="px-4 py-2 text-right max-sm:text-xs">
                                                                <a
                                                                    href={currPost?.officialwebsitelink}
                                                                    target="_blank"
                                                                    className="underline text-blue-600 hover:text-blue-800"
                                                                >
                                                                    Click Here
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    {/* Admit Card Link (if available) */}
                                                    {currPost?.admitCard && (
                                                        <tr>
                                                            <td className="px-4 py-2 font-semibold text-red-700 max-sm:text-xs">View Associated Admit Card</td>
                                                            <td className="px-4 py-2 text-right max-sm:text-xs">
                                                                <Link
                                                                    to={`/admitcards/${currPost?.admitCard}`}
                                                                    target="_blank"
                                                                    className="underline text-blue-600 hover:text-blue-800"
                                                                >
                                                                    Click Here
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    {/* Answer Key Link (if available) */}
                                                    {currPost?.answerKey && (
                                                        <tr>
                                                            <td className="px-4 py-2 font-semibold text-red-700 max-sm:text-xs">View Associated Answer Key</td>
                                                            <td className="px-4 py-2 text-right max-sm:text-xs">
                                                                <Link
                                                                    to={`/answerkeys/${currPost?.answerKey}`}
                                                                    target="_blank"
                                                                    className="underline text-blue-600 hover:text-blue-800"
                                                                >
                                                                    Click Here
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {
                                            currPost?.youtubelink ? (
                                                <div>
                                                    <h1 className="text-lg max-sm:text-sm font-semibold my-3">For More information about the post checkout the video</h1>
                                                    <iframe src={currPost?.youtubelink} className="border border-gray-200 p-3 rounded-md sm:w-[400px] max-sm:w-[300px]" frameborder="0" allowFullScreen></iframe>
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
                                                        className="text-blue-600 cursor-pointer hover:underline max-sm:text-xs"
                                                        onClick={() => navigate(`/post/${post._id}`)}
                                                    >
                                                        {post?.postname}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <Footer/>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}
