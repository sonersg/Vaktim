import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { storage } from '../app/(screens)/_layout';

interface ICompassData {
  x: number;
  y: number;
  z: number;
}

interface ICompassProps {
  qibla?: boolean;
}
const Compass = ({ qibla }: ICompassProps) => {
  const [magnetometer, setMagnetometer] = useState<ICompassData | null>(null);
  const [subscription, setSubscription] = useState<any>(null); // Updated type for subscription

  const rotation = useSharedValue(99);

  useEffect(() => {
    qiblaAngle = calculateQiblaAngle();
    _subscribe();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data: ICompassData) => {
        setMagnetometer(data);
      })
    );
    Magnetometer.setUpdateInterval(22); //  Adjust update interval as needed (milliseconds)
  };
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const angle = magnetometer ? getCompassDirection(magnetometer) : 9;

  useEffect(() => {
    // -90 is for the emoji, looking to the right instead of up
    const newAngle = qiblaAngle - angle - 90;
    // console.log('dsakdjslkadlas', newAngle);
    const angleDifference = Math.abs(newAngle - rotation.value);

    // Check if the difference is greater than 5 degrees
    if (angleDifference > 5) {
      rotation.value = withSpring(newAngle);
    }
  }, [rotation, magnetometer]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <>
      <Animated.Text
        style={[
          styles.compassText,
          !qibla && { fontSize: 44, lineHeight: 55 },
          animatedStyle,
        ]}
      >
        {qibla ? '➢' : '➤'}
      </Animated.Text>

      {qibla && (
        <>
          <Text style={styles.directionText}>
            Kıble Açısı: {qiblaAngle.toFixed(1)}°
          </Text>
          <Text style={styles.directionText}>
            {magnetometer ? angle.toFixed(3) : 'Calibrating...'}
          </Text>
          <Text style={styles.directionText}>
            {magnetometer ? getDirection(angle) : 'Calibrating...'}
          </Text>
        </>
      )}
    </>
  );
};

function getDirection(angle: number): string {
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

// Helper function to calculate compass direction from magnetometer data
function getCompassDirection({ x, y, z }: ICompassData): number {
  let angle = Math.atan2(y, x);

  // console.log(x, y);

  if (angle < 0) {
    angle += 2 * Math.PI;
  }

  let degrees = angle * (180 / Math.PI); // Convert to degrees

  // Adjust for correct compass orientation (North = 0 degrees)
  degrees = (degrees + 360 - 90) % 360; //rotate clockwise 90 degrees. if North is 0 degree point, the angle will be negative. the negative angle plus 360 is to get the corrent degree of 0-360

  return degrees;
}

const styles = StyleSheet.create({
  compassText: {
    fontSize: 111,
    lineHeight: 133,
    color: 'white',
    // backgroundColor: 'red',
  },

  directionText: {
    // backgroundColor: 'red',
    marginTop: 22,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Compass;

const calculateQiblaAngle = (): number => {
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
  return (qiblaAngleDegrees + 360) % 360;
};

// Example usage
let qiblaAngle = calculateQiblaAngle();

class LowPassFilter {
  private alpha: number; // Smoothing factor (0 < alpha < 1)
  private filteredValue: number | null; // Initialize filtered value

  constructor(alpha: number) {
    this.alpha = alpha;
    this.filteredValue = null; // Initialize as null
  }

  // Update the filter with a new reading
  update(newValue: number): number {
    if (this.filteredValue === null) {
      // Initialize filtered value on first update
      this.filteredValue = newValue;
    } else {
      // Apply the low-pass filter formula
      this.filteredValue =
        this.alpha * newValue + (1 - this.alpha) * this.filteredValue;
    }
    return this.filteredValue;
  }

  // Reset the filter (optional)
  reset(): void {
    this.filteredValue = null;
  }
}

// // Example usage
// const alpha = 0.2; // Smoothing factor (adjust based on noise level)
// const filter = new LowPassFilter(alpha);

// // Simulated magnetometer data (noisy readings)
// const noisyData = [45.1, 44.8, 46.5, 45.9, 47.2, 44.3, 45.7, 46.1, 45.4, 46.8];

// // Apply the filter to each reading
// const smoothedData = noisyData.map((reading) => filter.update(reading));

// console.log('Noisy Data:', noisyData);
// console.log('Smoothed Data:', smoothedData);
