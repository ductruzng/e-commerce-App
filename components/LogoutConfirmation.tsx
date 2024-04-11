import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

const LogoutConfirmation = ({visible, onConfirm, onCancel}: any) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to sign out?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button,{backgroundColor:'grey'}]} onPress={onCancel}>
              <Text style={[styles.buttonText,]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {

    fontSize: 16,
    marginBottom: 20,
    fontWeight:'500',
    color:'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LogoutConfirmation;
