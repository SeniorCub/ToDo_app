/* eslint-disable react/prop-types */
import { BsFileText } from 'react-icons/bs';
import { BiEdit, BiMicrophone, BiTrash, BiPlay, BiPause } from 'react-icons/bi';
import { useState, useRef, useEffect } from 'react';
import music from '../../assets/file.mp3';

const formatTime = (seconds) => {
     if (isNaN(seconds)) return '0:00';
     const mins = Math.floor(seconds / 60);
     const secs = Math.floor(seconds % 60);
     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const DiaryEntry = ({ entry }) => {
     const [isPlaying, setIsPlaying] = useState(false);
     const [progress, setProgress] = useState(0);
     const [currentTime, setCurrentTime] = useState(0);
     const [duration, setDuration] = useState(0);
     const audioRef = useRef(null);

     const togglePlayPause = () => {
          if (audioRef.current) {
               if (isPlaying) {
                    audioRef.current.pause();
               } else {
                    audioRef.current.play();
               }
               setIsPlaying(!isPlaying);
          }
     };

     const handleProgressChange = (e) => {
          const manualChange = Number(e.target.value);
          if (audioRef.current) {
               audioRef.current.currentTime = (manualChange / 100) * duration;
          }
          setProgress(manualChange);
     };

     useEffect(() => {
          if (!audioRef.current) return;

          const audioElement = audioRef.current;

          const updateProgress = () => {
               if (audioElement) {
                    const progressPercent =
                         (audioElement.currentTime / audioElement.duration) * 100;
                    setProgress(progressPercent);
                    setCurrentTime(audioElement.currentTime);
               }
          };

          const handleLoadedMetadata = () => {
               setDuration(audioElement.duration);
          };

          audioElement.addEventListener('timeupdate', updateProgress);
          audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);

          return () => {
               if (audioElement) {
                    audioElement.removeEventListener('timeupdate', updateProgress);
                    audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
               }
          };
     }, []);

     return (
          <div className="bg-white shadow-md rounded-lg p-4 mb-4 relative">
               <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                         {entry === 'text' ? (
                              <BsFileText className="mr-2 text-color1" />
                         ) : (
                              <BiMicrophone className="mr-2 text-color1" />
                         )}
                         <span className="text-sm text-gray-500">
                              11:30 AM, 12th Oct 2023
                         </span>
                    </div>
                    <div className="flex space-x-2">
                         <button
                              className="text-blue-500 hover:bg-blue-100 p-1 rounded-full"
                         >
                              <BiEdit size={20} />
                         </button>
                         <button
                              className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                         >
                              <BiTrash size={20} />
                         </button>
                    </div>
               </div>

               {entry === 'text' ? (
                    <p className="text-gray-800">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis provident suscipit velit officia vel nobis. Itaque ut perferendis hic rem minima provident earum architecto porro quae amet sit tempore esse, commodi aliquam voluptate saepe delectus similique adipisci obcaecati laboriosam harum.</p>
               ) : (
                    <div className="bg-gray-100 rounded-lg p-3 flex items-center space-x-3">
                         <button
                              onClick={togglePlayPause}
                              className="bg-color1 text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
                         >
                              {isPlaying ? <BiPause size={20} /> : <BiPlay size={20} />}
                         </button>
                         <div className="flex-1 relative">
                              <input
                                   type="range"
                                   min="0"
                                   max="100"
                                   value={progress}
                                   onChange={handleProgressChange}
                                   className="w-full h-1 bg-gray-300 rounded-full appearance-none cursor-pointer 
                                   [&::-webkit-slider-thumb]:appearance-none 
                                   [&::-webkit-slider-thumb]:w-3 
                                   [&::-webkit-slider-thumb]:h-3 
                                   [&::-webkit-slider-thumb]:bg-color1 
                                   [&::-webkit-slider-thumb]:rounded-full"
                              />
                         </div>
                         <span className="text-sm text-gray-600">
                              {formatTime(currentTime)} / {formatTime(duration)}
                         </span>
                         <audio
                              ref={audioRef}
                              src={music}
                              onPlay={() => setIsPlaying(true)}
                              onPause={() => setIsPlaying(false)}
                              onEnded={() => {
                                   setIsPlaying(false);
                                   setProgress(0);
                                   if (audioRef.current) {
                                        audioRef.current.currentTime = 0;
                                   }
                              }}
                         />
                    </div>
               )}
          </div>
     );
}

export default DiaryEntry;
