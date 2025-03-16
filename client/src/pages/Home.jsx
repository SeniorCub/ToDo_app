import Spline from '@splinetool/react-spline';
import Navbar from '../components/Navbar';

const Home = () => {

     return (
          <>
               <Navbar />
               <div className="relative h-screen w-full bg-gray-900 overflow-hidden">
                    {/* Spline 3D Model */}
                    <div className="absolute inset-0">
                         <Spline scene="https://prod.spline.design/e3fEGFUHncSOI-JD/scene.splinecode" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
                         <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
                              Welcome to Our Platform
                         </h1>
                         <p className="mt-4 text-lg sm:text-xl text-gray-300 max-w-2xl">
                              Building innovative solutions to make life easier and more enjoyable for everyone.
                         </p>
                         <div className="mt-6">
                              <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition">
                                   Get Started
                              </button>
                         </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-0"></div>
               </div>
          </>
     )
}

export default Home
