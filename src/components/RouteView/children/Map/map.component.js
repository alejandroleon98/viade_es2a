import React from 'react';

import { MapLocation } from './map-location.component';

import {
  withScriptjs, withGoogleMap, GoogleMap, Polyline
} from 'react-google-maps'

const Map = withScriptjs(withGoogleMap(({ route, mapRef }) => {

  const points = route.waypoints;
  const trackpoints = route.points;
  let center = trackpoints && trackpoints[0] ? trackpoints[0] : { lat: 0, lng: 0 };

  return (
    <GoogleMap
      ref={mapRef}
      defaultZoom={7}
      defaultCenter={center}
      options={{ streetViewControl: false, zoomControl: false, mapTypeControl: false }}
      mapTypeId={'terrain'}
    >

      <Polyline
        options={{
          strokeColor: route.color.hexCode,
          strokeOpacity: .7,
          strokeWeight: 2
        }}
        path={trackpoints}
      />

      {
        points.map((point, index) => {
          return (
            <MapLocation key={index} {... { point, index }} />
          )
        })
      }

      {
        trackpoints.map((point, index) => {
          return (
            <MapLocation key={index} {... { point, index, color: route.color }} />
          )
        })
      }
    </GoogleMap>
  )
}));

export default Map;
