import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextinputWraper from './components/TextinputWraper';
import BlueButton from './components/BlueButton';

import { useMutation } from '@tanstack/react-query';
import { loginAPI } from '../API/Home';

const Login = ({ navigation }) => {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: response => {
      console.log('Login response:', response);
      const mpi =
        response?.mpi;
      if (!mpi) {
        Alert.alert('Login Error', 'Server response missing patient MPI.');
        return;
      }

      (async () => {
        await AsyncStorage.setItem('pid', mpi.toString());
        await AsyncStorage.setItem('name', response?.name.toString());
        await AsyncStorage.setItem('full_patient', response);
        console.log('Patient ID saved:', mpi); // Terminal mein check karne ke liye
      })();
      navigation.navigate('Home');
    },
    onError: error => {
      console.log('Login error:', error);
      Alert.alert('Login failed', error.message || 'Unable to login.');
    },
  });
  return (
    <ScrollViewContainer>
      <View style={{ alignItems: 'center' }}>
        <Header
          title="Login"
          onPress={() => navigation.goBack()}
          fontSize={25}
        />
      </View>

      <TextinputWraper
        placeholder="Enter your NIC"
        icon={require('../assests/Email.png')}
        value={nic}
        onChangeText={setNic}
      />

      <TextinputWraper
        placeholder="Enter your Password"
        icon={require('../assests/Password.png')}
        rightIcon={require('../assests/eye-slash.png')}
        isPassword={true}
        value={password}
        onChangeText={setPassword}
      />

      <BlueButton
        title={isPending ? 'Logging in...' : 'Sign in'}
        onPress={() => handleLogin({ nic, password })}
      />

      <View style={styles.footerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollViewContainer>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Login;
