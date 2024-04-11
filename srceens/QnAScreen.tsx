// Import các thành phần cần thiết từ react-native
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QuestionAnswerItem from '../components/ItemQnA';

const QuestionAnswer = ({navigation}: any) => {
  const qaData = [
    {
      id: 1,
      question: 'How do I track my order?',
      answer:
        "You can track your order status by logging into your account and visiting the 'My Orders' section.",
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods including credit cards, PayPal, and direct bank transfers.',
    },
    {
      id: 3,
      question: 'Can I return or exchange an item?',
      answer:
        "Yes, you can return or exchange items within 30 days of purchase. Please visit our 'Return Policy' section for more details.",
    },
    {
      id: 4,
      question: 'How long does delivery take?',
      answer:
        'Delivery times vary depending on your location and the shipping method chosen. Estimated delivery times are provided at checkout.',
    },
    {
      id: 5,
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we offer international shipping to selected countries. Shipping costs and times may vary.',
    },
  ];

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
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
          Q & A
        </Text>
      </View>
      {qaData.map((item, index) => (
        <QuestionAnswerItem key={item.id} item={item} />
      ))}
    </View>
  );
};

export default QuestionAnswer;
