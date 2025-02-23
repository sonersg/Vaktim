import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  magnetometer,
  SensorTypes,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import { map } from 'rxjs/operators';
import { Subscription, Observer } from 'rxjs';
import {
  calculateQiblaAngle,
  getDirection,
  isPhoneHorizontal,
} from '../utils/qiblaUtils.';

interface ICompassProps {
  qibla?: boolean;
}
const Compass = ({ qibla }: ICompassProps) => {
  const [heading, setHeading] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isFlat, setIsFlat] = useState<boolean>(false);

  useEffect(() => {
    qiblaAngle = calculateQiblaAngle();

    let accelerometerSubscription: Subscription | null = null;

    setUpdateIntervalForType(SensorTypes.magnetometer, 111);

    const observer: Observer<number> = {
      // Define the observer
      next: (newHeading: number) => {
        setHeading(newHeading);
        setError(null);
      },
      error: (err: any) => {
        console.error('Magnetometer error:', err);
        setError(
          'Magnetometer not available on this device or permission denied.'
        );
      },
      complete: () => {
        console.log('Magnetometer stream completed.'); // Optional: Handle stream completion
      },
    };

    const subscription: Subscription = magnetometer
      .pipe(
        map((data) => {
          try {
            let { x, y, z } = data;
            const angleInDegrees = Math.atan2(y, x) * (180 / Math.PI);
            let normalizedAngleInDegrees = (angleInDegrees + 360 - 90) % 360;
            // -90 deg is my assumption to accurate angleInDegrees
            return Math.round(normalizedAngleInDegrees);
          } catch (e: any) {
            console.error('Error calculating heading:', e);
            setError(
              'Error calculating heading. Ensure device is not near strong magnetic fields.'
            );
            return 0;
          }
        })
      )
      .subscribe(observer); // Pass the observer object

    // Setup the accelerometer to detect flatness
    const setupAccelerometer = () => {
      accelerometerSubscription = isPhoneHorizontal((orientation) => {
        // Assign to the variable
        setIsFlat(orientation.isFlat);
      });
      return accelerometerSubscription; //Return Subscription to unsubscribe later
    };
    accelerometerSubscription = setupAccelerometer();

    !isFlat && subscription.unsubscribe();

    return () => {
      subscription.unsubscribe();

      if (accelerometerSubscription) {
        accelerometerSubscription.unsubscribe();
      }
    };
  }, [isFlat]);

  const offsetHeading = qiblaAngle - heading - 90;
  // -90 is for the emoji ➢ looking to the right instead of up
  const rotate = isFlat ? `${offsetHeading}deg` : '270deg';

  // console.log('isFlat', isFlat);
  if (error && qibla) return <Text>{error}</Text>;

  return (
    <>
      <Text
        style={[
          styles.compassText,
          !qibla && { fontSize: 44, lineHeight: 55 },
          !isFlat && { color: 'yellow' },
          { transform: [{ rotate }] },
          // animatedStyle,
        ]}
      >
        {qibla ? '➢' : '➤'}
      </Text>

      {qibla && (
        <>
          <Text style={styles.directionText}>{heading}°</Text>
          <Text style={styles.directionText}>{getDirection(heading)}</Text>
          <Text style={styles.directionText}>Kıble Açısı: {qiblaAngle}°</Text>
          <Text style={[styles.directionText, { color: 'yellow' }]}>
            {!isFlat ? 'Telefonu düz tutun' : ''}
          </Text>
        </>
      )}
    </>
  );
};

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

let qiblaAngle = calculateQiblaAngle();
