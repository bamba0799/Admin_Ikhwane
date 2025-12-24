import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

type ConnexionInputProps = {
    // type: "text" | "password" | "email";
    icon: string,
    isPassword?: boolean;
    placeholder?: string;
    value?: string;
    required?: boolean;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ConnexionInput = React.forwardRef<HTMLInputElement,ConnexionInputProps>(({icon, placeholder, onChange, value, required, className, isPassword, ...props },ref) => {
    return (
        <div className='rounded-[5px] border border-primary_green flex flex-row items-center h-[40px]'>
            <div className=' border border-primary_green rounded-l-[5px] w-[50px] flex flex-row justify-center items-center h-full bg-primary_green'>
                <Icon icon={icon} className="w-5 h-5 text-white"/>
            </div>
            <div className='relative w-full '>
                {
                    isPassword && (
                        <div className='absolute right-0 top-0 bottom-0 flex items-center'>
                            <Icon icon={"ph:eyes"} className='w-5 h-5 text-primary_green mr-[10px]' />
                        </div>
                    )
                }
                <input
                    value={value}
                    type={isPassword ? 'password' : 'number'}
                    onChange={onChange}
                    ref={ref as React.Ref<HTMLInputElement>}
                    {...props}
                    className={`${className} w-full h-[40px] rounded-r-[5px] px-[10px] text-[14px] border border-primary_green outline-none focus:outline-none font-bold ${isPassword ? 'pr-[30px]' : ''}`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}
)

export default ConnexionInput;
