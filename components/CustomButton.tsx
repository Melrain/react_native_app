import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: object;
  textStyles?: object;
  isLoading?: boolean;
}

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
