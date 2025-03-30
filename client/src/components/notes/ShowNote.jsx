/* eslint-disable react/prop-types */
import { toast } from 'react-hot-toast';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { AiFillTag } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import CreateNote from './CreateNote';

const API_URL = import.meta.env.VITE_API_URL;

const ShowNote = ({ notes, isOpen, set }) => {
     const deleteNote = async (noteId) => {
          try {
               const token = localStorage.getItem('token');

               const requestOptions = {
                    method: "DELETE",
                    headers: {
                         'Content-Type': 'application/json',
                         Authorization: `Bearer ${token}`,
                    },
               };

               let response = await fetch(`${API_URL}/notes/delete/${noteId}`, requestOptions);

               if (response.status === 200) {
                    toast.success("Note deleted successfully.");
               } else {
                    toast.error("Failed to delete notes.");
               }
          } catch (error) {
               console.error("Error deleting note:", error);
               toast.error("Failed to delete notes.");
          }
     };

     const getCategoryColor = (category) => {
          switch (category) {
               case 'personal': return 'bg-color2/20 text-color2';
               case 'work': return 'bg-color1 text-white';
               case 'ideas': return 'bg-color1/20 text-color1';
               default: return 'bg-gray-200 text-color1';
          }
     };

     const handleNoteClick = (notes) => {
          console.log("Note clicked:", notes);
          alert("Note clicked:", notes);
          return (
               <>
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur deleniti nemo quasi debitis placeat voluptatum tempore dignissimos ullam optio cumque odio numquam, iusto fugiat accusantium non. Soluta nam, voluptate officia molestiae maiores error dignissimos, ea nisi, corporis quasi non laudantium laborum? Quo officia aspernatur dolores earum, ullam temporibus ea debitis ipsum voluptate, quam animi necessitatibus architecto voluptates, provident optio maiores? Fugit, cumque nulla? Suscipit et, corporis odit nihil ex aspernatur itaque sint deserunt eius harum. Ipsa quae ducimus cumque perspiciatis alias repudiandae amet doloribus repellendus numquam, officiis, assumenda eligendi esse quam! Blanditiis tempora possimus laudantium iusto alias quas voluptate itaque omnis voluptas accusantium numquam repudiandae ipsum odit aspernatur et ipsam, fugiat labore modi nisi sapiente eum adipisci. Minima, laudantium quasi illo a sunt cupiditate quia, fugiat quis, mollitia perferendis quibusdam. Temporibus iusto accusantium pariatur, non placeat voluptates adipisci ipsa molestias facilis exercitationem magni. Mollitia debitis voluptas quia voluptates quidem minus, tempore, quo veritatis accusamus quis sint, qui laborum reprehenderit blanditiis totam quam assumenda temporibus harum dignissimos deleniti repudiandae! Quibusdam, vitae placeat! Deleniti, molestias beatae sed, earum quam dicta quis cupiditate doloremque facere hic mollitia, similique ipsa recusandae et accusamus distinctio? Dolore, nesciunt culpa veritatis eaque minima corporis aliquam! Ducimus, cumque?
               <CreateNote notes={notes} />
               </>
          )
     }

     return (
          <>
               {isOpen && (
                    <div className="fixed top-28 p-4 bg-white shadow-md rounded-lg w-5/6 left-1/2 transform -translate-x-1/2 border border-color1 z-50">
                         <div className='flex justify-between items-center mb-4'>
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getCategoryColor(notes.category)}`}>
                                   <AiFillTag className="mr-1" />
                                   {notes.category || 'Uncategorized'}
                              </div>
                              <h2 className="font-bold text-xl mb-2">{notes.title || 'Untitled Note'}</h2>
                              <span
                                   className='cursor-pointer text-red-500'
                                   onClick={() => set(false)}
                              >
                                   <CgClose size={24} />
                              </span>
                         </div>
                         <div className="flex justify-between items-start mb-2">
                              <div className="text-xs text-gray-400 mt-2">
                                   Created: {notes.created_at
                                        ? new Date(notes.created_at).toLocaleDateString()
                                        : 'Unknown date'}
                              </div>
                              <div className="flex space-x-2">
                                   <button
                                        className="text-color1 p-1 rounded-full cursor-pointer"
                                        onClick={() => {()=> handleNoteClick(notes)}}
                                   >
                                        <BiEdit size={20} />
                                   </button>
                                   <button
                                        className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                                        onClick={() => deleteNote(notes.id)}
                                   >
                                        <BiTrash size={20} />
                                   </button>
                              </div>
                         </div>
                         <p className="text-sm text-gray-600 max-h-96 overflow-y-auto">
                              {notes.contet}
                         </p>
                    </div>
               )}
          </>
     );
};


export default ShowNote;