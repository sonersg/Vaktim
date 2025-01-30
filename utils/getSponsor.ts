import { MMKVstorage } from "../../src/screens/CitiesListScreen";

function getSponsor(): string {
  const jsonString = MMKVstorage.getString("sponsor-of-the-city");
  if (jsonString) {
    return jsonString;
  }
  return "";
}

export default getSponsor;
