import {
  Alert,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const RegisterScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  // Function to validate name
  const validateName = text => {
    if (text.length < 3) {
      setNameError('Name must be at least 3 characters long.');
    } else {
      setNameError('');
    }
    setName(text);
  };

  // Function to validate email
  const validateEmail = text => {
    if (!/^\S+@\S+\.\S+$/.test(text)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
    setEmail(text);
  };

  // Function to validate password
  const validatePassword = text => {
    if (text.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
    setPassword(text);
  };

  const handleRegister = () => {
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post('http:///10.0.2.2:8000/register', user)
      .then(respose => {
        console.log(respose);
        Alert.alert(
          'Registration Successfully',
          'You have registered successfully',
        );

        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.log('registration failed', error);
      });
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View>
        <Image
          style={{width: 300, height: 100}}
          source={{
            uri: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png',
          }}
        />
      </View>

      <KeyboardAvoidingView style={{alignItems: 'center'}}>
        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: 'black',
            }}>
            Login In to your Account
          </Text>
        </View>
        <View style={{marginTop: 70}}>
          <View style={styles.textInputContainer}>
            <Ionicons name="person" size={24} color={'gray'} />
            <TextInput
              value={name}
              style={[styles.textInput, {color: name ? 'black' : 'grey'}]}
              placeholder="enter your Name"
              onChangeText={text => setName(text)}
            />
          </View>
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          <View style={styles.textInputContainer}>
            <MaterialCommunityIcons name="email" size={24} color={'gray'} />
            <TextInput
              value={email}
              style={[styles.textInput, {color: email ? 'black' : 'grey'}]}
              placeholder="enter your Email"
              onChangeText={text => setEmail(text)}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <View style={styles.textInputContainer}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color={'gray'}
            />
            <TextInput
              value={password}
              style={[styles.textInput, {color: password ? 'black' : 'grey'}]}
              placeholder="enter your Password"
              secureTextEntry={isSecureEntry}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setIsSecureEntry(prev => !prev)}>
              <Ionicons
                name={isSecureEntry ? 'eye-off' : 'eye'}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <View style={{marginTop: 80}} />

        <TouchableOpacity
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: '#FEBE10',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            Already Have an account? Sign In
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D0D0D0',
    borderRadius: 5,
    paddingStart: 5,
    marginTop: 30,
    paddingEnd: 10,
  },
  textInput: {
    width: 300,
    color: 'gray',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
