import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = ({ navigation }: any) => {
  const cart = useSelector((state) => state.cart.cart);

  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increaseQuantity = (item: any) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  console.log(cart)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
     <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 30 }}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}>
          <Ionicons name='arrow-back' size={30} color={'#FEBE10'} />
 
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>My Cart</Text>
      </View>
      {cart != 0 ? (
        <View style={{flex:1}}>
          <ScrollView 
          style={{flex:1}}
          >

            <Text
              style={{
                height: 1,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 16,
              }}
            />

            <View style={{ marginHorizontal: 10 }}>
              {cart?.map((item, index) => (
                <View
                  style={{
                    backgroundColor: "white",
                    marginVertical: 10,
                    borderBottomColor: "#F0F0F0",
                    borderWidth: 2,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                  }}
                  key={index}
                >
                  <Pressable
                    style={{
                      marginVertical: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Image
                        style={{ width: 140, height: 140, resizeMode: "contain" }}
                        source={{ uri: item?.image }}
                      />
                    </View>

                    <View>
                      <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                        {item?.title}
                      </Text>
                      <Text
                        style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                      >
                        {item?.price}
                      </Text>
                      <Image
                        style={{ width: 30, height: 30, resizeMode: "contain" }}
                        source={{
                          uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                        }}
                      />
                      <Text style={{ color: "green" }}>In Stock</Text>

                    </View>
                  </Pressable>

                  <Pressable
                    style={{
                      marginTop: 15,
                      marginBottom: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 7,
                      }}
                    >
                      {item?.quantity > 1 ? (
                        <Pressable
                          onPress={() => decreaseQuantity(item)}
                          style={{
                            backgroundColor: "#D8D8D8",
                            padding: 7,
                            borderTopLeftRadius: 6,
                            borderBottomLeftRadius: 6,
                          }}
                        >
                          <MaterialCommunityIcons name="minus" size={24} color="black" />
                        </Pressable>
                      ) : (
                        <Pressable
                          onPress={() => deleteItem(item)}
                          style={{
                            backgroundColor: "#D8D8D8",
                            padding: 7,
                            borderTopLeftRadius: 6,
                            borderBottomLeftRadius: 6,
                          }}
                        >
                          <MaterialCommunityIcons name="delete-outline" size={24} color="black" />
                        </Pressable>
                      )}

                      <Pressable
                        style={{
                          backgroundColor: "white",
                          paddingHorizontal: 18,
                          paddingVertical: 6,
                        }}
                      >
                        <Text>{item?.quantity}</Text>
                      </Pressable>

                      <Pressable
                        onPress={() => increaseQuantity(item)}
                        style={{
                          backgroundColor: "#D8D8D8",
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6,
                        }}
                      >
                        <MaterialCommunityIcons name="plus" size={24} color="black" />
                      </Pressable>
                    </View>
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 8,
                        paddingVertical: 10,
                        borderRadius: 5,
                        borderColor: "#C0C0C0",
                        borderWidth: 0.6,
                      }}
                    >
                      <Text>Delete</Text>
                    </Pressable>
                  </Pressable>

                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 15,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 8,
                        paddingVertical: 10,
                        borderRadius: 5,
                        borderColor: "#C0C0C0",
                        borderWidth: 0.6,
                      }}
                    >
                      <Text>Save For Later</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "white",
                        paddingHorizontal: 8,
                        paddingVertical: 10,
                        borderRadius: 5,
                        borderColor: "#C0C0C0",
                        borderWidth: 0.6,
                      }}
                    >
                      <Text>See More Like this</Text>
                    </Pressable>
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
          </View>
          <Text style={{ marginBottom: 10, marginHorizontal: 10 }}>EMI details Available</Text>

          <Pressable
            onPress={() => navigation.navigate("Confirm")}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: 'black' }}>Proceed to Buy ({cart.length}) items</Text>
          </Pressable>
        </View>


      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize:16}}>Your cart is empty</Text>
        </View>
      )}




    </SafeAreaView>

  )
}

export default CartScreen

const styles = StyleSheet.create({})