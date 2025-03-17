import { Link } from "react-router-dom"
import { FaTasks } from "react-icons/fa";
import { MdOutlineNoteAlt } from "react-icons/md";
import { BiCalendar } from "react-icons/bi";

const Dashboard = () => {
     return (
               <div className="bg-color1 text-white h-svh w-dvw overflow-hidden flex flex-col">
                    <div className="basis-1/3 space-y-5 p-10 text-left">
                         <div>
                              <h1 className="font-semibold text-2xl">Good Eveneing,</h1>
                              <p className="font-normal text-lg">Dear Dorcas</p>
                         </div>
                    </div>
                    <div className="omo flex flex-col p-10 space-y-10 ">
                         <Link to={"/notes"} className="bg-color1 md:mt-10 text-white w-full md:w-1/2 p-6 rounded-3xl text-xl flex justify-between items-center">My Notes <MdOutlineNoteAlt /> </Link>
                         <Link to={"/tasks"} className="bg-color1 text-white w-full md:w-1/2 p-6 rounded-3xl text-xl flex justify-between items-center">My Tasks <FaTasks /> </Link>
                         <Link to={"/calender"} className="bg-color1 text-white w-full md:w-1/2 p-6 rounded-3xl text-xl flex justify-between items-center">My Calender <BiCalendar /> </Link>
                    </div>
               </div>
     )
}

export default Dashboard
