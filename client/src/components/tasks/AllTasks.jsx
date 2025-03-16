import { BsStar } from "react-icons/bs"
import ListsAll from "./ListsAll"


const AllTasks = () => {
     return (
          <div className="px-5">
               <ul className="flex items-center justify-start space-x-5 text-xs ">
                    <li><BsStar /></li>
                    <li className="aktive">All</li>
                    <li>Active</li>
                    <li>Pending</li>
                    <li>Completed</li>
               </ul>
               <ListsAll />
          </div>
     )
}

export default AllTasks
