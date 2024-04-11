import { Alert, Image, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isKeepLogin, setIsKeepLogin] = useState(false);


  useEffect(() => {
    checkLoginState()
  }, []);

  const [error, setError] = useState('');
  const checkLoginState = async () => {
    const keepLogin = await AsyncStorage.getItem('keepLogin');

    if (keepLogin == "true") {
      setIsKeepLogin(JSON.parse(keepLogin));
    }
  };


  const handleLogin = () => {

    const user = {
      email: email,
      password: password

    }

    axios.post("http://10.0.2.2:8000/login", user)
      .then(async (response) => {
        console.log(response);
        const token = response.data.token;

        await AsyncStorage.setItem('authToken', token)
        await AsyncStorage.setItem('keepLogin', JSON.stringify(isKeepLogin))

        navigation.replace('Main')

      }).catch((err) => {
        setError('Invalid Email or password. Try Again !');
        console.log(err)
      })
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
      <View>
        <Image
          style={{ width: 300, height: 100 }}
          source={{
            uri: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png'
          }}
        />
      </View>

      <KeyboardAvoidingView
        style={{ alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 12, color: 'black' }}>Login In to your Account</Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View style={styles.textInputContainer}>
            <MaterialCommunityIcons name='email' size={24} color={'gray'} />
            <TextInput
              value={email}
              style={[styles.textInput, { color: email ? 'black' : 'grey' }]}
              placeholder='enter your Email'
              onChangeText={(text) => setEmail(text)} />
          </View>

          <View style={styles.textInputContainer}>
            <MaterialCommunityIcons name='lock-outline' size={24} color={'gray'} />
            <TextInput
              value={password}
              style={[styles.textInput, { color: password ? 'black' : 'grey' }]}
              placeholder='enter your Password'
              secureTextEntry={isSecureEntry}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setIsSecureEntry(prev => !prev)}
            >
              <Ionicons name={isSecureEntry ? 'eye-off' : 'eye'} size={24} color="grey" />
            </TouchableOpacity>
          </View>
          {error ? <Text style={{ color: 'red', fontWeight: 'bold' }}>{error}</Text> : null}
        </View>

        <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%' }}>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            {isKeepLogin ? (
              <TouchableOpacity
                onPress={() => setIsKeepLogin(false)}
              >
                <MaterialIcons name={'check-box'} size={24} color="grey" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setIsKeepLogin(true)}
              >
                <MaterialIcons name={'check-box-outline-blank'} size={24} color="grey" />
              </TouchableOpacity>
            )}
            <Text style={{ color: "black" }}>Keep me logged in</Text>

          </View>

          <Text style={{ color: '#007FFF', fontWeight: '500' }}>Forgot Password</Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <TouchableOpacity
          onPress={handleLogin}
          style={{ width: 200, backgroundColor: '#FEBE10', borderRadius: 6, marginLeft: 'auto', marginRight: 'auto', padding: 15 }}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{ marginTop: 15 }}>
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default LoginScreen

const styles = StyleSheet.create({
  textInputContainer:
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D0D0D0',
    borderRadius: 5,
    paddingStart: 5,
    paddingEnd: 10,
    marginTop: 30
  },
  textInput: {
    width: 300,
    color: 'gray',

  }

})