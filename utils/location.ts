// import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { storage } from '../app/(screens)/_layout';

export async function getCurrentLocation() {
  //   if (Platform.OS === 'android' && !Device.isDevice) {
  //     return 'Oops, this will not work on Snack in an Android Emulator. Try it on your device!';
  //   }

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return 'Permission to access location was denied';
  }

  try {
    let location = await Location.getCurrentPositionAsync({});
    //   console.log(location);
    await getCityFromCoords(
      location.coords.latitude,
      location.coords.longitude
    );
    // return JSON.stringify(location);
    return 'success';
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
    // console.log(reverseGeocode);
    if (reverseGeocode.length > 0) {
      const address = reverseGeocode[0];
      // console.log('City:', address.city);
      address.region && storage.set('selected-city', address.region);
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
