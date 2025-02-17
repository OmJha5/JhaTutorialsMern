import React, { useState } from 'react'
import JobCommonInfo from './JobCommonInfo'
import { ArrowLeft } from "lucide-react";
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import useCheckUser from '@/hooks/useCheckUser';
import { useSelector } from 'react-redux';
import NavAdmin from './NavAdmin';

export default function CreateJob() {
    useCheckUser();
    let {user} = useSelector((state) => state.user)
    let navigate = useNavigate();
    let [commonInfo , setCommonInfo] = useState({
        posttitle : "" , postname : "" , postshortname : "" , totalvacancies : "" , briefinformation : "" , startingdate : "" , endingdate : "" , qualification : "" , applylink : "" , postcategory : "" , location : "", file : "",
    });

    return (

        <div className="flex h-screen flex-col md:flex-row relative">
            <NavAdmin />

            {/* Main Content */}
            <div className="flex-1 p-6 md:ml-80 max-md:mt-16 transition-all duration-300 ease-in-out flex gap-10 flex-col">
                <h1 className='text-4xl font-medium'>Create Job</h1>
                <div>
                    <Button onClick={() => navigate("/admin/jobs")}><ArrowLeft size={24} /> <span className='ml-2'>Back</span></Button>
                </div>

                <div>
                    <JobCommonInfo commonInfo={commonInfo} setCommonInfo={setCommonInfo} />
                </div>
            </div>
        </div>

    )
}
