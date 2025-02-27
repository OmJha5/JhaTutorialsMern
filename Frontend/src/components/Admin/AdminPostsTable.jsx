import { POST_API_ENDPOINT } from "@/utils/apiendpoint";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { ArrowUpDown, Edit, Edit2, MoreHorizontal, Trash, Trash2 } from 'lucide-react'
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

const AdminPostsTable = ({posts , setAllPosts , filteredPosts , setFilteredPosts}) => {
  let navigate = useNavigate();
  let [isIncr, setIsIncr] = useState(true);

  let sortEndingDate = async () => {
    const sortedPosts = [...posts].sort((a, b) => {

      // Convert "25 Feb 2025" -> "2025-02-25"
      const parseDate = (dateStr) => {
        let [day, month, year] = dateStr.split(" ");
        let tempDate = new Date(`${month} 1, 2000`); // Like 1 feb 2000
        let monthIndex = tempDate.getMonth() + 1;
        return new Date(`${year}-${monthIndex.toString().padStart(2, "0")}-${day}`);
      };

      const dateA = parseDate(a.endingdate);
      const dateB = parseDate(b.endingdate);

      if (!isIncr) return dateA - dateB; // For Ascending fashion
      else return dateB - dateA; // For desending fashion
    });

    setAllPosts(sortedPosts);
    setIsIncr(!isIncr);

  }

  let deletePost = async (id) => {
    try {
      let res = await axios.delete(`${POST_API_ENDPOINT}/delete/${id}`, { withCredentials: true });

      if (res.data.success) {
        let allPosts = posts.filter((post) => post._id != id);

        setAllPosts(allPosts);
      }
    }
    catch (e) {
      console.log(e)
      toast.error(e?.response?.data?.message)
    }
  }

  return (
    <div className="mt-10">
      <div>

        <Table>
          <TableCaption>A list of your created Posts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Post Name</TableHead>
              <TableHead>
                <div className="flex gap-2 items-center">
                  <span>Last Date</span>
                  <ArrowUpDown size={18} className="cursor-pointer text-red-400" onClick={sortEndingDate} />
                </div>
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              filteredPosts?.map((post) => {
                return <TableRow key={post._id}>
                  <TableCell>{post?.postname}</TableCell>
                  <TableCell>{post?.endingdate}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="flex gap-3 bg-white shadow-lg rounded-md p-3">
                          <Edit2 size={20} className="hover:cursor-pointer" onClick={() => navigate(`/admin/posts/edit/${post._id}`)} />
                          <Trash2 size={20} className="hover:cursor-pointer text-red-500" onClick={() => deletePost(post?._id)} />
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
  );
};

export default AdminPostsTable;
