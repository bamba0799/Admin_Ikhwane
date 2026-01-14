import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
type BadgeButtonProps = {
    onClick?: () => void;
}

const BadgeButton:React.FC<BadgeButtonProps> = ({onClick}) => {
  
    return (
            <button onClick={onClick} className='px-[0.3rem] py-[0.3rem] rounded-full border border-green-600 bg-[#e0f7e9]'>
                <Icon icon="material-symbols:badge" className='text-primary_green text-[1.2rem]' />
            </button>
    );
}

export default BadgeButton;
