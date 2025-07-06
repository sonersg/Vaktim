import {
  Button,
  Modal,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { storage } from '../app/(screens)/_layout';

interface IModalProps {
  setmodalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setcalcMethod: React.Dispatch<React.SetStateAction<string>>;
  modalVisible: boolean;
  calcMethod: string;
}
export default function MyModal({
  modalVisible,
  setmodalVisible,
  calcMethod,
  setcalcMethod,
}: IModalProps) {
  const [modal2Visible, setmodal2Visible] = useState(false);
  const [fajrAngle, setfajrAngle] = useState('');
  const [ishaAngle, setishaAngle] = useState('');

  useEffect(() => {
    setcalcMethod(storage.getString('calculation-method') || 'MWL');
    setfajrAngle(storage.getString('fajr-angle') || '0');
    setishaAngle(storage.getString('isha-angle') || '0');
  }, []);

  return (
    <>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setmodalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Hesaplama Yöntemi: {calcMethod}</Text>
            <View style={styles.scrollViewContainer}>
              <ScrollView>
                {calcMethodsArray.map((object) => (
                  <TouchableHighlight
                    key={object.name}
                    onPress={() => {
                      setcalcMethod(object.name);
                      storage.delete('tunes-object');
                      storage.set('calculation-method', object.name);
                      if (object.name === 'Custom') {
                        setmodal2Visible(true);
                        setmodalVisible(false);
                      }
                      if (object.name != 'Custom') {
                        storage.delete('fajr-angle');
                        storage.delete('isha-angle');
                      }
                    }}
                  >
                    <Text style={styles.scrollText}>{object.fullName}</Text>
                  </TouchableHighlight>
                ))}
              </ScrollView>
            </View>

            <Button
              title='tamam'
              onPress={() => setmodalVisible(false)}
              color='transparent'
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modal2Visible}
        onRequestClose={() => setmodalVisible(!modal2Visible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>İmsak Açısı: {fajrAngle} °</Text>
            <Text style={styles.title}>Yatsı Açısı: {ishaAngle} °</Text>
            <View style={{ flexDirection: 'row', gap: 22 }}>
              <View style={styles.scrollViewContainer}>
                <ScrollView>
                  {degrees.map((degree) => (
                    <TouchableHighlight
                      key={degree}
                      onPress={() => {
                        setfajrAngle(degree);
                        storage.set('fajr-angle', degree);
                      }}
                    >
                      <Text style={styles.scrollText}>{degree} °</Text>
                    </TouchableHighlight>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.scrollViewContainer}>
                <ScrollView>
                  {degrees.map((degree) => (
                    <TouchableHighlight
                      key={degree}
                      onPress={() => {
                        setishaAngle(degree);
                        storage.set('isha-angle', degree);
                      }}
                    >
                      <Text style={styles.scrollText}>{degree} °</Text>
                    </TouchableHighlight>
                  ))}
                </ScrollView>
              </View>
            </View>
            <Button
              title='tamam'
              onPress={() => setmodal2Visible(false)}
              color='transparent'
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 10,
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  scrollViewContainer: {
    // backgroundColor: '#333',
    height: 222,
    minWidth: 111,
    marginVertical: 11,
  },

  scrollText: {
    borderBottomWidth: 2,
    borderColor: 'white',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    padding: 5,
    marginVertical: 5,
  },

  title: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
});

const calcMethodsArray = [
  { name: 'Egypt', fullName: 'Egyptian General Authority of Survey' },
  { name: 'Tehran', fullName: 'Institute of Geophysics, University of Tehran' },
  { name: 'ISNA', fullName: 'Islamic Society of North America, ISNA' },
  { name: 'MWL', fullName: 'Muslim World League' },
  {
    name: 'Jafari',
    fullName: 'Shia Ithna-Ashari, Leva Institute, Qum, Jafari',
  },
  { name: 'Turkiye', fullName: 'Türkiye' },
  { name: 'Makkah', fullName: 'Umm Al-Qura University, Makkah' },
  { name: 'Karachi', fullName: 'University of Islamic Sciences, Karachi' },
  { name: 'Custom', fullName: 'Custom' },
];

const degrees = [
  '4.0',
  '5.0',
  '6.0',
  '7.0',
  '8.0',
  '9.0',
  '10.0',
  '11.0',
  '12.0',
  '13.0',
  '14.0',
  '15.0',
  '15.5',
  '16.0',
  '16.5',
  '17.0',
  '17.5',
  '18.0',
  '18.5',
  '19.0',
  '19.5',
  '20.0',
  '20.5',
  '21.0',
  '21.5',
  '22.0',
  '22.5',
  '23.0',
  '24.0',
  '25.0',
  '26.0',
  '27.0',
  '28.0',
];
