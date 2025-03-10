import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/apiendpoint'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import InternalServerError from '../Guest/InternalServerError'

export default function AdminLogin() {
  let [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [error, setError] = useState(false);

  useEffect(() => {
        document.title = "Jha Tutorials | Login Page"
  } , [])

  let changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  let isValidEmail = () => {
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(input.email);
  }

  let isFormValid = () => {
    if (input.password == "") {
      toast.error("Password is Required");
      return false;
    }

    if (input.role == "") {
      toast.error("Role is required");
      return false;
    }

    if (!isValidEmail(input.email)) {
      toast.error("Please enter valid email");
      return false;
    }

    return true;
  }

  let submitHandler = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        setLoading(true);
        let res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })


        if (res.data.success) {
          dispatch(setUser(res.data.user));
          navigate("/admin");
          setInput({
            email: "",
            password: "",
            role: "",
          });
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
      {
        (error) ? (
          <InternalServerError />
        ) : (
          <div className='!bg-white'>
            <div className="w-screen h-screen flex justify-center items-center flex-col">
              <h1 className='sm:text-2xl max-sm:text-xl font-semibold sm:my-5 max-sm:my-2 '>Admin Login</h1>

              <div className='rounded-md shadow-xl p-5 w-1/2 max-lg:w-[80%]'>

                <form onSubmit={submitHandler} className='flex flex-col sm:gap-5 max-sm:gap-2 sm:my-3 max-sm:my-2'>
                  <div>
                    <Label className="mb-2" htmlFor="email" >Email</Label>
                    <Input name="email" id="email" value={input.email} onChange={changeEventHandler} />
                  </div>

                  <div>
                    <Label className="mb-2" htmlFor="password" >Password</Label>
                    <Input type="password" name="password" id="password" value={input.password} onChange={changeEventHandler} />
                  </div>

                  <div className='flex gap-6'>
                    <div className="flex gap-2 items-center">
                      <Input type="radio" name="role" id="admin" value="admin" onChange={changeEventHandler} />
                      <Label htmlFor="admin" >Admin</Label>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Input type="radio" name="role" id="superadmin" value="superadmin" onChange={changeEventHandler} />
                      <Label htmlFor="superadmin" >Superadmin</Label>
                    </div>
                  </div>

                  {
                    (loading) ? <Button className="bg-blue-500 hover:bg-blue-400"><Loader2 className='animate-spin w-5 h-5 mr-2' /><span>please wait..</span></Button> : <Button type="submit" className="max-sm:mt-1 mt-3  h-0 py-4 bg-blue-500 hover:bg-blue-400">Submit</Button>
                  }

                </form>

              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}