import React from 'react';
import LoaderB from '../LoaderB';

interface ButtonProps {
    isLoading?: boolean;
    children?: React.ReactNode;
    className?: string;
    outline?: boolean;
    bg: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ isLoading, children, onClick, className, outline, bg }) => {
    return (
        <button
            onClick={!isLoading ? onClick : undefined} // Désactive le clic si isLoading est true
            className={`px-[6px] h-[40px] rounded-[5px] flex flex-row justify-center items-center 
                ${outline ? 'border border-green-600' : ''} 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : `${bg}`} 
                ${className}`}
            disabled={isLoading} // Désactive le bouton si isLoading est true
        >
            {isLoading ? <LoaderB /> : children}
        </button>
    );
};

export default Button;
