import React, { InputHTMLAttributes, useRef } from 'react';

interface FloatingLabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label, value, onChange, className = '', ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isActive = Boolean(value) || inputRef.current?.matches(':focus');

  return (
    <div className={`relative w-full ${className}`}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChange}
        className="peer block w-full rounded-md border border-input bg-background px-3 pt-6 pb-2 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder-transparent"
        placeholder=" "
        {...props}
      />
      <label
        className={`absolute left-3 top-2 text-muted-foreground text-base transition-all duration-200 pointer-events-none
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary
          ${isActive ? 'top-2 text-xs text-primary' : ''}`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput; 