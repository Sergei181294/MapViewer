import React, { SetStateAction, useState } from 'react';
import { Input, Select, Button } from '../common';
import css from './addNewDevice.module.css';
import type { Device } from '../types/types';

interface AddNewDeviceProps {
       data: Device[] | null;
       setData: React.Dispatch<SetStateAction<any>>;
       uniqueTypes: string[];
}

export const AddNewDevice: React.FC<AddNewDeviceProps> = ({ data, setData, uniqueTypes }) => {
       const [inputIdValue, setInputIdValue] = useState<number | null>(null);
       const [inputNameValue, setInputNameValue] = useState('');
       const [inputLatitudeValue, setInputLatitudeValue] = useState('');
       const [inputLongitudeValue, setInputLongitudeValue] = useState('');
       const [selectedType, setSelectedType] = useState('None selected');

       const isDisabledButton = !inputIdValue || !inputNameValue || !inputLatitudeValue || !inputLongitudeValue || selectedType === 'None selected';


       const handleInputIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const result = e.target.value.replace(/\D/g, '');

              setInputIdValue(+result);
       }

       const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const deviceName = e.target.value;
              const onlyRussianCharacters = deviceName.replace(/[^а-яА-Я\s]/g, '');
              setInputNameValue(onlyRussianCharacters);
       }

       const handleInputLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const latitude = e.target.value;
              setInputLatitudeValue(latitude);
       }

       const handleInputLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const longitude = e.target.value;
              setInputLongitudeValue(longitude);
       }

       const handleChangeType = (value: string) => {
              setSelectedType(value);
       }

       const insertDeviceHandler = (e: React.FormEvent) => {
              e.preventDefault();
              const newDevice = { ID: inputIdValue, NAME: inputNameValue, TYPE: selectedType, GEO: `[${inputLongitudeValue}, ${inputLatitudeValue}]` }
              if (data) {
                     const newData = [...data, newDevice];
                     setData(newData);
                     setInputIdValue(0);
                     setInputNameValue('');
                     setInputLatitudeValue('');
                     setInputLongitudeValue('');
                     setSelectedType('None selected');
              }
       }

       return (
              <div className={css.addNewDeviceWrapper}>
                     <h2 className={css.title}>Устройство</h2>
                     <p className={css.subtitle}>Идентификатор</p>
                     <Input
                            className={css.entryField}
                            value={inputIdValue ? inputIdValue : ''}
                            onChange={handleInputIdChange}
                     />
                     <p className={css.subtitle}>Наименование системы</p>
                     <Input
                            className={css.entryField}
                            value={inputNameValue}
                            type='text'
                            onChange={handleInputNameChange}
                     />
                     <p className={css.subtitle}>Тип устройства</p>
                     <Select
                            className={css.dropdawn}
                            options={uniqueTypes.length ? uniqueTypes : ['None selected']}
                            onChange={handleChangeType}
                            selectedValue={selectedType}
                     />
                     <div className={css.coordinatesBlock}>
                            <div>
                                   <p className={css.subtitle}>Широта</p>
                                   <Input
                                          value={inputLatitudeValue}
                                          type='text'
                                          onChange={handleInputLatitudeChange}
                                          className={css.inputForGeo}
                                   />
                            </div>
                            <div>
                                   <p className={css.subtitle}>Долгота</p>
                                   <Input
                                          value={inputLongitudeValue}
                                          type='text'
                                          onChange={handleInputLongitudeChange}
                                          className={css.inputForGeo}
                                   />
                            </div>
                     </div>
                     <Button
                            className={!isDisabledButton ? css.btnForNewDevice : css.btnForNewDeviceDisabled}
                            text='Создать'
                            disabled={isDisabledButton}
                            onClick={insertDeviceHandler}
                     />
              </div>

       )

}