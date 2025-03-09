import { ADMITCARD_API_ENDPOINT, POST_API_ENDPOINT } from "@/utils/apiendpoint";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { ArrowUpDown, Check, CircleX, Edit, Edit2, MoreHorizontal, Trash, Trash2 } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import InternalServerError from "../Guest/InternalServerError";

const AdmitCardsTable = ({ admitcards, setAdmitCards, filteredcards, setFilteredCards }) => {
    let navigate = useNavigate();
    let [error, setError] = useState(false);

    let deleteAdmitCard = async (id) => {
        try {
            let wantToDelete = confirm("Do you want to do delete it ??")
            if (!wantToDelete) return;
            
            let res = await axios.delete(`${ADMITCARD_API_ENDPOINT}/delete/${id}`, { withCredentials: true });

            if (res.data.success) {
                let allAdmitCards = admitcards.filter((card) => card._id != id);
                setAdmitCards(allAdmitCards)
            }
        }
        catch (e) {
            setError(true);
        }
    }

    return (
        <div>
            {
                (error) ? (
                    <InternalServerError />
                ) : (
                    <div className="mt-10">
                        <div>

                            <Table className="overflow-x-auto">
                                <TableCaption>A list of your created Admit Cards.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-left whitespace-nowrap">Admit Card Name</TableHead>
                                        <TableHead className="text-left whitespace-nowrap">Post Name</TableHead>
                                        <TableHead className="text-right whitespace-nowrap">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        filteredcards?.map((post) => {
                                            return <TableRow key={post._id}>
                                                <TableCell className="whitespace-nowrap">{post?.postname}</TableCell>
                                                <TableCell className="whitespace-nowrap">{post?.associatedPost?.postname}</TableCell>
                                                <TableCell className="text-right whitespace-nowrap">
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <MoreHorizontal />
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <div className="flex gap-3 bg-white shadow-lg rounded-md p-3">
                                                                <Edit2 size={20} className="hover:cursor-pointer" onClick={() => navigate(`/admin/admitcard/edit/${post._id}`)} />
                                                                <Trash2 size={20} className="hover:cursor-pointer text-red-500" onClick={() => deleteAdmitCard(post?._id)} />
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </TableCell>
                                            </TableRow>
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AdmitCardsTable;
