import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getLabResults } from '../API/Home';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import Boxx from './components/Boxx';
import ShadowLine from './components/ShadowLine';
import NavHomeProfile from './components/NavHomeProfile';

const CBCReport = ({ navigation, route }) => {
  const { report_id } = route.params ?? {};

  const { data: report, isLoading } = useQuery({
    queryKey: ['labResult', report_id],
    queryFn: () => getLabResults(report_id),
    enabled: !!report_id,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0D253C" style={{ flex: 1 }} />;
  }

  return (
    <>
      <ScrollViewContainer>
        <Header title={report?.test_name || 'CBC Report'} fontSize={20} />
        <Header title="Report Summary" fontSize={20} />

        <Boxx
          data={[{ value: report?.description || 'N/A' }]}
        />

        <Header title="Results" fontSize={35} />

        <View style={[styles.serverHeaderRow, styles.headerBorder]}>
          <Text style={styles.middleTitle}>Parameter</Text>
          <Text style={styles.middleTitle}>Range</Text>
          <Text style={styles.middleTitle}>Units</Text>
          <Text style={styles.middleTitle}>Result</Text>
        </View>
        <ShadowLine />

        {report?.mini_test_results?.length > 0 ? (
          report.mini_test_results.map(item => (
            <View key={item.mini_test_id} style={styles.serverHeaderRow}>
              <Text style={styles.middleTitle}>{item.test_name}</Text>
              <Text style={styles.middleTitle}>{item.normal_range}</Text>
              <Text style={styles.middleTitle}>-</Text>
              <Text style={styles.middleTitle}>{item.result_value}</Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', color: '#aaa', padding: 10 }}>
            Koi result nahi mila
          </Text>
        )}

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
  },
  middleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D253C',
    flex: 1,
  },
});

export default CBCReport;