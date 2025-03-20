import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { MdRemoveCircleOutline } from 'react-icons/md';

const API_URL = import.meta.env.VITE_API_URL;

export const ListEach = ({ tasks }) => {
     const deleteTask = async (taskId) => {
          try {
               const requestOptions = {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
               };
               await fetch(`${API_URL}/task/delete/${taskId}`, requestOptions);
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
                              className={`flex w-full items-center py-2 mb-2 rounded-lg max-h-36 ${task.isComplete === 1
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
                              <div className="text-black basis-4/6">
                                   <h2 className="font-extrabold text-base">{task.title}</h2>
                                   <p className="font-light text-sm md:block hidden">
                                        {task.description.substring(0, 100)}...
                                   </p>
                                   <p className="font-light text-sm block md:hidden">
                                        {task.description.substring(0, 50)}...
                                   </p>
                              </div>
                              {/* Time and Date */}
                              <div className="basis-2/6 text-sm text-right">
                                   <p className="font-bold max-h-10 overflow-y-hidden">{task.time.split(":")[0] + ":" + task.time.split(":")[1]}</p>
                                   <p className="font-extralight text-xs max-h-16 overflow-y-hidden">{task.date.split("T")[0]}</p>
                              </div>
                              {/* Delete Button */}
                              <div className="p-3 text-xs flex justify-center items-center">
                                   <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => deleteTask(task.id)}
                                   >
                                        <MdRemoveCircleOutline className='text-lg' />
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
