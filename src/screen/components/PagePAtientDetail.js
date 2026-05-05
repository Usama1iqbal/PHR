import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'; // ✅ TouchableOpacity add karo

const PagePAtientDetail = ({ testName, vid, status, date, onPress }) => { // ✅ onPress add karo
  return (
    <TouchableOpacity onPress={onPress} style={styles.patientCard}> 
      <Image
        source={require('../../assests/PageIcon.png')}
        style={styles.avatar}
      />

      <View style={styles.cardDetails}>
        <Text style={styles.patientName}>{testName}</Text>
        <Text style={styles.detailText}>{date}</Text>
        <Text style={styles.detailText}>{status}</Text>
        <Text style={styles.detailText}>{vid}</Text>
      </View>

      <Text style={styles.arrowIcon}>›</Text>
    </TouchableOpacity> // ✅ closing bhi change karo
  );
};

const styles = StyleSheet.create({
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  patientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D253C',
    marginBottom: 4,
    textTransform: 'capitalize', // Name ka pehla harf bada karne ke liye
  },
  detailText: {
    fontSize: 12,
    color: '#777',
    marginBottom: 2,
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: 'bold',
  },
});

export default PagePAtientDetail;
