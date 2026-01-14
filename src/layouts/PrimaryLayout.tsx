import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
type PrimaryLayoutProps = {
    children: React.ReactNode;
    title: string;
}
const PrimaryLayout: React.FC<PrimaryLayoutProps> = ({ children, title }) => {
    return (
        <div className='mt-[70px] lg:mt-[160px] px-[18px] mb-[30px] lg:mb-[70px]'>
            <div className='flex flex-row  items-center space-x-[5px] mb-[10px]'>
                <Icon icon="fa-solid:home" className='text-secondary_green'/>
                <div className='flex flex-row items-center space-x-[1px]'>
                    <Icon icon="tdesign:chevron-right-double" className='text-secondary_green text-[10px]'/>
                    <span className='text-secondary_green text-[0.8rem]'>{title}</span>
                    <Icon icon="tdesign:chevron-right-double" className='text-secondary_green text-[10px]'/>
                </div>
            </div>
            <p className='text-primary_green font-bold text-[rem] mb-[10px]'>{title}</p>
            {children}
        </div>
    );
}

export default PrimaryLayout;
