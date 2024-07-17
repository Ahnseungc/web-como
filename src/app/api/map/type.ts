export interface GeocodeResult {
  addresses: GeocodeAddress[];
  errorMessage: string;
  meta: { totalCount: number; page: number; count: number };
  status: string;
}

export interface GeocodeAddress {
  addressElements: Object[];
  distance: number;
  englishAddress: string;
  jibunAddress: string;
  roadAddress: string;
  x: string;
  y: string;
}
