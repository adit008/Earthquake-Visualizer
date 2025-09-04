import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

function MapFocus({ selectedEarthquake }) {
  const map = useMap();

  useEffect(() => {
    if (selectedEarthquake) {
      const [lon, lat] = selectedEarthquake.geometry.coordinates;
      map.flyTo([lat, lon], 6, { duration: 2 }); // zoom 6, smooth animation
    }
  }, [selectedEarthquake, map]);

  return null;
}

export default MapFocus;