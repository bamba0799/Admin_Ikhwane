import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import logo_aeemci from "../../assets/logo_aeemci.jpg";
import Button from "../Button/Button";
import messi from '../../assets/lionel-messi.jpg';

interface HeaderProps {
  toggleSideBar: () => void;
}
type HeaderIconType = {
  icon: string,
  name: string,
  path: string
}

const Header: React.FC<HeaderProps> = ({ toggleSideBar }) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const HeaderIcon: HeaderIconType[] = [
    {
      icon: "material-symbols:empty-dashboard-sharp",
      name:"Tableau de bord",
      path: "/",
    },
    {
      icon: "fa:group",
      name:"Comité d'organisation",
      path: "/comite-organisation",
    },
    {
      icon: "mdi:account-student",
      name:"Séminariste",
      path: "/seminariste",
    },
    {
      icon: "fa-solid:home",
      name:"Dortoir",
      path: "/dortoir",
    },
    {
      icon: "heroicons:users-solid",
      name:"Visiteurs",
      path: "/visiteur",
    },
    {
      icon: "ri:file-check-fill",
      name:"Piste d'audit",
      path: "/piste-audit",
    },
    {
      icon: "bi:patch-check-fill",
      name:"Permissions",
      path: "/permissions",
    },
    

  ]


  const getOnglet = () => {
    const currentPath = window.location.pathname;
    const activeItem = HeaderIcon.find(item => item.path === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.path);
    }
  }

  useEffect(() => {
    getOnglet();
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white ">
      {/* <h2>Header</h2> */}
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <div className="lg:hidden flex flex-row items-center space-x-[5px]">
              <button onClick={toggleSideBar} className=" inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <Icon icon="vaadin:menu" className="w-4 h-4 text-black" />
              </button>
              <p className="text-[12px] text-green-700">Admin Ikhwane</p>
            </div>
            <div className="flex flex-row items-center space-x-[25px]">
              <img className="w-12 h-9  object-fill hidden lg:flex lg:items-center" src={logo_aeemci} alt="" />
              <Button className="hidden lg:flex">
                <div className="button-icon text-green-800">
                  <Icon icon="charm:refresh" />
                  <p>Rafraichir</p>
                </div>
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex">
            <p className="text-green-800 font-semibold text-[12px]">Système de gestion administratif du séminaire Al Ikhwane</p>
          </div>
          <button className="relative  rounded-full h-[30px] w-[30px] flex flex-row justify-center items-center group">
            <div className="absolute hidden lg:flex flex-col text-[12px] right-[50px] ">
              <p>Kandé</p>
              <p>dk47hh8</p>
            </div>
            <div className="p-1 flex flex-col lg:hidden items-start  opacity-0 group-hover:opacity-100 lg:group:opacity-100 transition-opacity duration-300 absolute -top-1/2 transform translate-y-[15%] right-[45px] border bg-white text-[12px]">
              <span>Kandé</span>
              <p>dk47hh8</p>
            </div>
            {/* <Icon icon="basil:user-solid" className="w-[30px] h-[30px] text-black absolute"/> */}
            <div className="absolute rounded-full w-[35px] h-[35px]">
              <img src={messi} alt="" className=" text-black h-full w-full rounded-full object-cover" />
            </div>

          </button>
        </div>
      </div>
      <div className=' bg-primary_green px-[15px] h-[80px] border-t-[3px] border-primary_orange fixed w-full hidden lg:flex flex-col justify-center'>
        <div className="flex flex-row h-full justify-between">
          {HeaderIcon.map((item, index) => (
            <a key={index} href={item.path} onClick={() => {
              setActiveTab(item.path)
            }} className={` w-[140px] flex flex-row justify-center items-center text-white/70 ${activeTab == item.path ? 'bg-white/30 text-white' : ''}`}>
              <div className="flex flex-col justify-between items-center space-y-[3px]">
                <Icon icon={item.icon} className={`w-[30px] h-[30px] ${activeTab == item.path ? 'text-white' : 'text-primary_gray'} `} />
                <span className={`text-[12px] ${activeTab == item.path ? 'text-white' : 'text-primary_gray'}`}>{item.name}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
}

export default Header; 