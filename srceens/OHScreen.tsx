import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserType} from '../UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import OrderItem from '../components/OrderItem';


const OHScreen = () => {
  const {userId, setUserId} = useContext(UserType);
  const [orders, setOrders] = useState([]);
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
    getOrderById();
  }, []);
  const getOrderById = async () => {
    try {
      const res = await axios.get(`http://10.0.2.2:8000/orders/${userId}`);
      const orders = res.data;
      setOrders(orders.orders);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
          Notifications
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 40,
          paddingVertical: 50,
          gap: 30,
        }}
        showsHorizontalScrollIndicator={false}>
        <FlatList
          data={orders}
          renderItem={({item}) => (
            <OrderItem
              createdAt={item.createdAt}
              paymentMethod={item.paymentMethod}
              products={item.products}
              totalPrice={item.totalPrice}
            />
          )}
          keyExtractor={item => item._id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OHScreen;

const styles = StyleSheet.create({});
