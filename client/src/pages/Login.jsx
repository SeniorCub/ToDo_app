// import backk from '../assets/images/bg.svg'

const Login = () => {
     return (
          <>
               <div className="bg-color1 text-white h-svh w-dvw overflow-hidden flex flex-col">
                    <div className="basis-1/3 space-y-5 p-5 text-left">
                         <a href="/">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-3xl">
                                   <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                              </svg>
                         </a>
                         <div>
                              <h1 className="font-semibold text-4xl">Welcome</h1>
                              <p className="font-normal text-sm">Login to continue</p>
                         </div>
                    </div>
                    <div className='omo'>
                         <form action="" className="w-full px-5 mx-auto">
                              <div className="mb-5">
                                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                                   <input type="email" name="email" id="email" className="bg-gray-50 w-full focus:outline-none text-gray-900 focus:ring-slate-400 p-2 rounded-md" placeholder="Email Address" required />
                              </div>
                              <div className="mb-5">
                                   <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                   <input type="password" name="password" id="password" className="bg-gray-50 w-full focus:outline-none text-gray-900 focus:ring-slate-400 p-2 rounded-md" placeholder="Password" required />
                              </div>
                              <div className="flex items-center mb-5 mt-10 flex-col space-y-3">
                                   <button type="submit" className="text-white bg-color1 focus:outline-none focus:ring-4 focus:bg-color1 w-full rounded-lg py-2">Login</button>
                                   <div className="text-gray-900 text-center text-xs">Forgotten password? <a href="/register" className="text-color1">Click here</a></div>
                              </div>
                         </form>
                    </div>
               </div>
          </>
     )
}

export default Login
