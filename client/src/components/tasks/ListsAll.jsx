import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ListEach } from './ListEach';

const API_URL = import.meta.env.VITE_API_URL;

const ListsAll = () => {
     const [allTasks, setAllTasks] = useState([]);
     const [loading, setLoading] = useState(true);

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
                         console.log(fetchedTasks);
                         setAllTasks(fetchedTasks);
                    }
               } catch (error) {
                    setLoading(false);
                    toast.error(error.message);
               }
          };
          fetchTasks();
     }, [token, url, id]);

     return (
          <>
               {loading ? (
                    <p className="text-center text-black">Loading tasks...</p>
               ) : (
                    <div className="w-full h-full my-5 p-2">
                         <ListEach tasks={allTasks} />
                    </div>
               )}
          </>
     );
};

export default ListsAll;
