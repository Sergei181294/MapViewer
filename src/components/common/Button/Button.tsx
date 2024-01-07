import React from 'react';

interface ButtonProps {
       onClick?: (e: React.FormEvent) => void;
       text: string;
       disabled: boolean;
       className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, text, disabled, className }) => (

       <button onClick={onClick} disabled={disabled} className={className}>
              {text}
       </button>
);