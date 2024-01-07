import React, { ChangeEvent, useState } from 'react';
import * as XLSX from 'xlsx';
import { InputFile } from '../common';
import type { Device } from '../../components/types/types';
import Cookies from 'js-cookie';

interface ExcelReaderProps {
       onChange: (formattedData: Device[]) => void;
}

export const ExcelReader: React.FC<ExcelReaderProps> = ({ onChange }) => {

       const [selectedFileName, setSelectedFileName] = useState('');


       const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

              const file = e.target.files?.[0];
              if (file) {
                     const reader = new FileReader();
                     reader.onload = (e) => {
                            const data = new Uint8Array(e.target?.result as ArrayBuffer);
                            const workbook = XLSX.read(data, { type: 'array' });
                            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                            const headers: string[] = jsonData[0] as string[];
                            const formattedData = jsonData.slice(1).map((row: any) => {
                                   const obj: any = {};
                                   headers.forEach((header: string, index: number) => {
                                          obj[header] = row[index];
                                   });
                                   return obj;
                            });
                            try {  
                                   const myData = JSON.stringify(formattedData);
                                   Cookies.set('mapData', myData, { path: '/', domain: 'localhost' });
                                 } catch (error) {
                                   console.error('Ошибка при преобразовании массива в JSON-строку:', error);
                                 }
                            onChange(formattedData);
                            const truncatedFileName = file.name.length > 15 ? file.name.substring(0, 12) + '...' : file.name;
                            setSelectedFileName(truncatedFileName);
                     };

                     reader.readAsArrayBuffer(file);
              }
       };

       return (
              <div>
                     <InputFile
                            text={selectedFileName ? selectedFileName : 'Import .xsls'}
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileChange} />
              </div>
       );
};

