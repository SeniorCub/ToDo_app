import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { BsCheckCircle } from 'react-icons/bs';

const API_URL = import.meta.env.VITE_API_URL;

export const ListEach = ({ tasks }) => {
     const deleteTask = async (taskId) => {
          try {
               const token = localStorage.getItem('token');

               const requestOptions = {
                    method: "DELETE",
                    headers: {
                         'Content-Type': 'application/json',
                         Authorization: `Bearer ${token}`,
                    },
               };
               let response = await fetch(`${API_URL}/task/delete/${taskId}`, requestOptions);
               if (response.status === 200) {
                    toast.success("Task deleted successfully.");
                    window.location.reload();
               } else {
                    toast.error("Failed to delete task.");
               }
          } catch (error) {
               console.error("Error deleting task:", error);
               toast.error("Failed to delete task.");
          }
     };

     const completeTask = async (taskId) => {
          try {
               const token = localStorage.getItem('token');

               const requestOptions = {
                    method: "PUT",
                    headers: {
                         'Content-Type': 'application/json',
                         Authorization: `Bearer ${token}`,
                    },
               };
               let response = await fetch(`${API_URL}/task/complete/${taskId}`, requestOptions);
               if (response.status === 200) {
                    toast.success("Task completed successfully.");
                    window.location.reload();
               } else {
                    toast.error("Failed to complete task.");
               }
          } catch (error) {
               console.error("Error completing task:", error);
               toast.error("Failed to complete task.");
          }
     }

     return (
          <div className="mt-2">
               {tasks.length === 0 ? (
                    <p className="text-center text-gray-500">No tasks available.</p>
               ) : (
                    tasks.map((task) => (
                         <div
                              key={task.id}
                              className="bg-white shadow-md rounded-lg p-4 mb-4 relative"
                         >
                              <div className="flex justify-between items-center mb-2">
                                   <div className="flex items-center">
                                        <BsCheckCircle
                                             className={`mr-2 ${task.isComplete === 1
                                                       ? 'text-green-500'
                                                       : 'text-gray-300'
                                                  }`}
                                        />
                                        <span className="text-sm text-gray-500">
                                             {task.time.split(":")[0] + ":" + task.time.split(":")[1]}
                                             {", " + task.date.split("T")[0]}
                                        </span>
                                   </div>
                                   <div className="flex space-x-2">
                                        <button
                                             className="text-blue-500 hover:bg-blue-100 p-1 rounded-full"
                                             onClick={() => {/* Edit functionality */ }}
                                        >
                                             <BiEdit size={20} />
                                        </button>
                                        <button
                                             className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                                             onClick={() => deleteTask(task.id)}
                                        >
                                             <BiTrash size={20} />
                                        </button>
                                   </div>
                              </div>

                              <div
                                   className={`
                                        ${task.isComplete === 1
                                             ? 'line-through text-gray-500'
                                             : 'text-gray-800'
                                        }`
                                   }
                              >
                                   <h2 className="font-bold text-lg mb-1">{task.title}</h2>
                                   <p className="text-sm">
                                        {task.description.substring(0, 200)}
                                        {task.description.length > 200 ? '...' : ''}
                                   </p>
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

export default ListEach;