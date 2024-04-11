import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

const EditProfileScreen = ({navigation, route}: any) => {
  const info = route.params.profile;
  const [response, setResponse] = useState<any>();
  const [email, setEmail] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const updateUserById = async () => {
    try {
      await axios.put(`http://10.0.2.2:8000/update-profile-by-id/${info._id}`, {
        name: fullname ?? info.name,
        email: email ?? info.email,
        phoneNo: phoneNo ?? info.phoneNo,
        avatar: response?.assets[0].uri ?? info.avatar,
      });
      ToastAndroid.showWithGravity(
        'Complete update profile',
        ToastAndroid.CENTER,
        ToastAndroid.SHORT,
      );
      navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
          Edit Infomation
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity
          onPress={async () => {
            await launchImageLibrary(
              {
                selectionLimit: 1,
                mediaType: 'photo',
              },
              setResponse,
            );
          }}>
          {response?.assets ? (
            response?.assets.map(({uri}: {uri: string}) => (
              <View key={uri}>
                <Image
                  resizeMode="contain"
                  resizeMethod="scale"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 120,
                    borderWidth: 1,
                    borderColor: 'grey',
                    shadowOpacity: 3,
                  }}
                  source={{uri: uri ? uri : info.avatar}}
                />
              </View>
            ))
          ) : (
            <Image
              style={{
                width: 120,
                height: 120,
                borderRadius: 120,
                borderWidth: 1,
                borderColor: 'grey',
              }}
              resizeMode="contain"
              source={{
                uri: info.avatar
                  ? info.avatar
                  : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder={info.name}
          style={styles.input}
          onChangeText={text => setFullname(text)}
          value={fullname}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder={info.email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          value={email}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder={info.phoneNo}
          onChangeText={text => setPhoneNo(text)}
          style={styles.input}
          value={phoneNo}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateUserById()}>
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 50,
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
