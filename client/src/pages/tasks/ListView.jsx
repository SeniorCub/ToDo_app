// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import CreateTask from '../../components/tasks/CreateTask';
import AllTasks from '../../components/tasks/AllTasks';

const ListView = () => {

     return (
          <>
               <AllTasks />
               <CreateTask />
          </>
     );
};

export default ListView;
