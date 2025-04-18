/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom"
import axios from "axios";
import { logout } from "../../hooks/logout";
const apiURL = import.meta.env.VITE_API_URL;


const SmallNavbar = ({ tab }) => {
     const [user, setUser] = useState(null);

     useEffect(() => {
          const fetchData = async () => {

               const id = localStorage.getItem("id");
               const token = localStorage.getItem("token");

               if (!token) {
                    console.error("No authentication token found!");
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
                         logout();
                    }
                    setUser(user);
               } catch (error) {
                    console.error("Error fetching user data:", error);
                    logout();
               }
          };

          fetchData();
     }, []);

     const date = new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          hour12: false,
     });

     return (
          <div className="flex justify-between items-center p-5">
               <div className="flex gap-3 items-center">
                    <Link to={"/dashboard"} className="text-black text-2xl"><BiArrowBack /></Link>
                    <div className="flex items-start flex-col">
                         <h1 className="font-semibold md:text-2xl">Good {date < 12 ? "Morning" : date < 18 ? "Afternoon" : "Evening"},</h1>
                         <div className="text-color1 font-bold md:text-2xl capitalize">My {tab}</div>
                    </div>
               </div>
               <div className="flex items-center gap-3">
                    <div className="font-normal md:text-lg text-xs">{user?.fullname || "User"}</div>
                    <div className="avatar cursor-pointer" onClick={() => logout()}>
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
     )
}

export default SmallNavbar