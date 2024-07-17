"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useGeocode } from "@/app/api/map/hook";
import { cn } from "@/lib/utils";

interface Props {
  query?: string;
  style?: string;
}

export default function Map({ query, style }: Props) {
  const { data: geocodeData } = useGeocode(query);
  const mapRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    if (geocodeData) {
      const address = geocodeData.addresses[0];
      const lat = parseFloat(address.y);
      const lng = parseFloat(address.x);
      const latLng = new naver.maps.LatLng(lat, lng);
      mapRef.current!.setCenter(latLng);
    }
  }, [geocodeData]);

  const initMap = () => {
    let lat = 37.3595704;
    let lng = 127.105399;

    if (geocodeData) {
      const address = geocodeData.addresses[0];
      lat = parseFloat(address.y);
      lng = parseFloat(address.x);
    }

    const mapOptions: naver.maps.MapOptions = {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 17,
    };

    mapRef.current = new naver.maps.Map("map", mapOptions);
  };

  return (
    <>
      <Script
        onReady={initMap}
        type="text/javascript"
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_X_NCP_APIGW_API_KEY_ID}`}
      />
      <div id={"map"} className={cn("w-full h-full", style)} />
    </>
  );
}
