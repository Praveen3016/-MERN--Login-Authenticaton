import React, { useState } from 'react'
import axios from 'axios'
import { Link , useNavigate } from 'react-router-dom'

function SignUp() {

    const navigate = useNavigate();
   
    const [user , setUser] = useState({
        name : "",
        email : "",
        password : ""
    })

    const submitHandle = async (e) =>{
        try {
            e.preventDefault();
            console.log(user);
          const data = await  axios.post("http://localhost:3000/api/users" , user ,{withCredentials: true});
          console.log(data)
          navigate('/login');
        } catch (error) {
            console.log("error in post axios" , error)
            alert(error.response.data.message)
        }  
    }
    
   

  return (
    <div>
          <div className="bg-black text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
        <a href="#">
          <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
            Node | Authantication
          </div>
        </a>
        <div className="relative mt-12 w-full max-w-lg sm:mt-10">
          <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
          <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                Register
              </h3>
            </div>
            <div className="p-6 pt-0">
              <form>
                <div>
                  <div>
                    <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                          Name
                        </label>
                      </div>
                      <input
                        type="text"
                        name="username"
                        placeholder="Name"
                        autoComplete="off"
                        value={user.name}
                        onChange={(e) => setUser( elem => ({...elem , name : e.target.value}) )}
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                          Email
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={user.email}
                          onChange={(e) => setUser( elem => ({...elem , email : e.target.value}) )}

                          className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                      <div className="flex justify-between">
                        <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                          Password
                        </label>
                      </div>
                      <div className="flex items-center ">
                        <input
                          type="password"
                          value={user.password}
                          onChange={(e) => setUser( elem => ({...elem , password : e.target.value}) )}
                          name="password"
                          placeholder="Password"
                          className="block mb-2 w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>
          
                <div className="mt-4 flex items-center justify-end gap-x-2">
                  {/* <Link
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                    href="/login"
                  >
                    Log in
                  </Link> */}
                  <button onClick={(e) =>  submitHandle(e)} className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2">
                    Register
                  </button>
                  <Link to='/login' >Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
