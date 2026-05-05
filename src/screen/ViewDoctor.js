import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import Boxx from './components/Boxx';
import NavHomeProfile from './components/NavHomeProfile';
import PagePAtientDetail from './components/PagePAtientDetail';
import { getDoctorById, getDoctorVisitNotes } from '../API/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewDoctor = ({ navigation, route }) => {
  const { doctor_id } = route.params ?? {};
  const [pid, setPid] = useState(null);

  useEffect(() => {
    (async () => {
      const id = await AsyncStorage.getItem('pid');
      setPid(id);
    })();
  }, []);

  // API 1 — Doctor detail
  const { data: doctor, isLoading: doctorLoading } = useQuery({
    queryKey: ['doctor', doctor_id],
    queryFn: () => getDoctorById(doctor_id),
    enabled: !!doctor_id,
  });

  // API 2 — Visit notes
  const {
    data: notes = [],
    isLoading: notesLoading,
    isError,
  } = useQuery({
    queryKey: ['doctorVisitNotes', pid, doctor_id],
    queryFn: () => getDoctorVisitNotes(pid, doctor_id),
    enabled: !!pid && !!doctor_id,
  });

  if (doctorLoading) {
    return (
      <ActivityIndicator size="large" color="#0D253C" style={{ flex: 1 }} />
    );
  }

  return (
    <>
      <ScrollViewContainer>
        <Header title={`Dr. ${doctor?.name || ''}`} fontSize={25} />
        <Boxx
          data={[
            { label: 'Phone', value: doctor?.phone_no || 'N/A' },
            { label: 'Specialization', value: doctor?.specialization || 'N/A' },
            { label: 'About', value: doctor?.about || 'N/A' },
          ]}
        />

        <View style={styles.serverHeaderRow}>
          <Header title="Visiting Notes" fontSize={20} />
        </View>

        <View style={styles.statsCard}>
          {notesLoading ? (
            <ActivityIndicator color="#0D253C" />
          ) : isError ? (
            <Text style={styles.errorText}>Notes not load!</Text>
          ) : notes.length === 0 ? (
            <Text style={styles.emptyText}>No visit Note</Text>
          ) : (
            notes.map(note => (
              <PagePAtientDetail
                key={note.note_id}
                testName={note.note_title}
                date={note.visit_date}
                onPress={() =>
                  navigation.navigate('ViewNotes', {
                    note_id: note.note_id,
                   
                  })
                }
              />
            ))
          )}
        </View>
      </ScrollViewContainer>
      <NavHomeProfile navigation={navigation} activeTab="Home" />
    </>
  );
};

const styles = StyleSheet.create({
  serverHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  statsCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  errorText: { color: 'red', textAlign: 'center', padding: 10 },
  emptyText: { color: '#aaa', textAlign: 'center', padding: 10 },
});

export default ViewDoctor;
