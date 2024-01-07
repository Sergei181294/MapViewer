import { ExcelReader } from './ExcelReader';
import React, { useState, useEffect } from 'react';
import { Map, Filters, DeviceImageUploader, AddNewDevice, AddNewType } from '.';
import type { Device } from './types/types';
import css from './app.module.css';
import Cookies from 'js-cookie';


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

  if ([]) {
    console.log('hello')
  }



  const handlePhotoUpload = (file: string | null) => {
    setPhoto(file);
  };

  const handleExcelDataChange = (formattedData: Device[]) => {
    // Cookies.set('mapData', JSON.stringify(formattedData), { path: '/' });
    setData(formattedData);
  };


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

// useEffect(() => {
//   Cookies.set('mapData', JSON.stringify(data), { path: '/' });
// }, [data]);

// useEffect(() => {
//   const savedData = Cookies.get('mapData');
//   console.log(savedData);
//   if (savedData) {
//     setData(JSON.parse(savedData));
//   }
// }, []);
