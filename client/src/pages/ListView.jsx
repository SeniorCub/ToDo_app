// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import CreateTask from '../components/CreateTask';
import ListsAll from '../components/ListsAll';
import SmallNavbar from '../components/SmallNavbar';
import SmallTopNavbar from '../components/SmallTopNavbar';
import SearchModal from '../components/SearchModal';
import { Toaster } from 'react-hot-toast'

const ListView = () => {

     return (
     <>
          <div className="relative">
          <Toaster position='top-center' reverseOrder={false} />
               <SmallTopNavbar />
               <SmallNavbar />
               <SearchModal  />
               {/* allTasks={allTasks} */}
               <div className="p-5 pt-16 container">
                    <ListsAll />
               </div>
               <CreateTask  />
               {/* allTasks={allTasks} setAllTasks={setAllTasks} setCompletedTasks={setCompletedTasks} setPendingTasks={setPendingTasks} */}
          </div>
     </>
     );
};

export default ListView;
