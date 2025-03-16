/* eslint-disable react/prop-types */

const SmallNavbar = ({tab}) => {
     return (
          <div className="flex justify-between items-center p-5 mt-[5vh]">
               <div className="text-color1 font-bold text-2xl capitalize">{tab}</div>
               <div className="avatar">
                    <div className="w-12 rounded-full">
                         <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
               </div>
          </div>
     )
}

export default SmallNavbar