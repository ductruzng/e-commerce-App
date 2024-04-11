import { models } from "mongoose";
import React, { useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
interface QuestionAnswerItemProps{
    item:any
}

const QuestionAnswerItem:React.FC<QuestionAnswerItemProps> = ({item}) => {
    const [expanded, setExpanded] = useState(false);
    const animationHeight = useState(new Animated.Value(0))[0]; // Sử dụng Animated.Value để tạo animation
  
    const toggleAnswer = () => {
      if (expanded) {
        // Nếu câu trả lời đang hiển thị, thu gọn
        Animated.timing(animationHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        // Nếu câu trả lời đang ẩn, mở rộng
        Animated.timing(animationHeight, {
          toValue: 100, // Điều chỉnh chiều cao phù hợp với nội dung
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      setExpanded(!expanded);
    };
  
    return (
      <View style={{ marginBottom: 10,padding:20 }}>
        <TouchableOpacity onPress={toggleAnswer}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.question}</Text>
        </TouchableOpacity>
        <Animated.View style={{ overflow: 'hidden', height: animationHeight }}>
          <Text style={{ marginTop: 10 }}>{item.answer}</Text>
        </Animated.View>
      </View>
    );
  };

  export default QuestionAnswerItem