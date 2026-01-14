import React from "react";

type SelectProps = {
    options: { value: string; label: string }[];
    label?: string;
    value:  any
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}


const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ options, label, value, onChange, placeholder, required = true },ref) => {
    return (
        <div className="flex flex-col space-y-[5px]  border-red-600">
            {label && <label className='text-[14px]'>
                <span className="text-primary_gray">{label}</span>
                {required && <span className='text-red-500'>*</span>}
            </label>}
            <select
                className="w-full h-[40px] px-[10px] border text-[14px] text-primary_green focus:outline-none focus:ring focus:ring-blue-300"
                value={value}
                ref={ref as React.Ref<HTMLSelectElement>}
                onChange={(e) => onChange(e.target.value)}
            >       
                <option value="" disabled>{placeholder || "Choisir une option"}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;
