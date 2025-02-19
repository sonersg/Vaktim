import { storage } from '../app/(screens)/_layout';

// setFavs function
export function setFavs(city: string, lat: number, lon: number) {
  const arrStr = storage.getString('favs-array') || '[]';
  const parsedArray = JSON.parse(arrStr);

  const temp = {
    name: city,
    code: null,
    sponsor: '--',
    latitude: lat,
    longitude: lon,
  };

  if (parsedArray.length >= 5) {
    parsedArray.pop();
    parsedArray.unshift(temp);
  } else {
    parsedArray.unshift(temp);
  }

  storage.set('favs-array', JSON.stringify(parsedArray));
}

// getFavs function
export function getFavs() {
  const arrStr = storage.getString('favs-array') || '[]';
  const favsArray = JSON.parse(arrStr);
  return favsArray;
}
