import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../hooks/register";

const Register = () => {
     return (

          <>
               <div className="bg-color1 text-white h-svh w-dvw overflow-hidden flex flex-col">
                    <div className="basis-1/3 space-y-5 p-10 text-left">
                         <div>
                              <h1 className="font-semibold text-4xl">Create Account</h1>
                              <p className="font-normal">Sign up to continue</p>
                         </div>
                    </div>
                    <div className='omo'>
                         <div className="w-full px-5 mx-auto md:w-1/2 space-y-5">
                              <button className="bg-color1 focus:outline-none focus:ring-4 focus:bg-color1 w-full rounded-lg py-2 text-white flex items-center justify-center gap-3 font-bold"
                                   onClick={() => signInWithGoogle()}
                              >
                                   <FcGoogle />
                                   <span>Create with Google</span>
                              </button>
                         </div>
                    </div>
               </div>
          </>

     )
}

export default Register
