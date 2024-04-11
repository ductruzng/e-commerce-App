import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigation from './navigation/StackNavigation'
import { Provider } from 'react-redux'
import store from './store'
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext'

const App = () => {
  return (
    <Provider store={store}>
      <UserContext>
        <StackNavigation />
        <ModalPortal />
      </UserContext>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})