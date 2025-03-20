/* eslint-disable react/prop-types */
import SmallNavbar from '../components/navbar/SmallNavbar'
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom"



const MainLayout = ({ child }) => {
    const tab = window.location.href.split("/").length - 1

    return (

        <div className="relative bg-white h-screen w-screen overflow-hidden">
            <Link to={"/dashboard"} className="fixed top-0 flex justify-between w-[100vw] p-5 items-center text-black text-2xl"><BiArrowBack /></Link>
            <SmallNavbar tab={window.location.href.split("/")[tab]} />
            <div className='h-full overflow-y-auto'>
                {child}
            </div>
        </div>
    )

}

export default MainLayout