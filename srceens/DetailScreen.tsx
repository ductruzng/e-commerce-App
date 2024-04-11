import { Dimensions, ImageBackground, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SliderBox } from "react-native-image-slider-box";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/CartReducer'



const DetailScreen = ({ navigation, route }: any) => {
    const { width } = Dimensions.get('window')
    const statusBarHeight = StatusBar.currentHeight;
    const height = ((width * 100) / 100)
    const dispatch = useDispatch();
    const addItemToCart = (item: any) => {
        dispatch(addToCart(item))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

            <View style={[styles.headerContainer]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 10, borderRadius: 40 }}>
                    <Ionicons name='arrow-back' size={24} color={'black'} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 10, borderRadius: 40 }}>
                        <Ionicons name='heart-outline' size={24} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 10, borderRadius: 40 }}>
                        <Ionicons name='share-social' size={24} color={'black'} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView >
                <SliderBox
                    autoplay
                    circleLoop
                    height={height}
                    images={route.params.carouselImages}
                    dotColor={"#13274F"}
                    inactiveDotColor='#90A4AE'
                    ImageComponentStyle={{ width: width, height: height }}
                />
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>
                        {route?.params?.title}
                    </Text>

                    <Text style={{ fontSize: 24, fontWeight: '600', marginTop: 6, color: '#FEBE10' }}>
                        $ {route?.params?.price}
                    </Text>
                </View>
                <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }}></Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Text style={{ color: 'black' }}>Color: </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
                        {route?.params?.color}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Text style={{ color: 'black' }}>Color: </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
                        {route?.params?.size}
                    </Text>
                </View>

                <Text style={{ height: 1, borderColor: '#D0D0D0', borderWidth: 1 }}></Text>

                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5, color: 'black' }}>Total: {route.params.price}</Text>
                    <Text style={{ color: '#00CED1' }}>FREE delivery Tomorrow by 3 PM Order within 10hrs 30mins</Text>

                </View>
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => addItemToCart(route?.params?.item)}
                    style={{ backgroundColor: '#00CED1', padding: 10, width: 70, alignItems: 'center' }}>
                    <MaterialCommunityIcons name='cart-plus' size={30} color={'white'}

                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        addItemToCart(route?.params?.item)
                        navigation.navigate('Cart')}}
                    style={{ backgroundColor: '#FEBE10', padding: 15, alignItems: 'center', flex: 1 }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Buy Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default DetailScreen

const styles = StyleSheet.create({
    headerContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        position: 'absolute',
        zIndex: 1,
    }
})