import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import Boxx from './components/Boxx';
import NavHomeProfile from './components/NavHomeProfile';
import PagePAtientDetail from './components/PagePAtientDetail';
import { getVisitNoteDetails, getLabReportsBase } from '../API/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewNotes = ({ navigation, route }) => {
  const { note_id } = route.params ?? {};

  // API 1 — Visit note detail
  const { data: note, isLoading: noteLoading } = useQuery({
    queryKey: ['visitNoteDetail', note_id],
    queryFn: () => getVisitNoteDetails(note_id),
    enabled: !!note_id,
  });

  // API 2 — Lab reports
  const { data: labReports = [], isLoading: labLoading } = useQuery({
    queryKey: ['labReports', note_id],
    queryFn: () => getLabReportsBase(note_id),
    enabled: !!note_id,
  });

  if (noteLoading) {
    return (
      <ActivityIndicator size="large" color="#0D253C" style={{ flex: 1 }} />
    );
  }

  return (
    <>
      <ScrollViewContainer>
        <Header title={note?.note_title || 'Visit Detail'} fontSize={25} />
        <Boxx
          data={[
            {
              label: 'Patient Complaint',
              value: note?.patient_complaint || 'N/A',
            },
            { label: 'Diagnosis', value: note?.diagnosis || 'N/A' },
            { label: 'Consultation Notes', value: note?.note_details || 'N/A' },
            { label: 'Lab Name', value: note?.lab_name || 'N/A' },
            { label: 'Lab Tests', value: note?.lab_tests?.join(', ') || 'N/A' },
            {
              label: 'Consultation Bill',
              value: note?.consultation_bill || '0',
            },
            { label: 'Lab Bill', value: note?.test_bill || '0' },
            { label: 'Bill Status', value: note?.payment_status || 'N/A' },
          ]}
        />

        <View style={styles.serverHeaderRow}>
          <Header title="Lab Reports" fontSize={20} />
        </View>

        <View style={styles.statsCard}>
          {labLoading ? (
            <ActivityIndicator color="#0D253C" />
          ) : labReports.length === 0 ? (
            <Text style={styles.emptyText}>No lab report</Text>
          ) : (
            labReports.map(report => (
              <PagePAtientDetail
                key={report.report_id}
                testName={report.test_name}
                date={report.updated_at}
                status={report.test_status}
                vid={report.lab_name}
                onPress={() =>
                  navigation.navigate('CBCReport', {
                    report_id: report.report_id,
                    note_id:note.note_id
                    
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
  emptyText: { color: '#aaa', textAlign: 'center', padding: 10 },
});

export default ViewNotes;
