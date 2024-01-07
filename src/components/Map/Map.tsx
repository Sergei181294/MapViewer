import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Device } from '../../components/types/types';
import css from './map.module.css';
import markerForDis from '../../assets/markerForDis.svg';

interface MapProps {
       data: Device[] | null;
       photo: string | null;
       typeForChangingPhoto: string;
       photoForNewType: string | null;
       newType: string;
}

export const Map: React.FC<MapProps> = ({ data, photo, typeForChangingPhoto, newType, photoForNewType }) => {

       const convertSvgToBase64 = (svgCode: string) => {
              const svgBase64 = btoa(decodeURIComponent(encodeURIComponent(svgCode)));
              return `data:image/svg+xml;base64,${svgBase64}`;
       };

       const SVGIconForDis = L.Icon.extend({
              options: {
                     iconUrl: markerForDis,
                     iconSize: [36, 36],
                     iconAnchor: [18, 30],
                     popupAnchor: [0, -32]
              }
       })
       const customIconForDis = new SVGIconForDis();
       const [deviceIcons, setDeviceIcons] = useState<{ [key: string]: L.Icon }>({
              'Дорожно измерительные станции': customIconForDis,
              'Видеокамера': customIconForDis,
              'Табло переменной информации': customIconForDis,
              'Датчики мостовых сооружений': customIconForDis,
              'Светофоры': customIconForDis
       });

       const decodePhoto = (file: string | null) => {
              if (file) {
                     const [, encodedData] = file.split(",");
                     return atob(encodedData);
              }
              return null;
       };

       useEffect(() => {
              const newDeviceIcons: { [key: string]: L.Icon } = { ...deviceIcons };
              data?.forEach((device) => {
                     if (device.TYPE === typeForChangingPhoto) {
                            const Updatedphoto = decodePhoto(photo);
                            if (Updatedphoto) {
                                   const customIcon = L.icon(customIconForDis.options);
                                   customIcon.options.iconUrl = convertSvgToBase64(Updatedphoto);
                                   newDeviceIcons[device.TYPE] = customIcon;
                            }
                     }
              });


              setDeviceIcons(newDeviceIcons);
       }, [photo, typeForChangingPhoto]);

       useEffect(() => {
              const newDeviceIcons: { [key: string]: L.Icon } = { ...deviceIcons };
                     if (newType && photoForNewType) {
                            const customIcon = new SVGIconForDis();
                            const decodedPhoto = decodePhoto(photoForNewType)
                            if (decodedPhoto) {
                                   customIcon.options.iconUrl = convertSvgToBase64(decodedPhoto);
                                   newDeviceIcons[newType] = customIcon;
                            }
                     }
                     setDeviceIcons(newDeviceIcons);
       }, [newType, photoForNewType])

       const formattedGeoHandler = (geo: string): LatLngExpression => {
              try {
                     const cleanedGeo = geo.replace(/\s/g, '');
                     const [lng, lat] = JSON.parse(cleanedGeo);
                     return L.latLng(lat, lng);
              } catch (error) {
                     console.error('Ошибка при парсинге JSON:', error);
              }
              return L.latLng(0, 0);
       };

       return (
              <div className={css.mapWrapper}>
                     <MapContainer
                            center={[53.922475, 27.576105]}
                            zoom={7}
                            style={{ height: '600px', width: '900px' }}
                            attributionControl={false}
                     >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {data && data.map((device) => (
                                   <div key={device.ID} >
                                          <Marker
                                                 position={formattedGeoHandler(device.GEO)}
                                                 icon={deviceIcons[device.TYPE]}
                                          >
                                                 <Popup>
                                                        <p>name: {device.NAME}</p>
                                                        <p>id: {device.ID}</p>
                                                 </Popup>
                                          </Marker>
                                   </div>
                            ))}
                     </MapContainer>
              </div>
       );
};

