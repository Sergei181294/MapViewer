import { ExcelReader } from './ExcelReader';
import React, { useState, useEffect } from 'react';
import { Map, Filters, DeviceImageUploader, AddNewDevice, AddNewType } from '.';
import type { Device } from './types/types';
import css from './mapViewer.module.css';
import Cookies from 'js-cookie';

const LOCAL_STORAGE_KEY = 'mapViewerData';

export const MapViewer: React.FC = () => {

  const [data, setData] = useState<Device[]>([]);
  const [selectedNames, setSelectedNames] = useState<Device[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<Device[]>([]);
  const [showDevice, setShowDevice] = useState(false);
  const [showType, setShowType] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [newType, setNewType] = useState('');
  const [photoForNewType, setPhotoForNewType] = useState<string | null>(null);
  const [typeForChangingPhoto, setTypeForChangingPhoto] = useState('');
  const [uniqueNames, setUniqueNames] = useState<string[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  useEffect(() => {
    const uniqueNames = data?.map(item => item.NAME).filter((name, index, array) => array.indexOf(name) === index);
    setUniqueNames(uniqueNames);
    const uniqueTypes = data?.map(item => item.TYPE).filter((type, index, array) => array.indexOf(type) === index);
    setUniqueTypes(uniqueTypes);
  }, [data]);

  useEffect(() => {
    const updatedUniqueTypes = [...uniqueTypes, newType];
    setUniqueTypes(updatedUniqueTypes);
  }, [newType]);

  const handlePhotoUpload = (file: string | null) => {
    setPhoto(file);
  };

  const handleExcelDataChange = (formattedData: Device[]) => {
    setData(formattedData);
  };

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData.data || []);
      setSelectedNames(parsedData.selectedNames || []);
      setSelectedTypes(parsedData.selectedTypes || []);
      setShowDevice(parsedData.showDevice || false);
      setShowType(parsedData.showType || false);
      setUniqueNames(parsedData.uniqueNames || []);
      setUniqueTypes(parsedData.uniqueTypes || []);
    }
  }, []);

  useEffect(() => {
    const updatedData = {
      data,
      selectedNames,
      selectedTypes,
      showDevice,
      showType,
      uniqueNames,
      uniqueTypes
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
  }, [data, selectedNames, selectedTypes, showDevice, showType, uniqueNames, uniqueTypes]);

  return (
    <div className={css.appWrapper}>
      <div>
        <Map
          data={showDevice ? selectedNames : showType ? selectedTypes : data}
          photo={photo}
          typeForChangingPhoto={typeForChangingPhoto}
          newType={newType}
          photoForNewType={photoForNewType}

        />
        <ExcelReader onChange={handleExcelDataChange} />
      </div>
      <div className={css.filtersBlock}>
        <Filters
          data={data}
          setSelectedNames={setSelectedNames}
          setSelectedTypes={setSelectedTypes}
          setShowDevice={setShowDevice}
          setShowType={setShowType}
          selectedNames={selectedNames}
          selectedTypes={selectedTypes}
          uniqueNames={uniqueNames}
          uniqueTypes={uniqueTypes}
        />
        <DeviceImageUploader
          data={data}
          onUpload={handlePhotoUpload}
          setTypeForChangingPhoto={setTypeForChangingPhoto}
          uniqueTypes={uniqueTypes}
        />
        <AddNewDevice
          data={data}
          setData={setData}
          uniqueTypes={uniqueTypes}
        />
        <AddNewType
          onUpload={setPhotoForNewType}
          setNewType={setNewType}
        />
      </div>
    </div>
  );
};


