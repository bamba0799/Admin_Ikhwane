import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import logo_aeemci from "../../assets/logo_aeemci.jpg";
import Button from "../Button/Button";

interface HeaderProps {
  toggleSideBar: () => void;
  isActiveMenuBar?: boolean
  authName?: string

}
type HeaderIconType = {
  id: number
  icon: string,
  name: string,
  path: string
}

const Header: React.FC<HeaderProps> = ({ toggleSideBar, isActiveMenuBar = true, authName }) => {
  const [routeLoaded, setRouteLoaded] = useState<boolean>(false);
  console.log("routeLoaded", routeLoaded);
  
  const [activeTab, setActiveTab] = useState<number>(2);
  const HeaderIcon: HeaderIconType[] = [
    {
      id: 1,
      icon: "material-symbols:empty-dashboard-sharp",
      name: "Tableau de bord",
      path: "/home",
    },
    {
      id: 2,
      icon: "fa:group",
      name: "Comité d'organisation",
      path: "/comite-organisation",
    },
    {
      id: 3,
      icon: "mdi:account-student",
      name: "Séminariste",
      path: "/seminariste",
    },
    {
      id: 4,
      icon: "fa-solid:home",
      name: "Dortoir",
      path: "/dortoir",
    },
    {
      id: 5,
      icon: "heroicons:users-solid",
      name: "Visiteurs",
      path: "/visiteur",
    },

    {
      id: 6,
      icon: "uiw:logout",
      name: "Deconnexion",
      path: "/",
    },
  ]
  const isRouteValid = (): boolean => {
    let currentRouteId: any = localStorage.getItem('currentRouteId')
    currentRouteId = currentRouteId ? parseInt(currentRouteId, 10) : 0;
    return HeaderIcon.some(item => item.id === currentRouteId); // Retourne true si le chemin actuel est dans la liste
  };


  const handleRefresh = () => {
    window.location.reload();
  };


  const getOnglet = () => {
    let currentRouteId: any = localStorage.getItem('currentRouteId')
    currentRouteId = currentRouteId ? parseInt(currentRouteId, 10) : 0;
    const activeItem = HeaderIcon.find(item => item.id === currentRouteId);
    if (activeItem) {
      setActiveTab(activeItem.id);
    }
    setRouteLoaded(true);
  }

  useEffect(() => {
    getOnglet();
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white ">
      {/* <h2>Header</h2> */}
      <div className="px-3 py-3 lg:px-5 lg:pl-3 md:border-b-[3px] md:border-primary_orange">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <div className="lg:hidden flex flex-row items-center space-x-[5px]">
              {isRouteValid() &&
                <button onClick={toggleSideBar} className=" inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                  <Icon icon="vaadin:menu" className="w-4 h-4 text-black" />
                </button>
              }
              <p className="text-[12px] text-green-700">Admin Ikhwane</p>
            </div>
            <div className="flex flex-row items-center space-x-[25px]">
              <img className="w-12 h-9  object-fill hidden lg:flex lg:items-center" src={logo_aeemci} alt="" />
              <Button onClick={handleRefresh} outline={true} className="hidden lg:flex" bg={""}>
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
              <p>{authName}</p>
              {/* <p>dk47hh8</p> */}
            </div>
            <div className="p-1 flex flex-col lg:hidden items-start  opacity-0 group-hover:opacity-100 lg:group:opacity-100 transition-opacity duration-300 absolute -top-1/2 transform translate-y-[15%] right-[45px] border bg-white text-[12px]">
              <span>{authName}</span>
              {/* <p>dk47hh8</p> */}
            </div>
            {/* <Icon icon="basil:user-solid" className="w-[30px] h-[30px] text-black absolute"/> */}
            <div className="absolute rounded-full w-[20px] h-[20px]">
              <Icon icon="solar:user-bold" className="w-full h-full text-black" />
            </div>

          </button>
        </div>
      </div>
      <div className={`bg-primary_green px-[15px] h-[80px]  fixed w-full hidden ${isActiveMenuBar == true ? "lg:flex" : "lg:none"} flex-col justify-center`}>
        <div className="flex flex-row h-full justify-between">
          {HeaderIcon.map((item, index) => (
            <a key={index} href={item.path} onClick={() => {
              if (item.name == "Deconnexion") {
                console.log("deconnexion");
                localStorage.clear();
              }
              localStorage.setItem('currentRouteId', item.id.toString())
              setActiveTab(item.id)
            }} className={` w-[140px] flex flex-row justify-center items-center text-white/70 ${activeTab == item.id ? 'bg-white/30 text-white' : ''}`}>
              <div className="flex flex-col justify-between items-center space-y-[3px]">
                <Icon icon={item.icon} className={`w-[30px] h-[30px] ${activeTab == item.id ? 'text-white' : 'text-primary_gray'} `} />
                <span className={`text-[12px] ${activeTab == item.id ? 'text-white' : 'text-primary_gray'}`}>{item.name}</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
}

export default Header; 