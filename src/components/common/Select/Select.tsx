import React from 'react';

interface SelectProps {
  options?: string[];
  onChange?: (value: string) => void;
  className?: string;
  selectedValue?: string;
}

export const Select: React.FC<SelectProps> = ({ options, onChange, className, selectedValue }) => {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <select
      value={selectedValue}
      onChange={handleSelectChange}
      className={className}
    >
      <option>None selected</option>
      {options &&
        options.map((option, index) => option !== "" && (
          <option key={index}>{option}</option>
        ))}
    </select>
  );
};