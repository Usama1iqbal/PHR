import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextinputWraper from './components/TextinputWraper';
import BlueButton from './components/BlueButton';
import { useMutation } from '@tanstack/react-query';
import { signupAPI } from '../API/Home';

const Signup = ({ navigation }) => {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: handleSignup, isPending } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (data) => {
      Alert.alert('Success', data.message || 'Account created! Please Login.', [
        { text: 'OK', onPress: () => navigation?.navigate('Login') },
      ]);
    },
    onError: (error) => {
      Alert.alert('Signup Failed', error.message || 'Network Error');
    },
  });

  const onSubmit = () => {
    if (!nic || !password) {
      Alert.alert('Error', 'NIC aur Password dono zarori hain');
      return;
    }
    handleSignup({ nic, password }); // ← API call
  };


  return (
    <ScrollViewContainer>
      <View style={{ alignItems: 'center' }}>
        <Header title="Sign Up" fontSize={25} />
      </View>

      <TextinputWraper
        placeholder="Enter your NIC"
        icon={require('../assests/Profile.png')}
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
        title={isPending ? 'Creating Account...' : 'Sign up'}
        onPress={() => handleSignup({ nic, password })}
        disabled={isPending}
      />

      <View style={styles.footerContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>Sign In</Text>
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

export default Signup;