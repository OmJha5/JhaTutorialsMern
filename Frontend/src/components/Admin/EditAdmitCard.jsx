import React, { useEffect, useState } from 'react'
import JobCommonInfo from './PostCommonInfo'
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from '../ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import useCheckUser from '@/hooks/useCheckUser';
import { useSelector } from 'react-redux';
import NavAdmin from './NavAdmin';
import NotificationBox from './NotificationBox';
import Tables from './Tables';
import { toast } from 'sonner';
import axios from 'axios';
import { ADMITCARD_API_ENDPOINT, POST_API_ENDPOINT } from '@/utils/apiendpoint';
import InternalServerError from '../Guest/InternalServerError';

export default function EditPost() {
    useCheckUser();
    let { user } = useSelector((state) => state.user)
    let [tables, setTables] = useState([]);
    let [boxes, setBoxes] = useState([]); // Notification box
    let navigate = useNavigate();
    let [commonInfo, setCommonInfo] = useState({
        posttitle: "", postname: "", postshortname: "", totalvacancies: "", briefinformation: "", startingdate: "", endingdate: "", qualification: "", applylink: "", youtubelink: "", officialwebsitelink: "", postcategory: "", location: "", file: "", handpicked: false , associatedPost : ""
    });
    let [loading, setLoading] = useState(false);
    let [pageLoading, setPageLoading] = useState(false);
    let { id } = useParams();
    let [error, setError] = useState(false);

    useEffect(() => {
          document.title = "Jha Tutorials | Edit Admit Card"
    } , [])

    useEffect(() => {
        let getCurrAdmitCard = async () => {
            try {
                setPageLoading(true);
                let res = await axios.get(`${ADMITCARD_API_ENDPOINT}/get/${id}`, { withCredentials: true });

                if (res.data.success) {
                    let post = res.data.admitCard;

                    setCommonInfo({
                        posttitle: post.posttitle,
                        postname: post.postname,
                        postshortname: post.postshortname,
                        totalvacancies: post.totalvacancies,
                        briefinformation: post.briefinformation,
                        startingdate: post.startingdate,
                        endingdate: post.endingdate,
                        qualification: post.qualification,
                        applylink: post.applylink,
                        youtubelink: post.youtubelink,
                        officialwebsitelink: post.officialwebsitelink,
                        postcategory: post.postcategory,
                        location: post.location,
                        handpicked: post.handpicked,
                        associatedPost : post.associatedPost._id
                    })

                    setBoxes(post.boxes);
                    setTables(post.tables);
                }
            }
            catch (e) {
                setError(true);
            }
            finally {
                setPageLoading(false);
            }
        }
        getCurrAdmitCard();
    }, [])

    let isFormValid = () => {
        if (commonInfo.posttitle == "" || commonInfo.postname == "" || commonInfo.postshortname == "" || isNaN(commonInfo.totalvacancies) || commonInfo.briefinformation == "" || commonInfo.startingdate == "" || commonInfo.endingdate == "" || commonInfo.qualification == "" || commonInfo.applylink == "" || commonInfo.postcategory == "" || commonInfo.location == "" || commonInfo.file == "" || commonInfo.associatedPost == "") {
            toast.error("All Fields are required!")
            return false;
        }
        return true;
    }

    let submitHandler = async () => {
        if (isFormValid()) {
            try {

                setLoading(true);

                let data = new FormData();
                data.append("posttitle", commonInfo.posttitle);
                data.append("postname", commonInfo.postname);
                data.append("postshortname", commonInfo.postshortname);
                data.append("totalvacancies", commonInfo.totalvacancies);
                data.append("briefinformation", commonInfo.briefinformation);
                data.append("startingdate", commonInfo.startingdate);
                data.append("endingdate", commonInfo.endingdate);
                data.append("qualification", commonInfo.qualification);
                data.append("applylink", commonInfo.applylink);
                data.append("youtubelink", commonInfo.youtubelink);
                data.append("officialwebsitelink", commonInfo.officialwebsitelink);
                data.append("postcategory", commonInfo.postcategory);
                data.append("location", commonInfo.location);
                data.append("handpicked", commonInfo.handpicked);
                data.append("associatedPost", commonInfo.associatedPost);
                if (commonInfo.file) data.append("file", commonInfo.file);

                // ✅ Convert objects to JSON before appending
                data.append("tables", JSON.stringify(tables));
                data.append("boxes", JSON.stringify(boxes));

                let res = await axios.post(`${ADMITCARD_API_ENDPOINT}/edit/${id}`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                })

                if (res.data.success) {
                    toast.success(res.data.message);
                    navigate("/admin/admitcard");
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

    return (

        <div>
            {error ? (
                <InternalServerError />
            ) : pageLoading ? (
                <div className='w-full h-screen flex justify-center items-center'>
                    <Loader2 className='animate-spin' size={25} />
                </div>
            ) : (
                <div className="flex h-fit flex-col md:flex-row relative">
                    <NavAdmin />

                    {/* Main Content */}
                    <div className="flex-1 p-6 max-sm:p-3 md:ml-80 max-md:mt-16 transition-all duration-300 ease-in-out flex gap-5 flex-col">
                        <h1 className='text-4xl max-sm:text-2xl font-medium mt-4'>Edit Admit Card</h1>
                        <div>
                            <Button onClick={() => navigate("/admin/admitcard")}><ArrowLeft size={24} /> <span className='ml-2'>Back</span></Button>
                        </div>

                        <div>
                            <JobCommonInfo commonInfo={commonInfo} setCommonInfo={setCommonInfo} />
                        </div>

                        {/* Tables */}
                        <Tables tables={tables} setTables={setTables} />

                        {/* Notification Box */}
                        <NotificationBox boxes={boxes} setBoxes={setBoxes} />

                        {
                            loading ? <Button className="my-10 w-fit"><Loader2 className='animate-spin' /> <span className='ml-2'>please wait..</span></Button> : <Button className="my-10 w-fit" onClick={submitHandler}>Edit</Button>
                        }
                    </div>


                </div>
            )
            }
        </div>

    )
}
