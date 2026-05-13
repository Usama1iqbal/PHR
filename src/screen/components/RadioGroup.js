import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const RadioGroup = ({ value, onChange, options = [] }) => {
  return (
    <RadioButton.Group onValueChange={onChange} value={value}>
      <View style={styles.row}>
        {options.map(option => (
          <View key={option.value} style={styles.radioItem}>
            <RadioButton value={option.value} color="#1B3B66" />
            <Text>{option.label}</Text>
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  radioItem: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
});

export default RadioGroup;