import React from "react";

import { RouteMapHolder, MapHolder, ExpandButton } from "./my-routes.style";

import { FloatingButton } from "@components/Utils";
import { SideRoutesMenu, ShareRoutePanel } from "./children";
import { RouteColor as colors } from "@constants";
import isLoading from "@hocs/isLoading";
import { useTranslation } from "react-i18next";
import { RouteView, RouteCreationPanel, Map } from "@components";
import {
  NotificationTypes,
  useNotification
} from "@inrupt/solid-react-components";
import { modal, notification as helperNotification } from "@utils";
import { routeService } from "@services";

export const RouteMapContext = React.createContext();

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

/**
 * Feed Page UI component, containing a Map which displays some routes and a side legend.
 * @param props
 */
export const MyRoutesComponent = isLoading(({ routes, webId, fetchRoutes }) => {
  const { createNotification } = useNotification(webId);
  const [selectedRoute, setSelectedRoute] = React.useState(null);
  const [collapsed, setCollapsed] = React.useState(false);
<<<<<<< HEAD

  const [editing, setEditing] = React.useState(false);

  const [RouteViewModal, openRouteView, closeRouteView] = modal('route-map');
  const [RouteCreationModal, openRouteCreation, closeRouteCreation] = modal('route-map');
  const [RouteSharingModal, openRouteSharing, closeRouteSharing] = modal('route-map');
=======
  const { t } = useTranslation();
  const [RouteViewModal, openRouteView, closeRouteView] = modal("route-map");
  const [RouteCreationModal, openRouteCreation, closeRouteCreation] = modal(
    "route-map"
  );
  const [RouteSharingModal, openRouteSharing, closeRouteSharing] = modal(
    "route-map"
  );
>>>>>>> f3098ddb9a9ae0cc6f8a6e65f848df0babbceab0

  const map = React.useRef();

  routes.sort((a, b) => b.date - a.date);

  routes.forEach(
    (route, index) => (route.color = colors[index % colors.length])
  );

  const onRouteView = () => {
    if (selectedRoute) openRouteView();
  };

  const onRouteSelect = route => {
    setEditing(false);
    const newRoute = selectedRoute === route.id ? null : route.id;
    setSelectedRoute(newRoute);
    if (newRoute && route.points[0]) map.current.panTo(route.points[0]);
  };

  const onDeleteClick = async routeId => {
    closeRouteView();
    await routeService.deleteRoute(webId, routeId);
    await fetchRoutes();
  };

  const onPublishClick = async routeId => {
    closeRouteView();
    openRouteSharing();
  };

  const onEditClick = async routeId => {
    setEditing(true);
    closeRouteView();
    openRouteCreation();
  };

  const onRouteCreation = async (route, edit) => {
    closeRouteView();
    await routeService.saveRoute(webId, route, edit);
    await fetchRoutes();
  };

  const onImport = async routes => {
    closeRouteView();

    routes.forEach(route => {
      let waypoints = route.waypoints.map(
        ({ lat, lng, elevation, name, desc }) => {
          return { latitude: lat, longitude: lng, elevation, name, desc };
        }
      );

      let points = route.points.map(({ lat, lng, elevation }) => {
        return { latitude: lat, longitude: lng, elevation };
      });

      route.date = Date.now();
      route.author = webId;
      route.points = points;
      route.waypoints = waypoints;
    });

    await routes.forEach(
      async route => await routeService.saveRoute(webId, route)
    );
    await fetchRoutes();
  };

  const getSelectedRoute = () => routes.filter(r => r.id === selectedRoute)[0];

  const onRouteShare = async (route, target) => {
    closeRouteSharing();
    await routeService.publishRoute(webId, route.id, target);
  };

  const onRouteDeshare = async route => {
    closeRouteSharing();
    await routeService.depublishRoute(webId, route.id);
  };

  const shareRoute = () => openRouteSharing();
  const sendShareNotification = async (webId, target) => {
    const appPath = await routeService.getViadeStorage(target);
    const viadeSettings = `${appPath}settings.ttl`;
    const licenseUrl = "https://creativecommons.org/licenses/by-sa/4.0/";

    const inboxes = await helperNotification.findUserInboxes([
      { path: target, name: "Global" },
      { path: viadeSettings, name: "Viade" }
    ]);
    const to = helperNotification.getDefaultInbox(inboxes, "Viade", "Global");
    await createNotification(
      {
        title: "Route shared",
        summary: "has shared you a route",
        actor: webId
      },
      to.path,
      NotificationTypes.INVITE,
      licenseUrl
    );
  };

  return (
    <RouteMapHolder data-testid="map-holder" id="route-map">
      <RouteMapContext.Provider
        value={{
          selectedRoute,
          myRoutes: true,
          onDeleteClick,
          onRouteView,
          onRouteSelect,
          onPublishClick,
          onEditClick,
          collapsed,
          setCollapsed,
          shareRoute,
          editing
        }}>

        {collapsed && (
          <ExpandButton onClick={() => setCollapsed(false)}>⇠</ExpandButton>
        )}

        <Map
          {...{ routes }}
          mapRef={map}
          data-testid="map"
          googleMapURL={googleMapURL}
          loadingElement={<MapHolder />}
          containerElement={<MapHolder />}
          mapElement={<MapHolder />}
        />
        <SideRoutesMenu
          data-testid="side-menu"
          {...{ routes, collapsed, setCollapsed }}
        />

        <RouteMapContext.Consumer>
          {props => (
            <RouteViewModal>
              <RouteView {...{ route: getSelectedRoute(), closeRouteView }} />
            </RouteViewModal>
          )}
        </RouteMapContext.Consumer>
      </RouteMapContext.Provider>

      <RouteCreationModal>
<<<<<<< HEAD
        <RouteCreationPanel {...{
          webId,
          onRouteCreation,
          onImport,
          closeRouteCreation,
          routeBase: editing ? getSelectedRoute() : undefined
        }} />
=======
        <RouteCreationPanel
          {...{ webId, onRouteCreation, onImport, closeRouteCreation }}
        />
>>>>>>> f3098ddb9a9ae0cc6f8a6e65f848df0babbceab0
      </RouteCreationModal>

      <RouteSharingModal>
        <ShareRoutePanel
          {...{
            route: getSelectedRoute(),
            webId,
            onRouteShare,
            onRouteDeshare,
            closeRouteSharing,
            sendShareNotification
          }}
        />
      </RouteSharingModal>
 
      <FloatingButton
        onClick={openRouteCreation}
<<<<<<< HEAD
        background={'#7c4dff'}
        hoverBackground={'#9841fc'}
        activeBackground={'#ad66ff'}
        foreground={'white'}
        text={'🞤'} />
=======
        background={"#8a25fc"}
        hoverBackground={"#9841fc"}
        activeBackground={"#ad66ff"}
        foreground={"white"}
        text={"🞤"}
      />
>>>>>>> f3098ddb9a9ae0cc6f8a6e65f848df0babbceab0
    </RouteMapHolder>
  );
});
