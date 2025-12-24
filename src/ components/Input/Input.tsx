import React from 'react';

type InputProps = {
    type: string;
    label?: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    id: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, onChange, label, value, required, id, className, ...props }, ref) => {
    
    return (
      <div className={`flex flex-col ${label ? "space-y-[5px]" : ''} text-primary_gray`}>
        <label htmlFor={id} className='text-[14px]'>
          <span>{label}</span>
          {required && <span className='text-red-500'>*</span>}
        </label>
        <input
          id={id}
          value={value}
          type={type}
          onChange={onChange}
          ref={ref as React.Ref<HTMLInputElement>}
          {...props}
          className={`${className} w-full h-[40px] px-[10px] text-[14px] text-primary_green outline-none border border-primary_gray focus:border-primary_green focus:ring-0 font-bold`}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

export default Input;

Input.displayName = 'Input';
