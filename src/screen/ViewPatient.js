import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import Boxx from './components/Boxx';
import NavHomeProfile from './components/NavHomeProfile';
import { getPatientProfile } from '../API/Home';

const MPI = 2; // ⚠️ baad mein login se aayega

const ViewPatient = ({ navigation }) => {

  const { data: patient, isLoading } = useQuery({
    queryKey: ['patientProfile', MPI],
    queryFn: () => getPatientProfile(MPI),
    enabled: !!MPI,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0D253C" style={{ flex: 1 }} />;
  }

  return (
    <>
      <ScrollViewContainer>
        <View style={{ padding: 20, paddingBottom: 100 }}>
          <Header title="Profile" fontSize={25} />
          <Boxx
            data={[
              { label: 'Name', value: patient?.name || 'N/A' },
              { label: 'Age', value: patient?.age || 'N/A' },
              { label: 'Gender', value: patient?.gender || 'N/A' },
              { label: 'NIC', value: patient?.nic || 'N/A' },
              { label: 'Phone No', value: patient?.phone_no || 'N/A' },
              { label: 'Address', value: patient?.address || 'N/A' },
            ]}
          />
        </View>
      </ScrollViewContainer>
      <NavHomeProfile navigation={navigation} activeTab="Profile" />
    </>
  );
};

export default ViewPatient;