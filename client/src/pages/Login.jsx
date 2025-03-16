// import backk from '../assets/images/bg.svg'

const Login = () => {
     return (
          <>
               <div className="bg-color1 text-white h-svh w-dvw overflow-hidden flex flex-col">
                    <div className="basis-1/3 space-y-5 p-10 text-left">
                         <div>
                              <h1 className="font-semibold text-5xl">Welcome</h1>
                              <p className="font-normal">Login or Sign Up to continue</p>
                         </div>
                    </div>
                    <div className='omo'>
                         <div className="w-full px-5 mx-auto md:w-1/2">
                              <button className="text-white bg-color1 focus:outline-none focus:ring-4 focus:bg-color1 w-full rounded-lg py-2">Continue with Google</button>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default Login
