import {Stylable} from 'components/types';
import React, {useEffect, useState} from 'react';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {FAST_ANIMATION_DURATION} from 'utils/animation';
import AnimatedEntranceAndPositioner from './items/AnimatedEntranceAndPositioner';

interface MenuRadialPositionerProps extends Stylable<ViewStyle> {
  radius?: number;
  elipsis?: {a: number; b: number};
  show?: boolean; // To make in & out animation
}

const MenuRadialPositioner: React.FC<MenuRadialPositionerProps> = ({
  children,
  show = false,
  style,
  elipsis,
  radius = 100,
}) => {
  const numberOfButtons = React.Children.count(children);
  const shiftedDegs = 180 / (numberOfButtons + 1);
  const [showing, setShowing] = useState(false);

  const _elipsis = elipsis === undefined ? {a: radius, b: radius} : elipsis;

  useEffect(() => {
    if (show) {
      setShowing(true);
    } else {
      const timeout = setTimeout(() => {
        setShowing(false);
      }, FAST_ANIMATION_DURATION);

      return () => {
        clearInterval(timeout);
      };
    }
  }, [show, setShowing]);

  if (!showing) {
    return null;
  }

  const calcY = (i: number) => {
    const deg = degToRad((i + 1) * shiftedDegs);
    const sign = deg > 0 && deg < Math.PI ? 1 : -1;
    return (
      (sign * (_elipsis.a * _elipsis.b)) /
      Math.sqrt(_elipsis.a ** 2 + _elipsis.b ** 2 / Math.tan(deg) ** 2)
    );
  };

  const calcX = (i: number) => {
    const deg = degToRad((i + 1) * shiftedDegs);
    const sign = deg > -Math.PI / 2 && deg < Math.PI / 2 ? 1 : -1;
    return (
      (sign * (_elipsis.a * _elipsis.b)) /
      Math.sqrt(_elipsis.b ** 2 + _elipsis.a ** 2 * Math.tan(deg) ** 2)
    );
  };

  return (
    <Container style={style}>
      {React.Children.map<any, any>(children, (c, i) => {
        if (c !== undefined) {
          const bottom = calcY(i);
          const left = calcX(i);

          return (
            <AnimatedEntranceAndPositioner
              show={show}
              bottom={bottom}
              left={left}
              c={c}
            />
          );
        }

        return null;
      })}
    </Container>
  );
};

export default MenuRadialPositioner;

const Container = styled.View`
  zindex: 30;
  position: absolute;
  bottom: 0px;
  alignself: center;
`;

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
