import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
// import esphereLogo from "../../assets/logo2.jpg";

interface SideBarProps {
    isSidebarOpen: boolean;
}
const sideBarItems = [
    {
    icon: "material-symbols:empty-dashboard-sharp",
    name:"Tableau de bord",
    path: "/home",
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
    icon: "uiw:logout",
    name:"Deconnexion",
    path: "/",
  },
];





const SideBar: React.FC<SideBarProps> = ({ isSidebarOpen }) => {
    const [activeTab, setActiveTab] = useState<string>("");
    useEffect(() => {
        // Set the active tab based on the current URL path
        const currentPath = window.location.pathname;
        const activeItem = sideBarItems.find(item => item.path === currentPath) 
        if (activeItem) {
            setActiveTab(activeItem.name);
        }
    }, []);

    return (
        <aside
            className={` fixed top-0 left-0 z-40 bg-primary_green w-[199px] h-screen pt-[80px] bg-white-300 border-l-[2px] border-primary_orange lg:hidden transition-transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <div className="h-full px-[8px] pb-4 overflow-auto">
                <span className="text-white/70 text-[16px] font-semibold">Menu</span>
                <div className="my-2 border-b-[1px] mb-[16px] text-white/70"></div>
                {/* Menu items */}
                <div className="px-">
                    {sideBarItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.path}
                            className={`flex items-center rounded-md pl-2 py-[12px] hover:bg-blue-[20px] mt-2 ${
                                activeTab === item.name ? "bg-white/30 text-white" : "text-white/70"
                            }`}
                            onClick={() => {
                                if (item.name=="Deconnexion") {
                                    console.log("deconnexion");
                                    localStorage.clear();
                                }
                                setActiveTab(item.name);
                            }} // Update the active tab on click
                        >
                            <Icon icon={item.icon} className="w-5 h-5" />
                            <span className="ml-[6px] text-[13px]">{item.name}</span>
                        </a>
                    ))}
                </div>

            </div>
        </aside>
    );
};

export default SideBar;
