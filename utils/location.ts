// import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { storage } from '../app/(screens)/_layout';
import { setFavs } from './favsArray';
import useToast from './useToast';

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

  // console.log('location called');

  try {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    return await getCityFromCoords(latitude, longitude);
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
      const storedCity = storage.getString('selected-city');
      const address = reverseGeocode[0];
      // console.log(address);
      if (address.city) {
        if (address.city === storedCity) {
          return 'Location is same';
        } else {
          setFavs(address.city, latitude, longitude);
          storage.set('lat', latitude);
          storage.set('lon', longitude);
          useToast('Location changed');
          return 'Location changed';
        }
      } else if (address.subregion) {
        if (address.subregion === storedCity) {
          return 'Location is same';
        } else {
          setFavs(address.subregion, latitude, longitude);
          storage.set('lat', latitude);
          storage.set('lon', longitude);
          useToast('Location changed');
          return 'Location changed';
        }
      } else if (address.region) {
        if (address.region === storedCity) {
          return 'Location is same';
        } else {
          setFavs(address.region, latitude, longitude);
          storage.set('lat', latitude);
          storage.set('lon', longitude);
          useToast('Location changed');
          return 'Location changed';
        }
      }

      return 'No address found';
    } else {
      // console.log('No address found');
      return 'No address found';
    }
  } catch (error) {
    // console.error('Error in reverse geocoding:', error);
    return 'null';
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
