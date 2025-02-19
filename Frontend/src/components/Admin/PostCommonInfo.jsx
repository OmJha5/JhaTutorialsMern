import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '../ui/textarea'

export default function PostCommonInfo({ commonInfo, setCommonInfo }) {
    return (
        <div>
            <div className="flex flex-col gap-7 p-4 rounded-md shadow-lg mb-10">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="posttitle">Post Title</Label>
                    <Input id="posttitle" placeholder="Enter post title" value={commonInfo.posttitle} onChange={(e) => setCommonInfo({ ...commonInfo, posttitle: e.target.value })} />
                </div>

                <div className="flex gap-3">
                    <div className="flex flex-col flex-1 gap-3">
                        <Label htmlFor="postname">Post Name</Label>
                        <Input id="postname" placeholder="Enter post Name" value={commonInfo.postname} onChange={(e) => setCommonInfo({ ...commonInfo, postname: e.target.value })} />
                    </div>

                    <div className="flex flex-col flex-1 gap-3">
                        <Label htmlFor="postshortname">Post ShortName</Label>
                        <Input id="postshortname" placeholder="Enter post Short name" value={commonInfo.postshortname} onChange={(e) => setCommonInfo({ ...commonInfo, postshortname: e.target.value })} />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Label htmlFor="applylink">Apply Link</Label>
                    <Input id="applylink" placeholder="Enter post apply link" value={commonInfo.applylink} onChange={(e) => setCommonInfo({ ...commonInfo, applylink: e.target.value })} />
                </div>


                <div className="flex gap-3">
                    <div className="flex flex-col flex-1 gap-3">
                        <Label htmlFor="startingdate">Starting Date</Label>
                        <Input id="startingdate" placeholder="Starting Date" value={commonInfo.startingdate} onChange={(e) => setCommonInfo({ ...commonInfo, startingdate: e.target.value })} />
                    </div>

                    <div className="flex flex-col flex-1 gap-3">
                        <Label htmlFor="endingdate">Ending Date</Label>
                        <Input id="endingdate" placeholder="Enter post Short name" value={commonInfo.endingdate} onChange={(e) => setCommonInfo({ ...commonInfo, endingdate: e.target.value })} />
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="flex flex-col flex-1 gap-3">
                        <Label htmlFor="totalvacancies">Total Vacancies</Label>
                        <Input id="totalvacancies" placeholder="Enter total vacancies" value={commonInfo.totalvacancies} onChange={(e) => setCommonInfo({ ...commonInfo, totalvacancies: e.target.value })} />
                    </div>

                    <div className="flex flex-col flex-1 gap-3">
                        <Label htmlFor="qualification">Qualification</Label>
                        <Input id="qualification" placeholder="Enter Qualification(Comma seperated)" value={commonInfo.qualification} onChange={(e) => setCommonInfo({ ...commonInfo, qualification: e.target.value })} />
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-3">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter Location(comma seperated) eg: All India , ..." value={commonInfo.location} onChange={(e) => setCommonInfo({ ...commonInfo, location: e.target.value })} />
                </div>

                <div className="flex flex-1 gap-3 items-end">
                    <Select onValueChange={(value) => setCommonInfo({ ...commonInfo, postcategory: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select the post category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="teaching">Teaching</SelectItem>
                            <SelectItem value="defencejobs">Defence Jobs</SelectItem>
                            <SelectItem value="bankingjobs">Banking Jobs</SelectItem>
                            <SelectItem value="sscjobs">SSC Jobs</SelectItem>
                            <SelectItem value="railwayjobs">Railway Jobs</SelectItem>
                            <SelectItem value="12thleveljobs">12th Level Jobs</SelectItem>
                            <SelectItem value="diplomaleveljobs">Diploma Level Jobs</SelectItem>
                            <SelectItem value="graduationjobs">Graduation Jobs</SelectItem>
                            <SelectItem value="pgpassjobs">PG Pass Jobs</SelectItem>
                            <SelectItem value="techjobs">Tech Jobs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col flex-1 gap-3'>
                    <Label htmlFor="briefinformation">Brief Information</Label>
                    <Textarea placeholder="Enter brief information about the post" id={"briefinformation"} rows={3} value={commonInfo.briefinformation} onChange={(e) => setCommonInfo({ ...commonInfo, briefinformation: e.target.value })} />
                </div>

                <div className='flex flex-col flex-1 gap-3'>
                    <Label htmlFor="location">Notification PDF</Label>
                    <Input type="file" id="location" onChange={(e) => setCommonInfo({ ...commonInfo, file: e?.target?.files?.[0] })} />
                </div>

            </div>
            



        </div>
    )
}
