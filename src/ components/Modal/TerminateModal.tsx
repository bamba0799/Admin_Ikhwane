import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

type TerminateModalProps = {
    openTerminate: boolean;
    onCloseTerminate: () => void;
    terminateAction: () => any;
    cancelTerminateAction: () => any;
    text: string;
}

const TerminateModal: React.FC<TerminateModalProps> = ({ openTerminate, onCloseTerminate, terminateAction, cancelTerminateAction, text }) => {
    return (
        <div onClick={onCloseTerminate} className={`fixed inset-0 flex justify-center z-[9999999999px] items-center transition-colors ${openTerminate ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-lg shadow p-[20px] transition-all ${openTerminate ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className=' flex flex-row justify-center items-center'>
                    <Icon icon="lets-icons:flag-finish-fill" className='text-blue-600 text-[50px]' />
                </div>
                <div>
                    <h1 className='text-center text-[18px] font-bold'>Terminer la visite</h1>
                </div>
                <div className='flex flex-row justify-center mt-[10px] text-[14px] text-black/60'>
                    {text}
                </div>
                <div className='w-full flex flex-row items-center space-x-[40px] mt-[20px]'>
                    <button onClick={terminateAction} className='bg-blue-600 text-white px-[20px] py-[6px] rounded-[9px] shadow-sm font-bold'>Terminer</button>
                    <button onClick={cancelTerminateAction} className='bg-white text-black/70 px-[20px] py-[6px] rounded-[9px] shadow-md border font-bold '>Annuler</button>
                </div>
            </div>

        </div>
    );
}

export default TerminateModal;
