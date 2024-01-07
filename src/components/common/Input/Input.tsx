import type { FC, ChangeEvent, RefObject } from 'react';

interface InputProps {
       value?: string | number;
       onChange: (e: ChangeEvent<HTMLInputElement>) => void;
       type?: string;
       accept?: string;
       inputRef?: RefObject<HTMLInputElement>;
       className?: string;
       id?: string;
}

export const Input: FC<InputProps> = ({ value, onChange, type, accept, inputRef, className, id }) => (
       <input
              value={value}
              onChange={onChange}
              type={type}
              accept={accept}
              ref={inputRef}
              className={className}
              id={id}
       />
);
