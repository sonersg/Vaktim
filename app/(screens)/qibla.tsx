import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Compass from '../../components/Compass';

export default function Qibla() {
  const [qibla, setqibla] = useState(false);
  useEffect(() => {
    setqibla(true);

    return () => {
      setqibla(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Gördüğün ilk kişiye kıbleyi sor.</Text> */}
      <View style={{ alignItems: 'center' }}>
        <Compass qibla={qibla} />
      </View>
      <Text style={styles.text}>
        Kıble yönü telefonunuzdan alınan sensör bilgileriyle hesaplanmaktadır.
        Her zaman doğru olmayabilir.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#242424a4',
    paddingHorizontal: 11,
  },

  text: {
    color: 'antiquewhite',
    // fontSize: 18,
    textAlign: 'center',
  },
});
