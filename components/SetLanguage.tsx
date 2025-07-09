import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React, { memo, useContext, useState } from 'react';
import { storage } from '../app/(screens)/_layout';
import { ReRenderContext } from '../context/ReRenderContext';

const SetLanguage = ({ themeColor }: { themeColor?: string }) => {
  const [lang, setlang] = useState(storage.getString('lang') || 'tr');

  const data = useContext(ReRenderContext);

  const color = themeColor || 'gray';

  const setAndSave = (value: string) => {
    setlang(value);
    storage.set('lang', value);
    data.setreRender((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {lang === 'tr' ? 'Dil: Türkçe' : 'Language: English'}
      </Text>

      <View style={styles.row}>
        <TouchableHighlight
          style={[
            styles.btn,
            styles.radioBtnLeft,
            { borderColor: color },
            lang === 'tr' && { backgroundColor: color },
          ]}
          onPress={() => setAndSave('tr')}
        >
          <Text style={styles.text}>Türkçe 🇹🇷</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[
            styles.btn,
            styles.radioBtnRight,
            { borderColor: color },
            lang === 'en' && { backgroundColor: color },
          ]}
          onPress={() => setAndSave('en')}
        >
          <Text style={styles.text}>English 🇺🇸</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default memo(SetLanguage);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
  },

  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 13,
    borderWidth: 3,
    minWidth: 99,
    alignItems: 'center',
  },

  radioBtnRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderLeftWidth: 0,
  },
  radioBtnLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderRightWidth: 0,
  },

  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
