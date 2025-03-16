import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const ListEach = ({ tasks }) => {
     const deleteTask = async (taskId) => {
          try {
               const requestOptions = {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
               };
               await fetch(`http://localhost:3030/api/task/delete/${taskId}`, requestOptions);
          } catch (error) {
               console.error("Error deleting task:", error);
               toast.error("Failed to delete task.");
          }
     };

     return (
          <div className="mt-2">
               {tasks.length === 0 ? (
                    <p className="text-center text-black">No tasks available.</p>
               ) : (
                    tasks.map((task) => (
                         <div
                              key={task.id}
                              className={`flex w-full py-2 mb-2 rounded-lg max-h-28 ${task.isComplete === 1
                                   ? 'opacity-15'
                                   : task.isPending === 1
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                   }`}
                         >
                              {/* Checkbox Section */}
                              <div className="p-3 flex justify-center items-center">
                                   <input
                                        type="checkbox"
                                        checked={task.completed}
                                        className="checkbox checkbox-success"
                                   />
                              </div>
                              {/* Task Details */}
                              <div className="basis-4/6">
                                   <h2 className="font-extrabold text-base">{task.title}</h2>
                                   <p className="font-light text-sm">{task.description}</p>
                              </div>
                              {/* Time and Date */}
                              <div className="basis-2/6 text-sm text-right">
                                   <p className="font-bold max-h-10 overflow-y-hidden">{task.time}</p>
                                   <p className="font-extralight text-xs max-h-16 overflow-y-hidden">{task.date}</p>
                              </div>
                              {/* Delete Button */}
                              <div className="p-3 text-xs flex justify-center items-center">
                                   <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => deleteTask(task.id)} // Use an arrow function to delay invocation
                                   >
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none"
                                             viewBox="0 0 24 24"
                                             strokeWidth={2}
                                             stroke="currentColor"
                                             className="size-6"
                                        >
                                             <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                             />
                                        </svg>
                                   </button>
                              </div>
                         </div>
                    ))
               )}
          </div>
     );
};

ListEach.propTypes = {
     tasks: PropTypes.arrayOf(
          PropTypes.shape({
               id: PropTypes.number.isRequired,
               title: PropTypes.string.isRequired,
               description: PropTypes.string,
               time: PropTypes.string,
               date: PropTypes.string,
               isComplete: PropTypes.number,
               isPending: PropTypes.number,
               completed: PropTypes.bool,
          })
     ).isRequired,
};

const ListsAll = () => {
     const [allTasks, setAllTasks] = useState([]);
     const [loading, setLoading] = useState(true);

     const url = 'http://localhost:3030/api/task/fetch/';

     useEffect(() => {
          const fetchTasks = async () => {
               try {
                    const response = await axios.get(url, {
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    });
                    if (response.status === 200) {
                         setLoading(false);
                         const fetchedTasks = response.data.result;
                         setAllTasks(fetchedTasks);
                    }
               } catch (error) {
                    setLoading(false);
                    toast.error(error.message);
               }
          };
          fetchTasks();
     }, [url]); // Only run once on component mount

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
