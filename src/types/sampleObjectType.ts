type sampleObjectType = {
  place: {
    country: string;
    countryCode: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
  };
  times: {
    '2023-10-29': string[];
  };
};

export interface IPrayerTimesObject {
  place: {
    country: string;
    countryCode: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
  };
  times: {
    [date: string]: string[]; // This represents a dictionary of date strings with string arrays as values
  };
}
