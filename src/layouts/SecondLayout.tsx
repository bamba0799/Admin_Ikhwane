import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
type SecondLayoutProps = {
    children: React.ReactNode;
    title: string;
}
const SecondLayout: React.FC<SecondLayoutProps> = ({ children, title }) => {
    return (
        <div className='mt-[85px] lg:mt-[110px] px-[18px] mb-[30px] lg:mb-[70px]'>
            <div className='flex flex-row  items-center space-x-[5px] mb-[10px]'>
                <Icon icon="fa-solid:home" className='text-secondary_green'/>
                <div className='flex flex-row items-center space-x-[1px]'>
                    <Icon icon="tdesign:chevron-right-double" className='text-secondary_green text-[10px]'/>
                    <span className='text-secondary_green text-[0.8rem]'>{title}</span>
                    <Icon icon="tdesign:chevron-right-double" className='text-secondary_green text-[10px]'/>
                </div>
            </div>
            {children}
        </div>
    );
}

export default SecondLayout;
