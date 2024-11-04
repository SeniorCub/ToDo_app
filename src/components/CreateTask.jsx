// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types, no-unused-vars
const CreateTask = ({ allTasks, setAllTasks, setCompletedTasks }) => {
     // State to manage the current task
     const [task, setTask] = useState({
          title: '',
          description: '',
          date: '',
          time: '',
          completed: false,
     });

     // State to toggle form visibility
     const [isOpen, setIsOpened] = useState(false);

     // Handle input changes
     const handleChange = (e) => {
          const { name, value, type, checked } = e.target;
          setTask({
               ...task,
               [name]: type === 'checkbox' ? checked : value,
          });
     };

     // Handle form submission
     const handleSubmit = (e) => {
          e.preventDefault();
          const newTask = { ...task, id: Date.now() };

          // Add the new task to the list of all tasks
          const updatedTasks = [...allTasks, newTask];
          setAllTasks(updatedTasks);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));

          // Reset the task form
          setTask({
               title: '',
               description: '',
               date: '',
               time: '',
               completed: false,
          });

          // Close the form after submission
          setIsOpened(false);
     };

  return (
    <>
          <button  className="bg-color1 w-16 h-16 flex flex-col justify-center items-center rounded-full -translate-y-5 fixed right-1/2 bottom-4 transform translate-x-1/2"  onClick={() => setIsOpened(!isOpen)}>
               <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="currentColor"  strokeWidth={3}  stroke="currentColor"  className="w-8 h-8 text-color3">
               <path  fillRule="evenodd"  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"  clipRule="evenodd"/>
               </svg>
          </button>

          {isOpen && (
               <div className="fixed top-10 p-4 bg-white shadow-md rounded-lg w-96 left-3 right-3 md:left-1/2 md:transform md:-translate-x-1/2">
                    <h1 className="text-center text-2xl font-bold mb-4">Create Task</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-4">
                         <div className="flex items-center">
                              <input type="checkbox" name="completed" checked={task.completed} onChange={handleChange} className="checkbox checkbox-success mr-2" />
                              <label className="font-semibold">Mark as Completed</label>
                         </div>

                         <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Task title" className="w-full font-extrabold text-base p-2 border bg-color3 rounded-lg"     required />
                         <textarea name="description" value={task.description} onChange={handleChange} placeholder="Task description" className="w-full font-light text-sm p-2 border bg-color3 rounded-lg" required/>

                         <div className="flex space-x-2">
                              <input type="time" name="time" value={task.time} onChange={handleChange} className="w-1/2 font-bold p-2 border bg-color3 rounded-lg" required />
                              <input type="date" name="date" value={task.date} onChange={handleChange} className="w-1/2 font-extralight text-xs p-2 border bg-color3 rounded-lg" required />
                         </div>

                         <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"> Add Task </button>
                    </div>
                    </form>
               </div>
          )}
    </>
  );
};

export default CreateTask;