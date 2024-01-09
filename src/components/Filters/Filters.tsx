import React, { useState, useEffect } from 'react';
import { Select } from '../../components/common';
import type { Device } from '../../components/types/types';
import css from './filters.module.css';


interface FiltersProps {
       data: Device[] | null;
       setSelectedNames: React.Dispatch<React.SetStateAction<Device[]>>;
       setShowDevice: React.Dispatch<React.SetStateAction<boolean>>;
       setShowType: React.Dispatch<React.SetStateAction<boolean>>;
       setSelectedTypes: React.Dispatch<React.SetStateAction<Device[]>>;
       selectedTypes: Device[];
       selectedNames: Device[];
       uniqueNames: string[];
       uniqueTypes: string[];
}

export const Filters: React.FC<FiltersProps> = ({ data, setSelectedNames, setShowDevice, setShowType, setSelectedTypes, uniqueNames, uniqueTypes }) => {

       const [selectedNameValue, setSelectedNameValue] = useState('None selected');
       const [selectedTypeValue, setSelectedTypeValue] = useState('None selected');


       useEffect(() => {
              const storedSelectedNameValue = localStorage.getItem('selectedNameValue');
              if (storedSelectedNameValue) {
                     setSelectedNameValue(storedSelectedNameValue);
              }
              const storedSelectedTypeValue = localStorage.getItem('selectedTypeValue');
              if (storedSelectedTypeValue) {
                     setSelectedTypeValue(storedSelectedTypeValue);
              }
       }, []);

       useEffect(() => {
              localStorage.setItem('selectedNameValue', selectedNameValue);
              localStorage.setItem('selectedTypeValue', selectedTypeValue);
       }, [selectedNameValue, selectedTypeValue]);


       const handleChangeName = (value: string) => {
              const selectedNameArr = data?.filter(device => device.NAME === value);
              setSelectedNameValue(value);
              setSelectedTypeValue('None selected');
              if (selectedNameArr) {
                     setSelectedNames(selectedNameArr);
                     setSelectedTypes([]);
                     setShowType(false);
                     setShowDevice(true);
              }
              if (value === 'None selected') {
                     setShowDevice(false);
              }
       };

       const handleChangeType = (value: string) => {
              const selectedTypeArr = data?.filter(device => device.TYPE === value);
              setSelectedNameValue('None selected');
              setSelectedTypeValue(value);
              if (selectedTypeArr) {
                     setSelectedTypes(selectedTypeArr);
                     setSelectedNames([]);
                     setShowType(true);
                     setShowDevice(false);
              }
              if (value === 'None selected') {
                     setShowType(false);
              }
       }

       return (
              <div className={css.filtersWrapper}>
                     <p className={css.title}>Наименование системы</p>
                     <Select
                            className={css.dropdawn}
                            options={uniqueNames}
                            onChange={handleChangeName}
                            selectedValue={selectedNameValue}
                     />
                     <p className={css.title}>Типы устройств</p>
                     <Select
                            className={css.dropdawn}
                            options={uniqueTypes}
                            onChange={handleChangeType}
                            selectedValue={selectedTypeValue}
                     />
              </div>
       );
};