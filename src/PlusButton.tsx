import React from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {FAST_ANIMATION_DURATION} from 'utils/animation';
import {useAnimation} from 'react-native-animation-hooks';
import Circle from 'components/Circle/Circle';
import PlusSvg from './PlusIcon';

interface PlusButtonProps {
  style?: StyleProp<ViewStyle>;
  active: boolean;
  onPress?: () => void;
  animationDisabled?: boolean;
}

const PlusButton: React.FC<PlusButtonProps> = ({
  style,
  active,
  onPress,
  animationDisabled = false,
}) => {
  const animation = useAnimation({
    type: 'timing',
    toValue: active ? 1 : 0,
    duration: FAST_ANIMATION_DURATION,
    useNativeDriver: true,
  });

  const getPlusButtonAnimation = () => {
    if (animationDisabled) {
      return {};
    } else {
      return {
        transform: [
          {
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '45deg'],
            }),
          },
        ],
      };
    }
  };

  return (
    <Circle>
      <AnimatedPlusButton
        style={[getPlusButtonAnimation(), style]}
        activeOpacity={1}
        onPress={onPress}>
        <PlusSvg size={30} color={'white'} />
      </AnimatedPlusButton>
    </Circle>
  );
};

export default PlusButton;

const PlusButtonTouchable = styled.TouchableOpacity`
  padding: 15px;
  width: 60px;
  height: 60px;
  backgroundcolor: #4285f4;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  align-self: center;
  bottom: 30px;
  zindex: 200;
`;

const AnimatedPlusButton = Animated.createAnimatedComponent(
  PlusButtonTouchable,
);
