import { useEffect, useState } from "react";
import ListsAll from "./ListsAll"
import { logout } from "../../hooks/logout";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AllTasks = () => {
     const [allTasks, setAllTasks] = useState([]);
     const [filteredTasks, setFilteredTasks] = useState([]);
     const [loading, setLoading] = useState(true);
     const [activeFilter, setActiveFilter] = useState('all');

     const id = localStorage.getItem('id');
     const token = localStorage.getItem('token');

     const url = `${API_URL}/task/alltasks/${id}`;

     useEffect(() => {
          const fetchTasks = async () => {
               try {
                    const response = await axios.get(url, {
                         headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
                         },
                    });

                    if (response.status === 200) {
                         setLoading(false);
                         const fetchedTasks = response.data.data;
                         setAllTasks(fetchedTasks);
                         setFilteredTasks(fetchedTasks);
                    } else {
                         setLoading(false);
                         toast.error(response.data.message);
                         logout();
                    }
               } catch (error) {
                    setLoading(false);
                    toast.error(error.message);
                    logout();
               }
          };

          fetchTasks();
     }, [token, url, id]);

     // Fixed filter function
     const handleFilter = (filter) => {
          setActiveFilter(filter);

          if (filter === 'all') {
               setFilteredTasks(allTasks);
          } else if (filter === 'Active') {
               // Active tasks are those that are not completed and not pending
               const filtered = allTasks.filter(task =>
                    task.isComplete === 0 && task.isPending === 0
               );
               setFilteredTasks(filtered);
          } else if (filter === 'Pending') {
               // Pending tasks
               const filtered = allTasks.filter(task => task.isPending === 1);
               setFilteredTasks(filtered);
          } else if (filter === 'Completed') {
               // Completed tasks
               const filtered = allTasks.filter(task => task.isComplete === 1);
               setFilteredTasks(filtered);
          }
     };

     return (
          <>
               <div className="flex justify-center space-x-2 mb-4 p-2 bg-gray-50">
                    {['all', 'Active', 'Pending', 'Completed'].map(category => (
                         <button
                              key={category}
                              onClick={() => handleFilter(category)}
                              className={`px-4 py-2 rounded-full border-none text-xs ${activeFilter === category
                                   ? 'bg-color1 text-white'
                                   : 'bg-gray-200 text-gray-800'
                                   }`}
                         >
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                         </button>
                    ))}
               </div>
               {loading ? (
                    <div className="text-center text-gray-500 mt-10">
                         Loading Tasks...
                    </div>
               ) : (
                    <ListsAll tasks={filteredTasks} />
               )}
          </>
     );
};

export default AllTasks;