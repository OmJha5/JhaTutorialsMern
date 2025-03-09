import React, { useEffect, useState } from 'react'
import NavAdmin from './NavAdmin'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '@/redux/userSlice';
import AdmitCardsTable from './AdmitCardsTable';
import { ADMITCARD_API_ENDPOINT } from '@/utils/apiendpoint';
import InternalServerError from '../Guest/InternalServerError';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function AdmitCard() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [admitcards , setAdmitCards] = useState([]);
  let [filteredcards , setFilteredCards] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);

  useEffect(() => {
    setFilteredCards(admitcards);
  } , [admitcards])

  let filterHandler = (e) => {
    let text = e.target.value;

    let updatedAllAdmitCards = admitcards.filter((post) =>
        post.posttitle.toLowerCase().includes(text.toLowerCase()) || post.briefinformation.toLowerCase().includes(text.toLowerCase())
        || post.location.toLowerCase().includes(text.toLowerCase()) || post.qualification.toLowerCase().includes(text.toLowerCase())
        || post.postcategory.toLowerCase().includes(text.toLowerCase()) || post.youtubelink.toLowerCase().includes(text.toLowerCase()) || post.associatedPost.briefinformation.toLowerCase().includes(text.toLowerCase())
    )

    setFilteredCards(updatedAllAdmitCards)

}

  useEffect(() => {

    const getAllAdmitCards = async () => {
        try {
            setLoading(true);
            let res = await axios.get(`${ADMITCARD_API_ENDPOINT}/get`, { withCredentials: true });

            if (res.data.success) {
                setAdmitCards(res.data.allAdmitCard);
            }
        }
        catch (e) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
    }

    getAllAdmitCards();
}, [])

  useEffect(() => {
    dispatch(setActiveTab("AdmitCard"));
  }, [])

  let clickHandler = () => {
    navigate("/admin/createadmitcard");
  }
  return (
    <div>
      {error ? (
        <InternalServerError />
      ) : loading ? (
        <div className='w-full h-screen flex justify-center items-center'>
          <Loader2 className='animate-spin' size={25} />
        </div>
      ) : (
        <div className="flex h-screen flex-col md:flex-row relative">
          <NavAdmin />

          {/* Main Content */}
          <div className="flex-1 p-6 md:ml-80 max-md:mt-16 transition-all duration-300 ease-in-out sm:mr-16">
            <div className="flex justify-between max-sm:flex-col max-sm:gap-4 items-center">
              <Input placeholder="Filter by Any Thing" className="w-fit" autoFocus onChange={filterHandler} onFocus={(e) => e.target.focus()} />
              <Button className="bg-blue-500 w-fit hover:bg-blue-400 hover:cursor-pointer" onClick={clickHandler}>Create</Button>
            </div>

            <AdmitCardsTable admitcards={admitcards} setAdmitCards={setAdmitCards} filteredcards={filteredcards} setFilteredCards={setFilteredCards} />

          </div>
        </div>
      )
      }
    </div>
  )
}
