import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const VitalInputBox = ({ placeholder, unit, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
      <View style={styles.unitBox}>
        <Text style={styles.unitText}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  unitBox: {
    backgroundColor: '#D6E4F7',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  unitText: {
    color: '#1B3B66',
    fontWeight: 'bold',
  },
});

export default VitalInputBox;