import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Device } from '../../components/types/types';
import css from './map.module.css';
import marker from '../../assets/markerTest.png';


interface MapProps {
       data: Device[] | null;
       photo: string | null;
       typeForChangingPhoto: string;
       photoForNewType: string | null;
       newType: string;
}

export const Map: React.FC<MapProps> = ({ data, photo, typeForChangingPhoto, newType, photoForNewType }) => {

       const customIconForDis = L.icon({
              iconUrl: marker,
              iconSize: [36, 36],
              iconAnchor: [18, 30],
              popupAnchor: [0, -32]
       });

       const [deviceIcons, setDeviceIcons] = useState<{ [key: string]: L.Icon }>({
              'Дорожно измерительные станции': customIconForDis,
              'Видеокамера': customIconForDis,
              'Табло переменной информации': customIconForDis,
              'Датчики мостовых сооружений': customIconForDis,
              'Светофоры': customIconForDis
       });   

       useEffect(() => {
              const newDeviceIcons: { [key: string]: L.Icon } = { ...deviceIcons };
              data?.forEach((device) => {
                     if (device.TYPE === typeForChangingPhoto) {
                            const updatedPhoto = photo;
                            if (updatedPhoto) {
                                   const customIcon = L.icon(customIconForDis.options);
                                   customIcon.options.iconUrl = updatedPhoto;
                                   newDeviceIcons[device.TYPE] = customIcon;
                            }
                     }
              });
              setDeviceIcons(newDeviceIcons);
       }, [photo, typeForChangingPhoto]);

       useEffect(() => {
              const newDeviceIcons: { [key: string]: L.Icon } = { ...deviceIcons };
              if (newType && photoForNewType) {
                     const customIcon = L.icon(customIconForDis.options);
                     customIcon.options.iconUrl = photoForNewType;
                     newDeviceIcons[newType] = customIcon;
              }
              setDeviceIcons(newDeviceIcons);
       }, [newType, photoForNewType]);

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
                            {data &&
                                   data.map((device) => (
                                          <Marker
                                                 key={device.ID}
                                                 position={formattedGeoHandler(device.GEO)}
                                                 icon={deviceIcons[device.TYPE]}
                                          >
                                                 <Popup>
                                                        <p>name: {device.NAME}</p>
                                                        <p>id: {device.ID}</p>
                                                 </Popup>
                                          </Marker>
                                   ))}
                     </MapContainer>
              </div>
       );
};

