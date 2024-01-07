import React, { useState, useRef, SetStateAction } from 'react';
import { Select, UploadBtn, Button } from '../common';
import type { Device } from '../types/types';
import AvatarEditor from 'react-avatar-editor';
import css from './deviceImage.module.css';
import { ReactComponent as CloseIcon } from '../../assets/closeIcon.svg';
import { ReactComponent as AddPhoto } from '../../assets/addPhoto.svg';

interface DeviceImageUploaderProps {
       data: Device[] | null;
       onUpload: (imageData: string | null) => void;
       setTypeForChangingPhoto: React.Dispatch<SetStateAction<string>>;
       uniqueTypes: string[];
}

export const DeviceImageUploader: React.FC<DeviceImageUploaderProps> = ({ onUpload, setTypeForChangingPhoto, uniqueTypes }) => {
       const [selectedImage, setSelectedImage] = useState<string | null>(null);
       const [selectedType, setSelectedType] = useState('None selected');

       const editorRef = useRef<AvatarEditor | null>(null);

       const disabledBtn = !selectedType || !selectedImage || selectedType === 'None selected';

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
              setTypeForChangingPhoto('None selected');
       };

       const handleChangeType = (value: string) => {
              setSelectedType(value);
       }

       const onButtonSubmit = () => {
              onUpload(selectedImage);
              setTypeForChangingPhoto(selectedType);
              setSelectedImage(null);
              setSelectedType('None selected');
       }

       return (
              <div className={css.changeMarkerWrapper}>
                     <h2 className={css.title}>Изменить фото устройства</h2>
                     <p className={css.subtitle}>Тип устройства</p>
                     <Select
                            className={css.dropdawn}
                            options={uniqueTypes}
                            onChange={handleChangeType}
                            selectedValue={selectedType}
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
                                   inputId="photo-upload-button"
                                   text='Выберите файл'
                                   icon={<AddPhoto className={css.addPhotoIcon} />}
                            />
                     )}
                     <Button
                            className={!disabledBtn ? css.changeIconBtn : css.changeIconBtnDisabled}
                            disabled={disabledBtn}
                            onClick={onButtonSubmit}
                            text='Создать'
                     />

              </div>
       )
}