"use client";

import { useGetGeocode } from "@/app/club/dashboard/manage/_lib/queries";
import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

type Props = { roadAddress?: string; placeName?: string };

export default function NaverMap({ roadAddress, placeName }: Props) {
  const { data: geocodeData } = useGetGeocode(roadAddress);

  const mapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  const initMap = useCallback(() => {
    const currentLatitude = 37.3595704;
    const currentLongitude = 127.105399;

    const initialMapLatLng = new naver.maps.LatLng(
      currentLatitude,
      currentLongitude
    );

    mapRef.current = new naver.maps.Map("map", {
      center: initialMapLatLng,
      zoom: 18,
    });

    markerRef.current = new naver.maps.Marker({
      position: initialMapLatLng,
      map: mapRef.current,
      title: placeName,
    });
  }, [placeName]);

  // useEffect(() => {
  //   if (geocodeData) {
  //     const lat = geocodeData.addresses[0].y;
  //     const lng = geocodeData.addresses[0].x;
  //     const newLatLng = new naver.maps.LatLng(Number(lat), Number(lng));
  //     mapRef.current?.setCenter(newLatLng);
  //     mapRef.current?.setZoom(18);

  //     markerRef.current?.setMap(null);

  //     markerRef.current = new naver.maps.Marker({
  //       position: newLatLng,
  //       map: mapRef.current!,
  //       title: placeName,
  //     });
  //   } else {
  //     console.log("geocodeData 상세:", geocodeData); // 디버깅용
  //     console.error("Geocode data is not available or addresses are empty.");
  //   }
  // }, [geocodeData, placeName]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.naver &&
      window.naver.maps &&
      mapRef.current
    ) {
      if (
        geocodeData &&
        Array.isArray(geocodeData.addresses) &&
        geocodeData.addresses.length > 0
      ) {
        const { x, y } = geocodeData.addresses[0];
        const newLatLng = new window.naver.maps.LatLng(Number(y), Number(x));
        mapRef.current.setCenter(newLatLng);
        mapRef.current.setZoom(18);
  
        markerRef.current?.setMap(null);
        markerRef.current = new window.naver.maps.Marker({
          position: newLatLng,
          map: mapRef.current,
          title: placeName,
        });
      } else {
        // fallback
        const fallbackLat = 37.5665;
        const fallbackLng = 126.9780;
        const fallbackLatLng = new window.naver.maps.LatLng(fallbackLat, fallbackLng);
  
        mapRef.current.setCenter(fallbackLatLng);
        mapRef.current.setZoom(14);
        markerRef.current?.setMap(null);
        markerRef.current = new window.naver.maps.Marker({
          position: fallbackLatLng,
          map: mapRef.current,
          title: "기본 위치",
        });
      }
    }
  }, [geocodeData, placeName]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_X_NCP_APIGW_API_KEY_ID}`}
        onReady={initMap}
      />
      <div
        id="map"
        className="aspect-[1130/800] w-full rounded-[6px] bg-gray-300"
      />
    </>
  );
}
