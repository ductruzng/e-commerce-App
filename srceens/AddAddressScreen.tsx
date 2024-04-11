import { Alert, Pressable, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
const AddressTypeSelector = ({ options, selected, onSelect }: any) => {
  return (
    <View style={styles.selectorContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selected === option && styles.buttonSelected,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.buttonText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const AddAddressScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [city, setCity] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [addressType, setAddressType] = useState('Home');
  const [isDefault, setIsDefault] = useState(false);
  const { userId, setUserId } = useContext(UserType)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        }
      } catch (error) {
        console.error('Failed to fetch or decode the token:', error);
      }
    }
    fetchUser()
  }, [])

  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      city,
      houseNo,
      default: isDefault,
      type: addressType

    }

    axios.post("http://10.0.2.2:8000/addresses", { userId, address })
      .then((res) => {
        Alert.alert("Success", "Addresses added successfully")
        setName('')
        setIsDefault(false)
        setCity('')
        setHouseNo('')
        setMobileNo('')

        setTimeout(() => {
          navigation.goBack()
        }, 500)
      }).catch((err) => {
        Alert.alert("Error", " Failed to add address")
        console.log(err)
      })
  }
  return (
    <View>
      <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 30 }}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}>
          <Ionicons name='arrow-back' size={30} color={'#FEBE10'} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Add New Address</Text>
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
          Contact
        </Text>

        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor={"grey"}
          style={styles.textInputContainer}
          placeholder="Full Name"
        />
        <TextInput
          value={mobileNo}
          onChangeText={(text) => setMobileNo(text)}
          placeholderTextColor={"grey"}
          style={{
            padding: 10,
            backgroundColor: 'white',


          }}
          placeholder="Mobile Number"
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>
          Address
        </Text>

        <TextInput
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholderTextColor={"grey"}
          style={styles.textInputContainer}
          placeholder="City, Distric, Commune"
        />

        <TextInput
          value={houseNo}
          onChangeText={(text) => setHouseNo(text)}
          placeholderTextColor={"grey"}
          style={{
            padding: 10,
            backgroundColor: 'white'

          }}
          placeholder="Street, Lankmark, House No"
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 15, marginHorizontal: 10 }}>Settings</Text>

        <View style={styles.settingOptionContainer}>
          <Text
            style={{ color: 'black' }}>Type Address:</Text>
          <AddressTypeSelector
            options={['Office', 'Home']}
            selected={addressType}
            onSelect={setAddressType}
          />
        </View>
        <View style={{
          padding: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text
            style={{

              color: 'black'
            }}
          >Set default Address</Text>
          <Switch
            value={isDefault}
            onValueChange={setIsDefault}
          />
        </View>

      </View>

      <Pressable
        onPress={handleAddAddress}
        style={{
          backgroundColor: "#FFC72C",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginHorizontal: 10,
          padding: 12
        }}
      >
        <Text style={{ fontWeight: "600", color: 'black', fontSize: 16 }}>ADD ADDRESS</Text>
      </Pressable>
    </View>
  )
}

export default AddAddressScreen

const styles = StyleSheet.create({
  textInputContainer: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderBottomWidth: 1,
    marginTop: 10,
    backgroundColor: 'white',
  },
  settingOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderColor: "#D0D0D0",
    borderBottomWidth: 1,
    marginTop: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    gap: 10
  },
  button: {
    paddingVertical: 3,
    paddingHorizontal: 20,
    backgroundColor: 'lightgrey'
  },
  buttonSelected: {
    backgroundColor: '#FEBE10',
  },
  buttonText: {
    color: 'black',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})