export interface Region {
  region: string;
  country: string;
}

export interface Country {
  name: string;
  code: string;
  regions: Region[];
}
