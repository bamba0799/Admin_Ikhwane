import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
type DeleteButtonProps = {
    onClick?: () => void;
}

const DeleteButton:React.FC<DeleteButtonProps> = ({onClick}) => {
  
    return (
            <button onClick={onClick} className='px-[0.3rem] py-[0.3rem] rounded-full border border-primary_red bg-tertiary_red'>
                <Icon icon="material-symbols:delete" className='text-primary_red text-[1.2rem]' />
            </button>
    );
}

export default DeleteButton;
