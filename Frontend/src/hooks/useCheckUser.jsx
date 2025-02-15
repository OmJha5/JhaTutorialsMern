import {useEffect} from "react"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner';
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/apiendpoint.js";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/userSlice";

const useCheckUser = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        const checkUser = async() => {
            try{
                let res = await axios.get(`${USER_API_ENDPOINT}/checkuser` , {
                    withCredentials : true,
                });

                if(res.data.success){
                    dispatch(setUser(res.data.user));
                    return;
                }
            }
            catch(e){
                if(!e?.response?.data?.success){
                    // That means ya to cookie nhi hai ya to cookie mai chedchad hui hai ya to cookie hai but uske andar ka user delete ho chuka hai .
                    navigate("/admin/login");
                    toast.error(e?.response?.data?.message);
                }

                toast(e?.response?.data?.message);
            }
        }

        checkUser();
    } , [])
}

export default useCheckUser;