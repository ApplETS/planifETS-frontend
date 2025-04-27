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
      <label htmlFor={id} className="mb-1 block text-textDarkBackground">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-textDarkBackground bg-login p-3 text-textDarkBackground placeholder:text-textDarkBackground/40 focus:outline-hidden focus:ring-2 focus:ring-buttonTags"
        required
      />
    </div>
  );
};

export default InputField;
