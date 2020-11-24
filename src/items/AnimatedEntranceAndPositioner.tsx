import React from 'react';
import {Animated} from 'react-native';
import {useAnimation} from 'react-native-animation-hooks';
import {FAST_ANIMATION_DURATION} from '../constants';
import TranslatedMenuItem from './TranslatedMenuItem';

interface AEAPProps {
  bottom: number;
  left: number;
  c: any;
  show: boolean;
}

const AnimatedEntranceAndPositioner: React.FC<AEAPProps> = ({
  show,
  bottom,
  left,
  c,
}) => {
  const animation = useAnimation({
    type: 'timing',
    initialValue: 0,
    toValue: show ? 1 : 0,
    duration: FAST_ANIMATION_DURATION,
    useNativeDriver: true,
  });

  const animatedStyles = {
    position: 'absolute' as 'absolute',
    bottom: bottom,
    left: left,
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-left, 0],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [bottom, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedStyles}>
      <TranslatedMenuItem>{c}</TranslatedMenuItem>
    </Animated.View>
  );
};

export default AnimatedEntranceAndPositioner;
