// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const validationSchema = Yup.object().shape({
     title: Yup.string().required('Title is required'),
     description: Yup.string().required('please enter a Description'),
     date: Yup.date().required('PLease select a due date'),
     time: Yup.string().required('please select a Time'),
     completed: false,
});

const CreateTask = () => {

     const [isOpen, setIsOpened] = useState(false);

     const formik = useFormik({
          initialValues: {
               title: '',
               description: '',
               date: '',
               time: '',
               completed: false,
          },
          validationSchema,
          onSubmit: async (values, { resetForm }) => {
               const url = 'http://localhost:3030/api/task/create';

               const data = {
                    user_Id: 2,
                    title: values.title,
                    description: values.description,
                    date: values.date,
                    time: values.time,
               };

               try {
                    const response = await axios.post(url, data, {
                         headers: {
                              'Content-Type': 'application/json',
                         }
                    });
                    if (response.status === 200) {
                         toast.success(response.data.message);
                         resetForm();
                         setIsOpened(false);
                    }
               } catch (error) {
                    toast.error(error.message);
               }
          }
     });

     return (
          <>
               <button className="bg-color1 w-16 h-16 flex flex-col justify-center items-center rounded-full -translate-y-5 fixed right-1/2 bottom-4 transform translate-x-1/2" onClick={() => setIsOpened(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" strokeWidth={3} stroke="currentColor" className="w-8 h-8 text-color3">
                         <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
               </button>

               {isOpen && (
                    <div className="fixed top-10 p-4 bg-white shadow-md rounded-lg w-96 left-3 right-3 md:left-1/2 md:transform md:-translate-x-1/2">
                         <h1 className="text-center text-2xl font-bold mb-4">Create Task</h1>
                         <form onSubmit={formik.handleSubmit}>
                              <div className="flex flex-col space-y-4">
                                   <div className="flex items-center">
                                        <input type="checkbox" name="completed" onChange={formik.handleChange} className="checkbox checkbox-success mr-2" />
                                        <label className="font-semibold">Mark as Completed</label>
                                   </div>

                                   {formik.touched.title && formik.errors.title ? (<p className="text-red-500 text-xs">{formik.errors.title}</p>) : null}
                                   <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} placeholder="Task title" className="w-full font-extrabold text-base p-2 border bg-color3 rounded-lg" />
                                   {formik.touched.description && formik.errors.description ? (<p className="text-red-500 text-xs">{formik.errors.description}</p>) : null}
                                   <textarea name="description" value={formik.values.description} onChange={formik.handleChange} placeholder="Task description" className="w-full font-light text-sm p-2 border bg-color3 rounded-lg" />

                                   <div className="flex space-x-2">
                                        {formik.touched.time && formik.errors.time ? (<p className="text-red-500 text-xs">{formik.errors.time}</p>) : null}
                                        <input type="time" name="time" value={formik.values.time} onChange={formik.handleChange} className="w-1/2 font-bold p-2 border bg-color3 rounded-lg" />
                                        {formik.touched.date && formik.errors.date ? (<p className="text-red-500 text-xs">{formik.errors.date}</p>) : null}
                                        <input type="date" name="date" value={formik.values.date} onChange={formik.handleChange} className="w-1/2 font-extralight text-xs p-2 border bg-color3 rounded-lg" />
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