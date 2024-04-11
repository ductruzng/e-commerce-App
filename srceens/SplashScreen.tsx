import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }: any) => {
    const checkLoginState = async () => {
        const keepLogin = await AsyncStorage.getItem('keepLogin');

        if (keepLogin == "true") {
            checkTokenAndNavigate()
        }
    };

    const checkTokenAndNavigate = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (token) {
                navigation.replace("Main");
            } else {
                navigation.navigate("Login");
            }
        } catch (err) {
            console.log("Error retrieving the token", err);
        }
    };

    useEffect(() => {
        checkLoginState()
    }, [navigation]);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

            <Image
                style={{ width: 400, height: 100 }}
                source={{
                    uri: 'https://purepng.com/public/uploads/large/amazon-logo-s3f.png'
                }}
            />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})