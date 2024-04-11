import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
interface OrderItemProps {

    createdAt: string;
    products: any;
    totalPrice: Number;
    paymentMethod: String;

}
const OrderItem: React.FC<OrderItemProps> = ({
    createdAt,
    products,
    totalPrice,
    paymentMethod
}) => {
    return (
        <TouchableOpacity style={{ flex: 1, gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent:'space-between', marginBottom: 5 }}>
                <Text style={{ fontSize: 16, color: 'black', }}>{createdAt.slice(0, -14)}</Text>
                <Text style={{ fontSize: 16, color: 'green', fontWeight: 'bold' }}>Delivery Successful</Text>

            </View>
            <View style={{ height: 1, backgroundColor: 'grey', marginBottom: 10, gap: 10 }} />
            <View style={{}}>
                {products.map((item: any, index: any) => (
                    <View style={{ flexDirection: 'row', gap: 40 }}>
                        <Image
                            style={{ width: 60, height: 60 }}
                            resizeMode='contain'
                            source={{ uri: item.image }}
                        />
                        <View style={{ gap: 5 }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', width: 200 }}>{item.name}</Text>
                            <Text style={{ color: 'black' }}>Quantity: {item.quantity}</Text>

                            <Text style={{ color: 'black' }}>Total Price: <Text style={{ fontWeight: '500', color: 'black' }}>{"" + totalPrice}$</Text></Text>

                        </View>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    )
}

export default OrderItem

const styles = StyleSheet.create({})