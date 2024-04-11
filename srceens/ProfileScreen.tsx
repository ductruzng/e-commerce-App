import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserType} from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import LogoutConfirmation from '../components/LogoutConfirmation';
// global.atob = require('base-64').decode;

const ProfileScreen = ({navigation}: any) => {
  const {userId, setUserId} = useContext(UserType);
  const [profile, setProfile] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    setUserId(null);
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        }
      } catch (error) {
        console.error('Failed to fetch or decode the token:', error);
      }
    };
    fetchUser();
    getUserById();
  }, []);
  const getUserById = async () => {
    try {
      const res = await axios.get(`http://10.0.2.2:8000/profile/${userId}`);
      const profile = res.data;
      setProfile(profile.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 40}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
          Profile
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          marginTop: 40,
          alignItems: 'center',
        }}>
        <Image
          style={{width: 60, height: 60, borderRadius: 60}}
          resizeMode="contain"
          source={{
            uri: profile.avatar
              ? profile.avatar
              : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
          }}
        />
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            {profile.name}
          </Text>
          <Text style={{fontSize: 14}}>{profile.email}</Text>
        </View>
      </View>

      <View style={{marginTop: 40}}>
        <Text style={{fontSize: 16}}>General</Text>
        <View
          style={{
            backgroundColor: 'grey',
            height: 1,
            marginTop: 5,
            marginBottom: 10,
          }}
        />
        <View style={{gap: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditProfile', {
                profile: profile,
              })
            }>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              Edit Information
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              Order History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Address')}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              Address
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('qna')}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              Q & A
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 40}}>
        <Text style={{fontSize: 16}}>Privacy and Terms</Text>
        <View
          style={{
            backgroundColor: 'grey',
            height: 1,
            marginTop: 5,
            marginBottom: 10,
          }}
        />
        <View style={{gap: 20}}>
          <TouchableOpacity>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              Terms and conditions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              Transaction history
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
              Privacy policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={{fontSize: 16, color: 'red', fontWeight: '500'}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <LogoutConfirmation
        visible={showLogoutModal}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
