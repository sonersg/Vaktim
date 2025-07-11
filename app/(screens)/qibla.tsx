import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Compass from '../../components/Compass';
import translation from '../../assets/translations/translations';

export default function Qibla() {
  const [qibla, setqibla] = useState(false);

  const t = translation();

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
        <Compass qibla={qibla} t={t} />
      </View>
      <Text style={styles.text}>{t.qibla.warning}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#24242466',
    paddingHorizontal: 11,
  },

  text: {
    color: 'antiquewhite',
    // fontSize: 18,
    textAlign: 'center',
  },
});
