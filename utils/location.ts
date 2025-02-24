// import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { storage } from '../app/(screens)/_layout';
import { resetAlarms } from './expoAlarm';
import { setFavs } from './favsArray';

const LOCATION_CHANGE_THRESHOLD = 0.01; // Threshold in degrees (approx 1 km)

export async function getLocationPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    storage.set('auto-location', 'off');
    return 'Permission to access location was denied';
  }
  // await getCurrentLocation();
  return 'success';
}

export async function getCurrentLocation() {
  //   if (Platform.OS === 'android' && !Device.isDevice) {
  //     return 'Oops, this will not work on Snack in an Android Emulator. Try it on your device!';
  //   }

  console.log('location called');

  try {
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Get the previously stored location
    const storedLat = storage.getNumber('lat');
    const storedLon = storage.getNumber('lon');

    if (storedLat && storedLon) {
      // Calculate the difference between the new and stored location
      const latDiff = Math.abs(latitude - storedLat);
      const lonDiff = Math.abs(longitude - storedLon);

      // Only update storage if the change is significant
      if (
        latDiff > LOCATION_CHANGE_THRESHOLD ||
        lonDiff > LOCATION_CHANGE_THRESHOLD
      ) {
        storage.set('lat', latitude);
        storage.set('lon', longitude);
        resetAlarms();
        await getCityFromCoords(latitude, longitude);

        return 'location-changed';
      }
    } else {
      // If no stored location exists, save the new location
      storage.set('lat', latitude);
      storage.set('lon', longitude);
      resetAlarms();
      await getCityFromCoords(latitude, longitude);

      return 'location-changed';
    }

    return 'success-Location is same';
  } catch (error) {
    return "Couldn't get location!";
  }
}

const getCityFromCoords = async (latitude: number, longitude: number) => {
  try {
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode.length > 0) {
      const address = reverseGeocode[0];
      // console.log(address);
      if (address.city) {
        setFavs(address.city, latitude, longitude);
      } else if (address.subregion) {
        setFavs(address.subregion, latitude, longitude);
      } else if (address.region) {
        setFavs(address.region, latitude, longitude);
      }

      return address.region;
    } else {
      // console.log('No address found');
      return null;
    }
  } catch (error) {
    // console.error('Error in reverse geocoding:', error);
    return null;
  }
};

// Example usage
// const latitude = 37.7749;
// const longitude = -122.4194;
// getCityFromCoords(latitude, longitude);

// {
//   "coords": {
//     "accuracy": 600,
//     "altitude": 0,
//     "altitudeAccuracy": 0,
//     "heading": 0,
//     "latitude": 37.4220936,
//     "longitude": -122.083922,
//     "speed": 0
//   },
//   "mocked": false,
//   "timestamp": 1738528158688
// }

// [
//   {
//     "city": "Akçakale",
//     "country": "Türkiye",
//     "district": "Parti",
//     "formattedAddress": "Parti, 29100 Akçakale/Gümüşhane Merkez/Gümüşhane, Türkiye",
//     "isoCountryCode": "TR",
//     "name": "29100",
//     "postalCode": "29100",
//     "region": "Gümüşhane",
//     "street": null,
//     "streetNumber": null,
//     "subregion": "Gümüşhane Merkez",
//     "timezone": null
//   }
// ]
