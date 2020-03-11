import React, { Component } from 'react';
import { CenterContainer } from '@util-components';
import { useTranslation } from 'react-i18next';

import { } from './feed-map.style';
import { MapRoute } from './map-route.component';

import {
  withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline
} from 'react-google-maps'

const FeedMap = withScriptjs(withGoogleMap(props => {
  const { routes, onRouteClick } = props;

  const { t } = useTranslation();

  return (
    <GoogleMap
      defaultZoom={7}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      options={{ streetViewControl: false }}
      mapTypeId={'terrain'}
    >

      {routes.map(route => {
        return (
          <MapRoute {... { route: route, handleClick: onRouteClick }} />
        )
      })}
    </GoogleMap>
  )
}));

export default FeedMap;
