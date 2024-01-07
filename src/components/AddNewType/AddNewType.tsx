import React, { useState, useRef } from 'react';
import css from './addNewType.module.css';
import { Input, UploadBtn, Button } from '../../components/common';
import AvatarEditor from 'react-avatar-editor';
import { ReactComponent as CloseIcon } from '../../assets/closeIcon.svg';
import { ReactComponent as AddPhoto } from '../../assets/addPhoto.svg';

interface AddNewTypeProps {
       onUpload: (imageData: string | null) => void;
       setNewType: React.Dispatch<React.SetStateAction<string>>;
}

export const AddNewType: React.FC<AddNewTypeProps> = ({ onUpload, setNewType }) => {
       const [inputTypeValue, setInputTypeValue] = useState('');
       const [selectedImage, setSelectedImage] = useState<string | null>(null);

       const editorRef = useRef<AvatarEditor | null>(null);

       const isDisabledButton = !inputTypeValue || !selectedImage;

       const handleInputTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const result = e.target.value.replace(/[^а-яА-Я\s]/g, '');
              setInputTypeValue(result);
       }

       const handleFileUploaded = (file: File) => {
              const reader = new FileReader();

              reader.onloadend = () => {
                     const imageData = reader.result?.toString() || null;
                     setSelectedImage(imageData);
              };
              reader.readAsDataURL(file);
       };

       const handleDeletePhoto = () => {
              setSelectedImage(null);
              onUpload(null);
       };

       const handleAddNewType = () => {
              setNewType(inputTypeValue);
              onUpload(selectedImage);
              setInputTypeValue('');
              setSelectedImage(null);
       }


       return (
              <div className={css.addNewTypeWrapper}>
                     <h2 className={css.title}>Тип устройства</h2>
                     <p className={css.subtitle}>Наименование</p>
                     <Input
                            className={css.entryField}
                            value={inputTypeValue}
                            type='text'
                            onChange={handleInputTypeChange}
                     />
                     <p className={css.subtitle}>Изображение</p>
                     {selectedImage ? (
                            <div className={css.avatarBlock}>
                                   <AvatarEditor
                                          ref={editorRef}
                                          image={selectedImage}
                                          width={70}
                                          height={70}
                                          border={0}
                                          borderRadius={0}
                                   />
                                   <div onClick={handleDeletePhoto}>
                                          <CloseIcon className={css.closeIcon} />
                                   </div>
                            </div>
                     ) : (
                            <UploadBtn
                                   onUpload={handleFileUploaded}
                                   accept=".svg"
                                   inputId="photo-for-newType"
                                   text='Выберите файл'
                                   icon={<AddPhoto className={css.addPhoto} />}
                            />

                     )}
                     <Button
                            text='Создать'
                            disabled={isDisabledButton}
                            onClick={handleAddNewType}
                            className={!isDisabledButton ? css.addNewTypeBtn : css.addNewTypeBtnDisabled}
                     />
              </div>
       )
}