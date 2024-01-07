import React, { useRef } from 'react';
import { Input } from '..';
import css from './uploadButton.module.css';

interface UploadButtonProps {
  onUpload: (file: File) => void;
  accept?: string;
  inputId?: string;
  text?: string;
  icon?: React.ReactNode;
}

export const UploadBtn: React.FC<UploadButtonProps> = ({ onUpload, accept, inputId, text, icon }) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length) {
      const file = event.target.files[0];
      onUpload(file);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  return (
    <div className={css.uploadBtnWrapper}>
      <label htmlFor={inputId} className={css.labelUpload}>
        {icon}
        <p className={css.clipBtnText}>{text}</p>
      </label>
      <Input
        className={css.inputForUploadIcon}
        id={inputId}
        inputRef={inputRef}
        type="file"
        onChange={handleInputChange}
        accept={accept || 'image/*'}
      />
    </div>

  );
};