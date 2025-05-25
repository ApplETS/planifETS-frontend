import React from 'react';

type InputFieldProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, placeholder, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-foreground">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-border bg-input p-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
    </div>
  );
};

export default InputField;
