import React from 'react';
import {Animated, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {useAnimation} from 'react-native-animation-hooks';
import styled from 'styled-components/native';
import {FAST_ANIMATION_DURATION} from './constants';

const DeviceDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

interface BackdropProps {
  show?: boolean;
  onClose?: () => void;
  opacity?: number;
}

const Backdrop: React.FC<BackdropProps> = ({show, opacity = 0.5, onClose}) => {
  const animation = useAnimation({
    type: 'timing',
    initialValue: 0,
    toValue: show ? opacity : 0,
    duration: FAST_ANIMATION_DURATION,
    useNativeDriver: true,
  });

  const handleBackdropPress = () => {
    onClose && onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={handleBackdropPress}>
      <BackdropAnimated
        pointerEvents={show ? 'auto' : 'box-none'}
        style={[
          {
            backgroundColor: 'black',
            opacity: animation,
          },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

export default Backdrop;

const BackdropAnimated = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: ${DeviceDimensions.width}px;
  height: ${DeviceDimensions.height}px;
  zindex: 2;
`);
