import { StyleSheet, Text, View, ScrollView, Pressable, Alert, ToastAndroid } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../redux/CartReducer";
import { UserType } from "../UserContext";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
// global.atob = require('base-64').decode;


const ConfirmationScreen = ({ navigation }: any) => {
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Options" },
        { title: "Payment", content: "Payment Details" },
        { title: "Place Order", content: "Order Summary" },
    ];
    const [currentStep, setCurrentStep] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const { userId, setUserId } = useContext(UserType);
    const cart = useSelector((state) => state.cart.cart);
    const total = cart
        ?.map((item) => item.price * item.quantity)
        .reduce((curr, prev) => curr + prev, 0);
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
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(
                `http://10.0.2.2:8000/addresses/${userId}`
            );
            const { addresses } = response.data;

            setAddresses(addresses);
        } catch (error) {
            console.log("error", error);
        }
    };
    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAdress] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false);

    const [option, setOption] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                userId: userId,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: selectedOption,
            };

            const response = await axios.post(
                "http://10.0.2.2:8000/orders",
                orderData
            );
            if (response.status === 200) {
                navigation.navigate("Order");
                dispatch(cleanCart());
                console.log("order created successfully", response.data);
            } else {
                console.log("error creating order", response.data);
            }
        } catch (error) {
            console.log("errror", error);
        }
    };
    const pay = async () => {
        try {
            const options = {
                description: "Adding To Wallet",
                currency: "INR",
                name: "Amazon",
                key: "rzp_test_E3GWYimxN7YMk8",
                amount: total * 100,
                prefill: {
                    email: "void@razorpay.com",
                    contact: "9191919191",
                    name: "RazorPay Software",
                },
                theme: { color: "#F37254" },
            };

            const data = await RazorpayCheckout.open(options);

            console.log(data)

            const orderData = {
                userId: userId,
                cartItems: cart,
                totalPrice: total,
                shippingAddress: selectedAddress,
                paymentMethod: "card",
            };

            const response = await axios.post(
                "http://10.0.2.2:8000/orders",
                orderData
            );
            if (response.status === 200) {
                navigation.navigate("Order");
                dispatch(cleanCart());
                console.log("order created successfully", response.data);
            } else {
                console.log("error creating order", response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                        justifyContent: "space-between",
                    }}
                >
                    {steps?.map((step, index) => (
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            {index > 0 && (
                                <View
                                    style={[
                                        { flex: 1, height: 2, backgroundColor: "green" },
                                        index <= currentStep && { backgroundColor: "green" },
                                    ]}
                                />
                            )}
                            <View
                                style={[
                                    {
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: "#ccc",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    },
                                    index < currentStep && { backgroundColor: "green" },
                                ]}
                            >
                                {index < currentStep ? (
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                    >
                                        &#10003;
                                    </Text>
                                ) : (
                                    <Text
                                        style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                                    >
                                        {index + 1}
                                    </Text>
                                )}
                            </View>
                            <Text style={{ textAlign: "center", marginTop: 8 }}>
                                {step.title}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {currentStep == 0 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Select Delivery Address
                    </Text>

                    <Pressable>
                        {addresses?.map((item, index) => (
                            <Pressable
                                style={{
                                    borderWidth: 1,
                                    borderColor: "#D0D0D0",
                                    padding: 10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 5,
                                    paddingBottom: 17,
                                    marginVertical: 7,
                                    borderRadius: 6,
                                }}
                            >
                                {selectedAddress && selectedAddress._id === item?._id ? (
                                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                                ) : (
                                    <Entypo
                                        onPress={() => setSelectedAdress(item)}
                                        name="circle"
                                        size={20}
                                        color="gray"
                                    />
                                )}

                                <View style={{ marginLeft: 6 }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 3,
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                            {item?.name}
                                        </Text>
                                        <Entypo name="location-pin" size={24} color="red" />
                                    </View>
                                    <Text style={{ fontSize: 15, color: "#181818" }}>
                                        {item?.city}
                                    </Text>
                                    <Text style={{ fontSize: 15, color: "#181818" }}>
                                        {item?.houseNo}, {item?.landmark}
                                    </Text>


                                    <Text style={{ fontSize: 15, color: "#181818" }}>
                                        phone No : {item?.mobileNo}
                                    </Text>
                                    <View>
                                        {selectedAddress && selectedAddress._id === item?._id && (
                                            <Pressable
                                                onPress={() => {
                                                    if (selectedAddress) {
                                                        setCurrentStep(1)
                                                    } else {
                                                        Alert.alert("You didn't choose address")
                                                    }

                                                }

                                                }
                                                style={{
                                                    backgroundColor: "#008397",
                                                    padding: 10,
                                                    borderRadius: 20,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    marginTop: 10,
                                                }}
                                            >
                                                <Text style={{ textAlign: "center", color: "white" }}>
                                                    Deliver to this Address
                                                </Text>
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                    </Pressable>
                </View>
            )}

            {currentStep == 1 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Choose your delivery options
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: 8,
                            gap: 7,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        {option ? (
                            <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                        ) : (
                            <Entypo
                                onPress={() => setOption(!option)}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text style={{ flex: 1 }}>
                            <Text style={{ color: "green", fontWeight: "500" }}>
                                Tomorrow by 10pm
                            </Text>{" "}
                            - FREE delivery with your Prime membership
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => {
                            if (option) {
                                setCurrentStep(2)
                            } else {
                                Alert.alert("You didn't choose delivery")
                            }
                        }}
                        style={{
                            backgroundColor: "#FFC72C",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 15,
                        }}
                    >
                        <Text>Continue</Text>
                    </Pressable>
                </View>
            )}

            {currentStep == 2 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Select your payment Method
                    </Text>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 7,
                            marginTop: 12,
                        }}
                    >
                        {selectedOption === "cash" ? (
                            <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                        ) : (
                            <Entypo
                                onPress={() => setSelectedOption("cash")}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text>Cash on Delivery</Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 7,
                            marginTop: 12,
                        }}
                    >
                        {selectedOption === "card" ? (
                            <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                        ) : (
                            <Entypo
                                onPress={() => {
                                    setSelectedOption("card");
                                    Alert.alert("UPI/Debit card", "Pay Online", [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel is pressed"),
                                        },
                                        {
                                            text: "OK",
                                            onPress: () => pay(),
                                        },
                                    ]);
                                }}
                                name="circle"
                                size={20}
                                color="gray"
                            />
                        )}

                        <Text>UPI / Credit or debit card</Text>
                    </View>
                    <Pressable
                        onPress={() => {
                            if (selectedOption) {
                                setCurrentStep(3)
                            } else {
                                Alert.alert("You didn't choose Payment method")
                            }
                        }}
                        style={{
                            backgroundColor: "#FFC72C",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 15,
                        }}
                    >
                        <Text>Continue</Text>
                    </Pressable>
                </View>
            )}

            {currentStep === 3 && selectedOption === "cash" && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 8,
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                                Save 5% and never run out
                            </Text>
                            <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                                Turn on auto deliveries
                            </Text>
                        </View>

                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={24}
                            color="black"
                        />
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        <Text>Shipping to {selectedAddress?.name}</Text>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                                Items
                            </Text>

                            <Text style={{ color: "gray", fontSize: 16 }}>${total}</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
                                Delivery
                            </Text>

                            <Text style={{ color: "gray", fontSize: 16 }}>$0</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 8,
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                Order Total
                            </Text>

                            <Text
                                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
                            >
                                ${total}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderColor: "#D0D0D0",
                            borderWidth: 1,
                            marginTop: 10,
                        }}
                    >
                        <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

                        <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
                            Pay on delivery (Cash)
                        </Text>
                    </View>

                    <Pressable
                        onPress={handlePlaceOrder}
                        style={{
                            backgroundColor: "#FFC72C",
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20,

                        }}
                    >
                        <Text style={{ color: 'black' }}>Place your order</Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({})