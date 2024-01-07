import type { FC, ChangeEvent, RefObject } from 'react';
import { ReactComponent as ImportIcon } from '../../../assets/iconForInputFile.svg';
import css from './inputFile.module.css';

interface InputProps {
       value?: string | number;
       onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
       type?: string;
       accept?: string;
       inputRef?: RefObject<HTMLInputElement>;
       className?: string;
       text: string;
}

export const InputFile: FC<InputProps> = ({ onChange, type, accept, text }) => (
       <div>
              <label className={css.inputLabel}  htmlFor="formId">
                     <input className={css.inputFile} onChange={onChange} name="" type={type} id="formId" accept={accept}/>
                     <ImportIcon className={css.inputIcon}/>
                     {text}
              </label>
       </div>
       
);
