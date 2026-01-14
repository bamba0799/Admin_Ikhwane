import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
type EditButtonProps = {
    onClick?: () => void;
}

const EditButton:React.FC<EditButtonProps> = ({onClick}) => {
  
    return (
            <button onClick={onClick} className='px-[0.3rem] py-[0.3rem] rounded-full border border-green-600 bg-quaternary_green'>
                <Icon icon="mdi:pencil" className='text-primary_green text-[1.2rem]' />
            </button>
    );
}

export default EditButton;
