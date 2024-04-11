import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../srceens/HomeScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CartScreen from '../srceens/CartScreen';
import ProfileScreen from '../srceens/ProfileScreen';
import { useSelector } from 'react-redux';
import OHScreen from '../srceens/OHScreen';
import SearchScreen from '../srceens/SearchScreen';


const Tab = createBottomTabNavigator();
const cartItemCount = 1;

const CartIconWithBadge = ({ focused, color }: any) => {
    return (
        <View>
            <Ionicons
                name={focused ? 'notifications' : 'notifications-outline'}
                size={25}
                color={focused ? '#FEBE10' : 'black'}
            />
            {cartItemCount > 0 && (
                <View
                    style={{
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 8,
                        width: 18,
                        height: 18,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: 'white'
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10 }}>
                        {cartItemCount}
                    </Text>
                </View>
            )}
        </View>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,

            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? (
                            <Ionicons name='home' size={25} color={'#FEBE10'} />
                        ) : (
                            <Ionicons name='home-outline' size={25} color={'black'} />

                        )

                    ),
                }}></Tab.Screen>
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? (
                            <Ionicons name='search' size={25} color={'#FEBE10'} />
                        ) : (
                            <Ionicons name='search-outline' size={25} color={'black'} />

                        )

                    ),
                }}></Tab.Screen>
            <Tab.Screen
                name="Notification"
                component={OHScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CartIconWithBadge focused={focused} color={color} />

                    ),
                }} />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ? (
                            <Ionicons name='person' size={25} color={'#FEBE10'} />
                        ) : (
                            <Ionicons name='person-outline' size={25} color={'black'} />

                        )
                    ),
                }} />



        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 70,
    },

});

export default TabNavigator;
