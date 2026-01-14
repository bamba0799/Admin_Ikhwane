import { useState } from "react"
import Header from "../Header/Header"
import SideBar from "../SideBar/SideBar"



const SecondMain = ({children}:any) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className="">
         {isSidebarOpen?
    <button onClick={()=>toggleSideBar()} className='fixed top-0 left-0 z-10 bg-slate-950/[0.2] w-full h-full'>
    </button>
    :null
    }
    <Header isActiveMenuBar={false} toggleSideBar={toggleSideBar}/>
    <SideBar isSidebarOpen={isSidebarOpen}/>
      {children}
    </div>
  );
}
 export default SecondMain;