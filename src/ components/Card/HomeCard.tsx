import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface HomeCardProps {
    title: string;
    item1: {
        title: string;
        value: number ;
    };
    item2: {
        title: string;
        value: number ;
    };
    item3?: {
        title: string;
        value: number;
    };
    icon: string;
    bg: string;
    eye?: boolean;
    onClickEye?: () => void;
}
// streamline:graph-arrow-decrease
const HomeCard: React.FC<HomeCardProps> = ({ title, item1, item2, item3, icon, bg, eye, onClickEye }) => {
    return (
        <button className={`${bg} shadow-md border flex flex-col items-center w-full lg:w-auto justify-between h-[90px] lg:h-[120px] rounded-[10px] px-[20px] lg:px-[40px] py-[15px]`}>
            <div className="flex flex-row items-center justify-between lg:space-x-[30px] w-full">
                <div className=" flex flex-row items-center space-x-[5px]">
                    <Icon icon={icon} className="w-[20px] h-[20px] text-primary_green/60"/>
                    <p className="w-full text-[0.8rem] text-primary_green font-bold">{title}</p>
                </div>
              {eye==true?
                <button onClick={onClickEye}>
                    <Icon icon="mdi:eye" className="w-[20px] h-[20px] text-primary_green/60"/>
               </button>:null
               }
            </div>
            <div className="flex flex-row items-center space-x-[10px] w-full">
                <div className="flex flex-row items-center space-x-[5px] ">
                    <span className="text-[0.8rem] text-primary_green">{item1.title}:</span>
                    <span className="text-[`1rem`] text-primary_green font-bold"> {item1.value}</span>
                </div>
                <div className="flex flex-row items-center space-x-[5px] ">
                    <span className="text-[0.8rem] text-primary_green">{item2.title}:</span>
                    <span className="text-[1rem] text-primary_green font-bold"> {item2.value}</span>
                </div>
               {item3 &&
                <div className="flex flex-row items-center space-x-[5px] ">
                    <span className="text-[0.8rem] text-primary_green">{item3?.title}:</span>
                    <span className="text-[1rem] text-primary_green font-bold"> {item3?.value}</span>
                </div>}
            </div>
        </button>
    );
}
export default HomeCard;