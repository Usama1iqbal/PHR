import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import NavHomeProfile from './components/NavHomeProfile';
import RadioGroup from './components/RadioGroup';
import VitalInputBox from './components/VitalInputBox';
import Button from './components/Button';
import NestedDropdown from './components/NestedDropDown';
const ViewNotes = ({ navigation }) => {
  const [selectedVital, setSelectedVital] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [bloodsuger, setbloodsuger] = useState('');
  const [mealtime, setmealtime] = useState('');
  const [temperature, setTemperature] = useState('');

  return (
    <>
      <ScrollViewContainer>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('./../assests/Blue.png')}
            style={styles.headerBg}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.headerContent}>
              <Header title="Add Vitals" fontSize={25} color="#fff" />
            </View>
          </ImageBackground>
        </View>
        <Header title="Select Vital Type" fontSize={20} />
        <View style={styles.statsCard}>
          <RadioGroup
            value={selectedVital}
            onChange={setSelectedVital}
            options={[
              { label: 'BP', value: 'BP' },
              { label: 'Sugar', value: 'Sugar' },
              { label: 'Temperature', value: 'Temperature' },
            ]}
          />
        </View>

        {/* 👈 sirf BP select hone par show hoga */}
        {selectedVital === 'BP' && (
          <>
            <Header title="Blood Pressure" fontSize={20} />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <VitalInputBox
                placeholder="e.g. 120"
                unit="mmHg"
                value={systolic}
                onChangeText={setSystolic}
              />
              <VitalInputBox
                placeholder="e.g. 80"
                unit="mmHg"
                value={diastolic}
                onChangeText={setDiastolic}
              />
            </View>
          </>
        )}

        {selectedVital === 'Sugar' && ( // 👈 BP tha, Sugar karo
          <>
            <Header title="Blood Sugar" fontSize={20} />
            <View style={styles.statsCard}>
              <RadioGroup
                value={mealtime}
                onChange={setmealtime}
                options={[
                  { label: 'Before Meal', value: 'Before Meal' },
                  { label: 'After Meal', value: 'After Meal' },
                ]}
              />
            </View>
            <Header title="Sugar Value" fontSize={15} />
            <VitalInputBox
              placeholder="e.g. 100"
              unit="mg/dL"
              value={bloodsuger}
              onChangeText={setbloodsuger}
            />{' '}
          </>
        )}
        {selectedVital === 'Temperature' && ( // 👈 BP tha, Sugar karo
          <>
            <Header title="Temperature" fontSize={20} />
            <Header title="Temperature Value" fontSize={15} />
            <VitalInputBox
              placeholder="e.g. 98.6"
              unit="°F"
              value={temperature}
              onChangeText={setTemperature}
            />
          </>
        )}
        <Button title="Save" onPress={() => {}} style={styles.saveButton} />

        <NestedDropdown
          data={[
            {
              label: 'Ali',
              value: 'Ali',
              children: [
                { label: 'Mother', value: 'Mother' },
                { label: 'Daughter', value: 'Daughter' },
                { label: 'Sister', value: 'Sister' },
              ],
            },
            {
              label: 'Sara',
              value: 'Sara',
              children: [
                { label: 'Mother', value: 'Mother' },
                { label: 'Daughter', value: 'Daughter' },
                { label: 'Sister', value: 'Sister' },
              ],
            },
            {
              label: 'Tahreem',
              value: 'Tahreem',
              children: [
                { label: 'Mother', value: 'Mother' },
                { label: 'Daughter', value: 'Daughter' },
                { label: 'Sister', value: 'Sister' },
              ],
            },
            {
              label: 'Kainat',
              value: 'Kainat',
              children: [
                { label: 'Mother', value: 'Mother' },
                { label: 'Daughter', value: 'Daughter' },
                { label: 'Sister', value: 'Sister' },
              ],
            },
            {
              label: 'Abu Bakar',
              value: 'Abu Bakar',
              children: [
                { label: 'Mother', value: 'Mother' },
                { label: 'Daughter', value: 'Daughter' },
                { label: 'Sister', value: 'Sister' },
              ],
            },
          ]}
          placeholder="Select name"
          subPlaceholder="Select relation"
          onSelect={selected => console.log(selected)}
        />
      </ScrollViewContainer>
    </>
  );
};
const styles = StyleSheet.create({
  headerContainer: { marginBottom: 20, borderRadius: 20, overflow: 'hidden' },
  headerBg: { width: '100%', height: 180, justifyContent: 'center' },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  statsCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#0a0b0eff',
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  saveButton: {
    backgroundColor: '#2D3E50',
    borderRadius: 10,
    height: 40,
    marginTop: 30,
    width: '30%',
    alignSelf: 'center',
    marginHorizontal: 80,
  },
});

export default ViewNotes;
