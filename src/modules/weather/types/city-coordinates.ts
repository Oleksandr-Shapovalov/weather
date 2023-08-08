export type CityCoordinates = {
  name: string;
  local_names?: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export type LocalNames = Record<string, string>;
