import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { MdOutlineNoteAlt } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
     const [user, setUser] = useState(null);
     const [isLoadingUser, setIsLoadingUser] = useState(true);

     useEffect(() => {
          const fetchData = async () => {
               setIsLoadingUser(true);

               const id = localStorage.getItem("id");
               const token = localStorage.getItem("token");

               if (!token) {
                    console.error("No authentication token found!");
                    setIsLoadingUser(false);
                    return;
               }

               const options = {
                    method: "GET",
                    url: `${apiURL}/user/${id}`,
                    headers: {
                         Accept: "*/*",
                         Authorization: `Bearer ${token}`,
                    },
               };

               try {
                    const response = await axios.request(options);
                    let user = response.data.data;
                    if (!user) {
                         console.error("User data not found!");
                         <Navigate to="/sign" replace />;

                         return;
                    }
                    setUser(user);
               } catch (error) {
                    console.error("Error fetching user data:", error);
               } finally {
                    setIsLoadingUser(false);
               }
          };

          fetchData();
     }, []);

     const date = new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: false,
     });



     return (
          <div className="bg-color1 text-white h-svh w-dvw overflow-hidden flex flex-col">
               <div className="basis-1/3 space-y-5 p-10 text-left">
                    <div className="flex justify-between items-center">
                         <div>
                              <h1 className="font-semibold text-2xl">Good {date < 12 ? "Morning" : date < 18 ? "Afternoon" : "Evening"},</h1>
                              <p className="font-normal text-lg flex gap-3">
                                   Dear{" "}
                                   {isLoadingUser ? (
                                        <span className="inline-block w-8 h-8 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></span>
                                   ) : (
                                        user?.fullname || "User"
                                   )}
                              </p>
                         </div>
                         <div className="avatar">
                              <div className="w-12 rounded-full">
                                   <img
                                        src={user?.photoUrl ?? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        alt="User Profile"
                                        className="w-20 h-20 rounded-full object-cover"
                                   />
                              </div>
                         </div>
                    </div>
               </div>

               <div className="omo flex flex-col p-10 space-y-10">
                    <Link to="/notes" className="bg-color1 md:mt-10 text-white w-full md:w-1/2 p-6 rounded-3xl text-xl flex justify-between items-center">
                         My Notes <MdOutlineNoteAlt />
                    </Link>
                    <Link to="/tasks" className="bg-color1 text-white w-full md:w-1/2 p-6 rounded-3xl text-xl flex justify-between items-center">
                         My Tasks <FaTasks />
                    </Link>
                    <Link to="/calendar" className="bg-color1 text-white w-full md:w-1/2 p-6 rounded-3xl text-xl flex justify-between items-center">
                         My Calendar <BiCalendar />
                    </Link>
               </div>
          </div>
     );
};

export default Dashboard;
