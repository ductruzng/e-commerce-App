import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {UserType} from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
// global.atob = require('base-64').decode;

const AddressScreen = ({navigation}: any) => {
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);

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
    fetchAddresses();
  }, []);
  console.log('address', addresses);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`http://10.0.2.2:8000/addresses/${userId}`);
      const addresses = res.data;

      setAddresses(addresses);
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.row}>
        <Text style={styles.itemTextBold}>{item?.name}</Text>
        <MaterialIcons name="location-pin" size={24} color="red" />
      </View>

      <Text style={styles.itemText}>{item?.houseNo}</Text>

      <Text style={styles.itemText}>{item?.city}</Text>
      <Text style={styles.itemText}>phone No : {item?.mobileNo}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text>Remove</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text>Set as Default</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 30,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back" size={30} color={'#FEBE10'} />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
          My Address
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddAddress')}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          borderColor: '#D0D0D0',
          borderWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text style={{color: 'black'}}>Add a new Address</Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color={'black'} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FlatList
          data={addresses.addresses}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          // Optional: if your items have unique ids
          // keyExtractor={item => item.id.toString()}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  itemTextBold: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 15,
    color: 'black',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  button: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 0.9,
    borderColor: '#D0D0D0',
    marginRight: 10,
  },
});
