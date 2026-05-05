import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { getDoctorsByPatient } from '../API/Home';

import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import DoctorListDetail from './components/DoctorListDetail';
import NavHomeProfile from './components/NavHomeProfile';
import TextinputWraper from './components/TextinputWraper';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = ({ navigation }) => {
  const [pid, setPid] = useState(null);

  useEffect(() => {
     (async () => {
      const id = await AsyncStorage.getItem('pid');
      setPid(id);
    })();
  }, []);

  const { data: doctors = [], isLoading, isError, error } = useQuery({
    queryKey: ['doctors', pid],
    queryFn: () => getDoctorsByPatient(pid),
    enabled: !!pid,
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2F80ED" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollViewContainer>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../assests/Blue.png')}
            style={styles.headerBg}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.headerContent}>
              <View>
                <Image
                  source={require('../assests/Profilee.png')}
                  style={styles.profilePic}
                />
                <Text style={styles.welcomeText}>Welcome!</Text>
                <Text style={styles.userName}>Muhammad Saad</Text>
              </View>
              <Image
                source={require('../assests/Heart.png')}
                style={styles.heartLogo}
              />
            </View>
          </ImageBackground>

          <TextinputWraper
            placeholder="Search Doctor..."
            icon={require('../assests/Search.png')}
          />
          <Header title="Doctor Visits" fontSize={30} />
        </View>

        {doctors.length > 0 ? (
          doctors.map((item, index) => (
            <DoctorListDetail
              key={index}
              doctorData={item}
              onPress={() =>
                navigation.navigate('ViewDoctor', {
                  doctor_id: item.doctor_id,
                  pid,
                })
              }
            />
          ))
        ) : (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={styles.noDataText}>No Doctors Found</Text>
          </View>
        )}
      </ScrollViewContainer>

      <NavHomeProfile navigation={navigation} activeTab="Home" />
    </View>
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
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  welcomeText: { color: '#333', fontSize: 14, fontWeight: '600' },
  userName: { color: '#000', fontSize: 20, fontWeight: 'bold' },
  heartLogo: { width: 100, height: 100, resizeMode: 'contain', opacity: 0.9 },
  noDataText: { fontSize: 16, color: '#777' },
});

export default Home;
