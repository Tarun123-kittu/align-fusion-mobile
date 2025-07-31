// components/BoxShadow.tsx
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { COLORS } from '../constants/Colors';

interface BoxShadowProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  shadowType?: 'light' | 'medium' | 'heavy';
  shadowColor?: string;
}

const BoxShadow: React.FC<BoxShadowProps> = ({ 
  children, 
  style, 
  shadowType = 'light',
  shadowColor = COLORS.black 
}) => {
  const getShadowStyle = () => {
    switch (shadowType) {
      case 'light':
        return {
          shadowColor: shadowColor,
          shadowOffset: {
            width: 0,
            height: 0.5,
          },
          shadowOpacity: 0.02,
          shadowRadius: 2,
          elevation: 0.5,
        };
      case 'medium':
        return {
          shadowColor: shadowColor,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        };
      case 'heavy':
        return {
          shadowColor: shadowColor,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 6,
        };
      default:
        return {};
    }
  };

  return (
    <View style={[getShadowStyle(), style]}>
      {children}
    </View>
  );
};

export default BoxShadow;