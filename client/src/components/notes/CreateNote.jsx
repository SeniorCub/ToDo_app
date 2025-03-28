import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CgClose } from 'react-icons/cg';

const API_URL = import.meta.env.VITE_API_URL;

const validationSchema = Yup.object().shape({
     title: Yup.string().required('Title is required'),
     content: Yup.string().required('Note content is required'),
     category: Yup.string().optional(),
});

const CreateNote = () => {
     const [isOpen, setIsOpened] = useState(false);

     const formik = useFormik({
          initialValues: {
               title: '',
               content: '',
               category: 'general',
          },
          validationSchema,
          onSubmit: async (values, { resetForm }) => {
               const url = `${API_URL}/notes/create`;
               const id = localStorage.getItem('id');
               const token = localStorage.getItem('token');
               const data = {
                    user_id: id,
                    title: values.title,
                    content: values.content,
                    category: values.category,
               };

               try {
                    const response = await axios.post(url, data, {
                         headers: {
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${token}`,
                         }
                    });

                    if (response.status === 200) {
                         toast.success(response.data.message);
                         resetForm();
                         setIsOpened(false);
                         window.location.reload();
                    }
               } catch (error) {
                    toast.error(error.response?.data?.message || 'Failed to create note');
               }
          }
     });

     return (
          <>
               <button
                    className="bg-color1 w-16 h-16 flex flex-col justify-center items-center rounded-full text-white fixed right-4 bottom-4"
                    onClick={() => setIsOpened(!isOpen)}
               >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="w-8 h-8">
                         <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                    </svg>
               </button>

               {isOpen && (
                    <div className="fixed top-28 p-4 bg-white shadow-md rounded-lg w-5/6 left-1/2 transform -translate-x-1/2">
                         <div className='flex justify-between items-center mb-4'>
                              <span></span>
                              <h1 className="text-center text-2xl font-bold">Create Note</h1>
                              <span
                                   className='cursor-pointer text-red-500'
                                   onClick={() => setIsOpened(false)}
                              >
                                   <CgClose size={24} />
                              </span>
                         </div>

                         <form onSubmit={formik.handleSubmit}>
                              <div className="flex flex-col space-y-4">
                                   {formik.touched.title && formik.errors.title ? (
                                        <p className="text-red-500 text-xs">{formik.errors.title}</p>
                                   ) : null}
                                   <input
                                        type="text"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        placeholder="Note title"
                                        className="w-full p-2 border rounded-lg"
                                   />

                                   {formik.touched.content && formik.errors.content ? (
                                        <p className="text-red-500 text-xs">{formik.errors.content}</p>
                                   ) : null}
                                   <textarea
                                        name="content"
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                        placeholder="Note content"
                                        rows={5}
                                        className="w-full p-2 border rounded-lg"
                                   />

                                   <select
                                        name="category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        className="w-full p-2 border rounded-lg"
                                   >
                                        <option value="general">General</option>
                                        <option value="personal">Personal</option>
                                        <option value="work">Work</option>
                                        <option value="ideas">Ideas</option>
                                   </select>

                                   <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-color1 text-white font-bold rounded-lg"
                                   >
                                        Create Note
                                   </button>
                              </div>
                         </form>
                    </div>
               )}
          </>
     );
};

export default CreateNote;