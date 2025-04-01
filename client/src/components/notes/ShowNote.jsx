/* eslint-disable react/prop-types */
import { toast } from 'react-hot-toast';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { AiFillTag } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { useState } from 'react';
import CreateNote from './CreateNote';

const API_URL = import.meta.env.VITE_API_URL;

const ShowNote = ({ notes, isOpen, set }) => {
     const [isEditing, setIsEditing] = useState(false);
     const [selectedNote, setSelectedNote] = useState(null);

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

               let response = await fetch(`${API_URL}/note/delete/${noteId}`, requestOptions);

               if (response.ok) {
                    toast.success("Note deleted successfully.");
                    window.location.reload();
               } else {
                    toast.error("Failed to delete note.");
               }
          } catch (error) {
               console.error("Error deleting note:", error);
               toast.error("Failed to delete note.");
          }
     };

     const handleEditClick = () => {
          setSelectedNote(notes); // Set the current note for editing
          setIsEditing(true); // Open CreateNote modal
     };

     const getCategoryColor = (category) => {
          switch (category) {
               case 'personal': return 'bg-color2/20 text-color2';
               case 'work': return 'bg-color1 text-white';
               case 'ideas': return 'bg-color1/20 text-color1';
               default: return 'bg-gray-200 text-color1';
          }
     };

     return (
          <>
               {isOpen && notes && (
                    <div className='fixed top-0 left-1/2 transform -translate-x-1/2 w-full bg-black/50 h-full z-50 flex items-center justify-center'>
                         <div className="p-4 bg-white shadow-md rounded-lg w-5/6 border border-color1 max-h-[80vh] overflow-y-auto">
                              <div className='flex justify-between items-center mb-4'>
                                   <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getCategoryColor(notes.category || 'uncategorized')}`}>
                                        <AiFillTag className="mr-1" />
                                        {notes.category || 'Uncategorized'}
                                   </div>
                                   <h2 className="font-bold text-xl mb-2">{notes.title || 'Untitled Note'}</h2>
                                   <span className='cursor-pointer text-red-500' onClick={() => set(false)}>
                                        <CgClose size={24} />
                                   </span>
                              </div>
                              <div className="flex justify-between items-start mb-2">
                                   <div className="text-xs text-gray-400 mt-2">
                                        Created: {notes.created_at ? new Date(notes.created_at).toLocaleDateString() : 'Unknown date'}
                                   </div>
                                   <div className="flex space-x-2">
                                        <button className="text-color1 p-1 rounded-full cursor-pointer" onClick={handleEditClick}>
                                             <BiEdit size={20} />
                                        </button>
                                        <button className="text-red-500 hover:bg-red-100 p-1 rounded-full" onClick={() => deleteNote(notes.id)}>
                                             <BiTrash size={20} />
                                        </button>
                                   </div>
                              </div>
                              <p className="text-sm text-gray-600 max-h-96 overflow-y-auto w-full break-words">
                                   {notes.contet || "No content available."}
                              </p>
                         </div>
                    </div>
               )}

               {
                    isEditing && (
                         <CreateNote
                              isOpen={isEditing}
                              setIsOpen={setIsEditing}
                              notes={selectedNote} // Pass the selected note for editing
                         />
                    )
               }
          </>
     );
};

export default ShowNote;
