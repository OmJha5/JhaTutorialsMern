import React, { useRef } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function PostCommonInfo({ commonInfo, setCommonInfo }) {
    let inputRef = useRef();
    return (
        <Card className="p-6 shadow-md rounded-2xl bg-white">
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <Label htmlFor="posttitle">Post Title</Label>
                    <Input id="posttitle" placeholder="Enter post title" value={commonInfo.posttitle} 
                        onChange={(e) => setCommonInfo({ ...commonInfo, posttitle: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="postname">Post Name</Label>
                        <Input id="postname" placeholder="Enter post Name" value={commonInfo.postname} 
                            onChange={(e) => setCommonInfo({ ...commonInfo, postname: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="postshortname">Post Short Name</Label>
                        <Input id="postshortname" placeholder="Enter post Short name" value={commonInfo.postshortname} 
                            onChange={(e) => setCommonInfo({ ...commonInfo, postshortname: e.target.value })} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Label htmlFor="applylink">Apply Link</Label>
                    <Input id="applylink" placeholder="Enter post apply link" value={commonInfo.applylink} 
                        onChange={(e) => setCommonInfo({ ...commonInfo, applylink: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="startingdate">Starting Date</Label>
                        <Input id="startingdate" type="date" value={commonInfo.startingdate} 
                            onChange={(e) => setCommonInfo({ ...commonInfo, startingdate: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="endingdate">Ending Date</Label>
                        <Input id="endingdate" type="date" value={commonInfo.endingdate} 
                            onChange={(e) => setCommonInfo({ ...commonInfo, endingdate: e.target.value })} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="totalvacancies">Total Vacancies</Label>
                        <Input id="totalvacancies" placeholder="Enter total vacancies" value={commonInfo.totalvacancies} 
                            onChange={(e) => setCommonInfo({ ...commonInfo, totalvacancies: e.target.value })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="qualification">Qualification</Label>
                        <Input id="qualification" placeholder="Enter Qualification (Comma separated)" value={commonInfo.qualification} 
                            onChange={(e) => setCommonInfo({ ...commonInfo, qualification: e.target.value })} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter Location (Comma separated)" value={commonInfo.location} 
                        onChange={(e) => setCommonInfo({ ...commonInfo, location: e.target.value })} />
                </div>

                <div className="flex flex-col gap-4">
                    <Label>Post Category</Label>
                    <Select value={commonInfo.postcategory}  onValueChange={(value) => setCommonInfo({ ...commonInfo, postcategory: value })}>
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

                <div className="flex flex-col gap-4">
                    <Label htmlFor="briefinformation">Brief Information</Label>
                    <Textarea id="briefinformation" placeholder="Enter brief information about the post" rows={3} 
                        value={commonInfo.briefinformation} 
                        onChange={(e) => setCommonInfo({ ...commonInfo, briefinformation: e.target.value })} />
                </div>

                <div className="flex flex-col gap-4">
                    <Label>Notification PDF</Label>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="flex items-center gap-2" onClick={() => inputRef.current.click()}>
                            <Upload size={16} /> Upload File
                            <Input ref={inputRef} type="file" className="hidden" onChange={(e) => setCommonInfo({ ...commonInfo, file: e?.target?.files?.[0] })} />
                        </Button>
                        {commonInfo.file && <span className="text-sm text-gray-600">{commonInfo.file.name}</span>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}