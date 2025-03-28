/* eslint-disable react/prop-types */
import { toast } from 'react-hot-toast';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { AiFillTag } from 'react-icons/ai';

const API_URL = import.meta.env.VITE_API_URL;

const NoteEach = ({ notes = [], onUpdateNotes }) => {
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
                    onUpdateNotes(noteId);
               } else {
                    toast.error("Failed to delete note.");
               }
          } catch (error) {
               console.error("Error deleting note:", error);
               toast.error("Failed to delete note.");
          }
     };

     const getCategoryColor = (category) => {
          switch (category) {
               case 'personal': return 'bg-green-100 text-green-800';
               case 'work': return 'bg-color1 text-color1';
               case 'ideas': return 'bg-purple-100 text-purple-800';
               default: return 'bg-gray-100 text-gray-800';
          }
     };

     // Added null checks and default empty array
     if (!notes || !Array.isArray(notes)) {
          return (
               <div className="text-center text-gray-500 p-4">
                    No notes available or invalid data.
               </div>
          );
     }

     return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
               {notes.length === 0 ? (
                    <p className="text-center text-gray-500 col-span-full">No notes available.</p>
               ) : (
                    notes.map((note) => (
                         <div
                              key={note.id}
                              className="bg-white shadow-md rounded-lg p-4 relative border"
                         >
                              <div className="flex justify-between items-start mb-2">
                                   <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getCategoryColor(note.category)}`}>
                                        <AiFillTag className="mr-1" />
                                        {note.category || 'Uncategorized'}
                                   </div>
                                   <div className="flex space-x-2">
                                        <button
                                             className="text-color1 hover:bg-color1 p-1 rounded-full"
                                             onClick={() => {/* Edit functionality */ }}
                                        >
                                             <BiEdit size={20} />
                                        </button>
                                        <button
                                             className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                                             onClick={() => deleteNote(note.id)}
                                        >
                                             <BiTrash size={20} />
                                        </button>
                                   </div>
                              </div>

                              <div>
                                   <h2 className="font-bold text-lg mb-2">{note.title || 'Untitled Note'}</h2>
                                   <p className="text-sm text-gray-600 line-clamp-3">
                                        {note.content ?
                                             (note.content.length > 200
                                                  ? note.content.substring(0, 200) + '...'
                                                  : note.content)
                                             : 'No content'}
                                   </p>
                              </div>

                              <div className="text-xs text-gray-400 mt-2">
                                   Created: {note.createdAt
                                        ? new Date(note.createdAt).toLocaleDateString()
                                        : 'Unknown date'}
                              </div>
                         </div>
                    ))
               )}
          </div>
     );
};


export default NoteEach;