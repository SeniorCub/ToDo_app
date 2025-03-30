/* eslint-disable react/prop-types */
import SmallNavbar from '../components/navbar/SmallNavbar'



const MainLayout = ({ child }) => {
    const tab = window.location.href.split("/").length - 1

    return (

        <div className="bg-white h-screen w-screen overflow-hidden">
            <SmallNavbar tab={window.location.href.split("/")[tab]} />
            <div className='h-full overflow-y-auto'>
                {child}
            </div>
        </div>
    )

}

export default MainLayout