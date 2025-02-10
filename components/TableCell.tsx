import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { getTouched } from '../utils/highlight';
import { prayerTimeLabels } from '../assets/iller';

interface ITableCellProps {
  time: string;
  index: number;
  highlight: number;
  themeColor: string;
}
const TableCell = ({ time, index, themeColor, highlight }: ITableCellProps) => {
  return (
    <TouchableOpacity
      style={[styles.eachTimeContainer]}
      onPress={() => getTouched(time)}
    >
      <Text
        style={[
          styles.text,
          highlight === index && {
            fontWeight: 'bold',
            color: themeColor,
          },
        ]}
      >
        {prayerTimeLabels[index]}:
      </Text>
      <Text
        style={[
          styles.text,
          highlight === index && {
            fontWeight: 'bold',
            color: themeColor,
          },
        ]}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(TableCell);

const styles = StyleSheet.create({
  eachTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#33333399',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: '#777',
    borderRadius: 15,
    width: 210,
  },

  text: {
    color: 'white',
    fontSize: 25,
  },
});
