import {
  accelerometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { storage } from '../app/(screens)/_layout';

interface OrientationResult {
  isFlat: boolean;
  roll: number; // Angle of rotation around the X-axis (in degrees)
  pitch: number; // Angle of rotation around the Y-axis (in degrees)
}

export const isPhoneHorizontal = (
  onOrientationChange: (result: OrientationResult) => void // Callback function
): Subscription => {
  // Adjust the update interval for responsiveness
  setUpdateIntervalForType(SensorTypes.accelerometer, 222); // 100ms (adjust as needed)

  const threshold = 22; // Adjust this threshold (in degrees) based on your "flat" definition

  const subscription: Subscription = accelerometer
    .pipe(
      map(({ x, y, z }) => {
        // Calculate roll and pitch (in radians)
        const rollRad = Math.atan2(y, z); // Rotation around X-axis
        const pitchRad = Math.atan2(-x, Math.sqrt(y * y + z * z)); //Rotation around Y-axis

        // Convert to degrees
        const rollDeg = rollRad * (180 / Math.PI);
        const pitchDeg = pitchRad * (180 / Math.PI);

        const isFlat =
          Math.abs(rollDeg) < threshold && Math.abs(pitchDeg) < threshold;

        return { isFlat, roll: rollDeg, pitch: pitchDeg }; //Return an object
      })
    )
    .subscribe((orientation) => {
      onOrientationChange(orientation); // Call the callback with the orientation result
    });

  return subscription; // Return the subscription so you can unsubscribe later
};

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

export const calculateQiblaAngle = (): number => {
  const latitude = storage.getNumber('lat') || 33;
  const longitude = storage.getNumber('lon') || 33;

  // Coordinates of the Kaaba in Mecca
  const kaabaLat = 21.4225; // Latitude of Kaaba
  const kaabaLng = 39.8262; // Longitude of Kaaba

  // Convert degrees to radians
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const phi1 = toRadians(latitude); // Your latitude in radians
  const lambda1 = toRadians(longitude); // Your longitude in radians
  const phi2 = toRadians(kaabaLat); // Kaaba latitude in radians
  const lambda2 = toRadians(kaabaLng); // Kaaba longitude in radians

  // Calculate the difference in longitudes
  const deltaLambda = lambda2 - lambda1;

  // Calculate the Qibla angle using the formula
  const y = Math.sin(deltaLambda);
  const x =
    Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLambda);

  const qiblaAngle = Math.atan2(y, x);

  // Convert the angle from radians to degrees
  const qiblaAngleDegrees = (qiblaAngle * 180) / Math.PI;

  console.log(`Qibla Angle: ${(qiblaAngleDegrees + 360) % 360}°`);

  // Ensure the angle is positive (0 to 360 degrees)
  return Math.round((qiblaAngleDegrees + 360) % 360);
};

// Example usage
// let qiblaAngle = calculateQiblaAngle();

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

export function getDirection(angle: number): string {
  if (angle >= 337.5 && angle < 22.5) {
    return 'Kuzey';
  } else if (angle >= 22.5 && angle < 67.5) {
    return 'KuzeyDoğu';
  } else if (angle >= 67.5 && angle < 112.5) {
    return 'Doğu';
  } else if (angle >= 112.5 && angle < 157.5) {
    return 'GüneyDoğu';
  } else if (angle >= 157.5 && angle < 202.5) {
    return 'Güney';
  } else if (angle >= 202.5 && angle < 247.5) {
    return 'GüneyBatı';
  } else if (angle >= 247.5 && angle < 292.5) {
    return 'Batı';
  } else if (angle >= 292.5 && angle < 337.5) {
    return 'KuzeyBatı';
  } else {
    return 'Kuzey';
  }
}
