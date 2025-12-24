

import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';
type TerminateProps = {
    onClick?: () => void;
}

const Terminate:React.FC<TerminateProps> = ({onClick}) => {
  
    return (
            <button onClick={onClick} className='px-[0.3rem] py-[0.3rem] rounded-full border border-blue-600 bg-quaternary_green'>
                <Icon icon="lets-icons:flag-finish-fill" className='text-blue-600 text-[1.2rem]' />
            </button>
    );
}

export default Terminate;
