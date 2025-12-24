import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

type DeleteModalProps = {
    open: boolean;
    onClose: () => void;
    deleteAction: () => any;
    cancelAction: () => any;
    text: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, deleteAction, cancelAction, text }) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center z-[9999999999px] items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-lg shadow p-[20px] transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className=' flex flex-row justify-center items-center'>
                    <Icon icon="material-symbols:delete-outline" className='text-red-500 text-[50px]' />
                </div>
                <div>
                    <h1 className='text-center text-[18px] font-bold'>Confirmez la suppression</h1>
                </div>
                <div className='flex flex-row justify-center mt-[10px] text-[14px] text-black/60'>
                    {text}
                </div>
                <div className='w-full flex flex-row items-center space-x-[40px] mt-[20px]'>
                    <button onClick={deleteAction} className='bg-red-500 text-white px-[20px] py-[6px] rounded-[9px] shadow-sm font-bold'>Supprimer</button>
                    <button onClick={cancelAction} className='bg-white text-black/70 px-[20px] py-[6px] rounded-[9px] shadow-md border font-bold '>Annuler</button>
                </div>
            </div>

        </div>
    );
}

export default DeleteModal;
