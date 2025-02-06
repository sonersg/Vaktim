import { storage } from '../app/(screens)/_layout';

function getSponsor(): string {
  const jsonString = storage.getString('sponsor-of-the-city');
  if (jsonString) {
    return jsonString;
  }
  return '';
}

export default getSponsor;
