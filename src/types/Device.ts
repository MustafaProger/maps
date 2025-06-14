export interface IDevice {
  id: string;
  name: string;
  lat: number;
  lon: number;
  model: "basic" | "advanced" | "special";
  status: "on" | "off";
  children?: IDevice[];
}

export interface IMarkerPosition {
  lat: number;
  lng: number;
}