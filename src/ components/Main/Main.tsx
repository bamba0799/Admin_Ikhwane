import { useState } from "react"
import Header from "../Header/Header"
import SideBar from "../SideBar/SideBar"



const Main = ({children}:any) => {

  let auth: any = localStorage.getItem("user");
  auth = JSON.parse(auth);
  console.log("auth", auth);

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
    <Header toggleSideBar={toggleSideBar} authName={auth?.nomPers}/>
    <SideBar isSidebarOpen={isSidebarOpen}/>
      {children}
    </div>
  );
}
 export default Main;