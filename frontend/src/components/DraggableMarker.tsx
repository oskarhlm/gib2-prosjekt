
import {Marker, Popup} from 'react-leaflet'
import React, {useRef,useMemo,useCallback, useState } from 'react';
import L, { LatLngExpression, LatLngTuple,} from 'leaflet';


import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { SettingsDrawer } from './SettingsDrawer';

import {AddLocationDrawer} from './AddLocationDrawer';

import {SVGOverlay} from 'react-leaflet'
import { AddLocationButton } from './AddLocationButton';
import { PopUpThing } from './PopUpThing';
//import { PopupExample } from './PopUpThing';
import{EditOutlined} from '@ant-design/icons';

import { marker } from 'leaflet';

const polyline: LatLngExpression[] = [
    [63.4346, 10.3985],
    [63.42, 10.4085],
    [63.45, 10.4200],
    [63.45, 10.4202],
  ]

const center2 = {
    lat: 51.505,
    lng: -0.09,
  }

const center: LatLngExpression = [63.45, 10.4200]

export function DraggableMarker() {
    
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef<any>(center2)
    const eventHandlers = useMemo(
        () => ({
        dragend() {
            const Marker = markerRef.current
            if (Marker != null) {
                setPosition(Marker.getLatLng())
            }
        },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    const OpenMenu = () => {
        <SettingsDrawer />;
      };

    return (
        <Marker
        //onClick={OpenMenu}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        icon='https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
            {draggable
                ? 'Marker is draggable'
                : 'Click here to make marker draggable'}
            </span>
        </Popup>
        </Marker>
    )
}

