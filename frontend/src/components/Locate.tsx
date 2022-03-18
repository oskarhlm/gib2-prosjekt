import { useEffect, useState } from 'react';
import { Polygon, GeoJSON, useMap, Marker } from 'react-leaflet';
import L, { icon, latLng, Popup } from 'leaflet';
import { defaultIcon } from 'assets/icons';

interface ILocate {
    setLoc: React.Dispatch<React.SetStateAction<[number, number] | null>>
}

export function Locate(props: ILocate){
    const map = useMap();
    var locationMarker = {}

    useEffect(() => {
        const loc = map.locate({setView : true});
        map.on('locationfound', function (locationEvent){
            var lat = locationEvent.latlng.lat
            var lng = locationEvent.latlng.lng
            props.setLoc([lat, lng])
            locationMarker = L.marker([lat,lng],{icon : defaultIcon}).addTo(map);
        })
    }, []);

  return (
    null
  )
}


  