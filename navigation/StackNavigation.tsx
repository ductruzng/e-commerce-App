import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../srceens/LoginScreen'
import RegisterScreen from '../srceens/RegisterScreen'
import HomeScreen from '../srceens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TabNavigator from './TabNavigator'
import DetailScreen from '../srceens/DetailScreen'
import AddAddressScreen from '../srceens/AddAddressScreen'
import AddressScreen from '../srceens/AddressScreen'
import CartScreen from '../srceens/CartScreen'
import ConfirmationScreen from '../srceens/ConfirmationScreen'
import OrderScreen from '../srceens/OrderScreen'
import SplashScreen from '../srceens/SplashScreen'
import OHScreen from '../srceens/OHScreen'
import EditProfileScreen from '../srceens/EditProfileScreen'
import QuestionAnswer from '../srceens/QnAScreen'


const StackNavigation = () => {
    const Stack = createNativeStackNavigator();


    return (
        <NavigationContainer>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <Stack.Navigator>
                <Stack.Screen name='Splash'
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name='Login'
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name='Register'
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                    component={RegisterScreen}
                />
                <Stack.Screen name='Main'
                    options={{
                        headerShown: false,
                        animation: 'fade_from_bottom'
                    }}
                    component={TabNavigator}
                />
                <Stack.Screen name='Detail'
                    options={{
                        headerShown: false,
                        animation: 'fade'
                    }}
                    component={DetailScreen}

                />
                <Stack.Screen name='AddAddress'
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                    component={AddAddressScreen}

                />
                <Stack.Screen name='Address'
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                    component={AddressScreen}

                />
                <Stack.Screen name='Cart'
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                    component={CartScreen}

                />
                <Stack.Screen name='Confirm'
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                    component={ConfirmationScreen}

                />
                <Stack.Screen name='Order'
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                    component={OrderScreen}

                />
                <Stack.Screen name='OrderHistory'
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                    component={OHScreen}

                />
                <Stack.Screen name='EditProfile'
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                    component={EditProfileScreen}

                />
                  <Stack.Screen name='qna'
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                    component={QuestionAnswer}

                />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})