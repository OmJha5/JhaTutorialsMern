import React, { useEffect, useRef, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export default function PostCommonInfo({ commonInfo, setCommonInfo }) {
    let inputRef = useRef();
    const [value, setValue] = useState(
        commonInfo?.postcategory?.trim() ? commonInfo.postcategory.split(" ") : [] // If commonInfo.postcategory is "" to handle that we are using trim() so that createPost will not face issues
    ) // for multiple select -- Here it is an array but in db will store it in string containing many values

    useEffect(() => {
        const str = value.join(" ");
        setCommonInfo({...commonInfo , postcategory : str})
    } , [value])

    const frameworks = [
        { value: 'teaching', label: 'Teaching' },
        { value: 'defencejobs', label: 'Defence Jobs' },
        { value: 'bankingjobs', label: 'Banking Jobs' },
        { value: 'sscjobs', label: 'SSC Jobs' },
        { value: 'railwayjobs', label: 'Railway Jobs' },
        { value: '12thleveljobs', label: '12th Level Jobs' },
        { value: 'diplomaleveljobs', label: 'Diploma Level Jobs' },
        { value: 'graduationjobs', label: 'Graduation Jobs' },
        { value: 'pgpassjobs', label: 'PG Pass Jobs' },
        { value: 'techjobs', label: 'Tech Jobs' }
    ];

    let handleSetValue = (val) => {
        if(value.includes(val)){
            setValue(value.filter((v) => v != val));
        }
        else{
            setValue([...value , val]);
        }
    }

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

                <div className="flex flex-col gap-4">
                    <Label htmlFor="youtubelink">Youtube link</Label>
                    <Input id="youtubelink" placeholder="Enter YT video link" value={commonInfo.youtubelink}
                        onChange={(e) => setCommonInfo({ ...commonInfo, youtubelink: e.target.value })} />
                </div>

                <div className="flex flex-col gap-4">
                    <Label htmlFor="officialwebsitelink">Official Website Link</Label>
                    <Input id="officialwebsitelink" placeholder="Enter official website link" value={commonInfo.officialwebsitelink}
                        onChange={(e) => setCommonInfo({ ...commonInfo, officialwebsitelink: e.target.value })} />
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
                        <Input id="qualification" placeholder="Enter Qualification" value={commonInfo.qualification}
                            onChange={(e) => setCommonInfo({ ...commonInfo, qualification: e.target.value })} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter Location" value={commonInfo.location}
                        onChange={(e) => setCommonInfo({ ...commonInfo, location: e.target.value })} />
                </div>

                <div className="flex flex-col gap-4 w-full">
                    <Label>Post Category</Label>
                    {/* Select Area */}
                    <Popover className="w-full">
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                <div className="flex gap-2 justify-start">
                                    {value?.length ?
                                        value.map((val, i) => (
                                            <div key={i} className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium">{frameworks.find((framework) => framework.value === val)?.label}</div>
                                        ))
                                        : "Select framework..."}
                                </div>

                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 min-w-[var(--radix-popover-trigger-width)]">
                            <Command>
                                <CommandInput placeholder="Search framework..." />
                                <CommandList>
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {frameworks.map((framework) => (
                                            <CommandItem
                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={(currentValue) => {
                                                    handleSetValue(currentValue);
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value.includes(framework.value) ? "opacity-100" : "opacity-0"
                                                        
                                                    )}
                                                />
                                                {framework.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
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