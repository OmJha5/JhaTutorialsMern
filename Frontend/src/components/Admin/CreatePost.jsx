import React, { useState } from 'react'
import JobCommonInfo from './PostCommonInfo'
import { ArrowLeft } from "lucide-react";
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import useCheckUser from '@/hooks/useCheckUser';
import { useSelector } from 'react-redux';
import NavAdmin from './NavAdmin';  
import NotificationBox from './NotificationBox';  
import Tables from './Tables';
import { toast } from 'sonner';
import axios from 'axios';
import { POST_API_ENDPOINT } from '@/utils/apiendpoint';

export default function CreatePost() {
    useCheckUser();
    let {user} = useSelector((state) => state.user)
    let [tables , setTables] = useState([]);
    let [boxes , setBoxes] = useState([]); // Notification box
    let navigate = useNavigate();
    let [commonInfo , setCommonInfo] = useState({
        posttitle : "" , postname : "" , postshortname : "" , totalvacancies : "" , briefinformation : "" , startingdate : "" , endingdate : "" , qualification : "" , applylink : "" , postcategory : "" , location : "", file : "",
    });

    let isFormValid = () => {
        if(commonInfo.posttitle == "" || commonInfo.postname == "" || commonInfo.postshortname == "" || isNaN(commonInfo.totalvacancies) || commonInfo.briefinformation == "" || commonInfo.startingdate == "" || commonInfo.endingdate == "" || commonInfo.qualification == "" || commonInfo.applylink == "" || commonInfo.postcategory == "" || commonInfo.location == "" || commonInfo.file == ""){
            toast.error("All Fields are required!")
            return false;
        }
        return true;
    }

    let submitHandler = async() => {
        if(isFormValid()){
            try{

                let allTables = tables?.map(({id , ...rest}) => rest);
                let allBoxes = boxes?.map(({id , ...rest}) => rest);

                let data = new FormData();
                data.append("posttitle" , commonInfo.posttitle);
                data.append("postname" , commonInfo.postname);
                data.append("postshortname" , commonInfo.postshortname);
                data.append("totalvacancies" , commonInfo.totalvacancies);
                data.append("briefinformation" , commonInfo.briefinformation);
                data.append("startingdate" , commonInfo.startingdate);
                data.append("endingdate" , commonInfo.endingdate);
                data.append("qualification" , commonInfo.qualification);
                data.append("applylink" , commonInfo.applylink);
                data.append("postcategory" , commonInfo.postcategory);
                data.append("location" , commonInfo.location);
                data.append("file" , commonInfo.file);

                // ✅ Convert objects to JSON before appending
                data.append("tables", JSON.stringify(allTables));
                data.append("boxes", JSON.stringify(allBoxes));

                let res = await axios.post(`${POST_API_ENDPOINT}/create` , data , {
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    },
                    withCredentials : true
                })

                if(res.data.success){
                    toast.success(res.data.message);
                    navigate("/admin/posts");
                }
            }
            catch(e){
                console.log(e);
                toast.error(e?.response?.data?.message);
            }
        }
    }

    return (

        <div className="flex h-fit flex-col md:flex-row relative">
            <NavAdmin />

            {/* Main Content */}
            <div className="flex-1 p-6 md:ml-80 max-md:mt-16 transition-all duration-300 ease-in-out flex gap-5 flex-col">
                <h1 className='text-4xl font-medium'>Create Post</h1>
                <div>
                    <Button onClick={() => navigate("/admin/posts")}><ArrowLeft size={24} /> <span className='ml-2'>Back</span></Button>
                </div>

                <div>
                    <JobCommonInfo commonInfo={commonInfo} setCommonInfo={setCommonInfo} />
                </div>

                {/* Tables */}
                <Tables tables={tables} setTables={setTables} />

                {/* Notification Box */}
                <NotificationBox boxes={boxes} setBoxes={setBoxes} />

                <Button className="my-10 w-fit" onClick={submitHandler}>Add Post</Button>
            </div>


        </div>

    )
}
