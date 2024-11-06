// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import CreateTask from '../components/CreateTask';
import ListsAll from '../components/ListsAll';
import SmallNavbar from '../components/SmallNavbar';
import SmallTopNavbar from '../components/SmallTopNavbar';
import SearchModal from '../components/SearchModal';

const ListView = () => {
     const [allTasks, setAllTasks] = useState(
          JSON.parse(localStorage.getItem('tasks')) || []
     );
     const [completedTasks, setCompletedTasks] = useState(
          JSON.parse(localStorage.getItem('completedTasks')) || []
     );
     const [pendingTasks, setPendingTasks] = useState(
          JSON.parse(localStorage.getItem('pendingTasks')) || []
     );

     // Function to check and move expired tasks to the pending section
     const checkForPendingTasks = () => {
          const currentDate = new Date();
          const newPendingTasks = allTasks.filter((task) => {
               const taskDateTime = new Date(`${task.date}T${task.time}`);
               return !task.completed && taskDateTime < currentDate;
          });

          if (newPendingTasks.length > 0) {
               setPendingTasks([...pendingTasks, ...newPendingTasks]);

               const updatedTasks = allTasks.filter(
               (task) => !newPendingTasks.some((pendingTask) => pendingTask.id === task.id)
               );
               setAllTasks(updatedTasks);

               localStorage.setItem('tasks', JSON.stringify(updatedTasks));
               localStorage.setItem('pendingTasks', JSON.stringify([...pendingTasks, ...newPendingTasks]));
          }
     };

     useEffect(() => {
     checkForPendingTasks();
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [allTasks]);

     const toggleCompletion = (id) => {
          const updatedTasks = allTasks.map((task) => {
               if (task.id === id) {
               const updatedTask = { ...task, completed: !task.completed };
               if (updatedTask.completed) {
               setCompletedTasks([...completedTasks, updatedTask]);
               localStorage.setItem('completedTasks', JSON.stringify([...completedTasks, updatedTask]));
               }
               return updatedTask;
               }
               return task;
          });

          const activeTasks = updatedTasks.filter((task) => !task.completed);
          setAllTasks(activeTasks);
          localStorage.setItem('tasks', JSON.stringify(activeTasks));
     };

     const toggleCompletionInPending = (id) => {
          const updatedPendingTasks = pendingTasks.map((task) => {
               if (task.id === id) {
               const updatedTask = { ...task, completed: !task.completed };
               setCompletedTasks([...completedTasks, updatedTask]);
               return updatedTask;
               }
               return task;
          });

          const remainingPendingTasks = updatedPendingTasks.filter((task) => !task.completed);
          setPendingTasks(remainingPendingTasks);
          localStorage.setItem('pendingTasks', JSON.stringify(remainingPendingTasks));
          localStorage.setItem('completedTasks', JSON.stringify([...completedTasks, ...updatedPendingTasks.filter(task => task.completed)]));
     };

     // Function to delete a task
     const deleteTask = (id, type) => {
     let updatedTasks;

     // Depending on the type of task, delete it from the corresponding array
     if (type === 'active') {
          updatedTasks = allTasks.filter((task) => task.id !== id);
          setAllTasks(updatedTasks);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
     } else if (type === 'pending') {
          updatedTasks = pendingTasks.filter((task) => task.id !== id);
          setPendingTasks(updatedTasks);
          localStorage.setItem('pendingTasks', JSON.stringify(updatedTasks));
     } else if (type === 'completed') {
          updatedTasks = completedTasks.filter((task) => task.id !== id);
          setCompletedTasks(updatedTasks);
          localStorage.setItem('completedTasks', JSON.stringify(updatedTasks));
     }
     };

     return (
     <>
          <div className="relative">
               <SmallTopNavbar />
               <SmallNavbar />
               <SearchModal allTasks={allTasks} />
               <div className="p-5 pt-16 container">
                    {/* Active Tasks Section */}
                    <h2 className="text-xl font-bold pt-5">Active Tasks</h2>
                    <ListsAll tasks={allTasks} toggleCompletion={toggleCompletion} deleteTask={deleteTask} taskType="active" />
                    <hr className='my-10 mx-10 bg-color1 h-1' />
                    {/* Pending Tasks Section */}
                    <h2 className="text-xl font-bold mt-10">Pending Tasks</h2>
                    <ListsAll tasks={pendingTasks} toggleCompletion={toggleCompletionInPending} deleteTask={deleteTask} taskType="pending" />
                    <hr className='my-10 mx-10 bg-color1 h-1' />
                    {/* Completed Tasks Section */}
                    <h2 className="text-xl font-bold">Completed Tasks</h2>
                    <ListsAll tasks={completedTasks} toggleCompletion={toggleCompletion} deleteTask={deleteTask} taskType="completed" />
               </div>
               <CreateTask allTasks={allTasks} setAllTasks={setAllTasks} setCompletedTasks={setCompletedTasks} setPendingTasks={setPendingTasks} />
          </div>
     </>
     );
};

export default ListView;
