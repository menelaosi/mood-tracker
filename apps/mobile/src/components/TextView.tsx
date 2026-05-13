import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

interface TextItem {
  label?: string;
  style?: StyleProp<TextStyle>;
}

interface TextViewProps {
  viewStyle?: StyleProp<ViewStyle>;
  texts: TextItem[];
}

export function TextView({ viewStyle, texts }: TextViewProps) {
  return (
    <View style={viewStyle}>
      {texts.map((item, index) => (
        <Text key={index} style={item.style}>
          {item.label}
        </Text>
      ))}
    </View>
  );
}
