"use client";
import { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import Image from "next/image";
import Loading from "./Loading";

type PropertyMapProps = {
  location: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
};
export default function PropertyMap(props: PropertyMapProps) {
  const { location } = props;
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [viewport, setViewport] = useState({
    lat: 0,
    lng: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${location.street} ${location.city} ${location.state} ${location.zipcode}`
        );

        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }

        const { lat, lng } = res?.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport({
          ...viewport,
          lat,
          lng,
        });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
    return () => {};
  }, []);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
    outputFormat: OutputFormat.JSON,
  });

  if (loading) return <Loading heigth={500} />;

  if(geocodeError)  return <div className="text-lg">No location data found</div>

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 15,
      }}
      style={{ width: "100%", height: 500 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <Image src={"/images/pin.svg"} alt="" width={32} height={32} />
      </Marker>
    </Map>
  );
}
