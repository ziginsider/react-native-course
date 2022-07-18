import {useRef, useState} from 'react';
import {Animated, PanResponder, PanResponderInstance} from 'react-native';

/**
 * Changes the state of switch after double tapping
 *
 * @returns isPressed - true or false - the state of switch
 * @returns function to check double press
 */
export function useDoublePressSwitch(): [boolean, () => void] {
  const [pressTimestamp, setPressTimestamp] = useState(0);

  const [isPressed, setIsPressed] = useState(false);

  return [
    isPressed,
    () => {
      var delta = new Date().getTime() - pressTimestamp;

      console.log(`PRESS timestamp=${pressTimestamp}, delta=${delta}`);

      if (delta < 200) {
        setIsPressed(!isPressed);
      }

      setPressTimestamp(new Date().getTime());
    },
  ];
}

export function usePanResponder(): [Animated.ValueXY, PanResponderInstance] {
  const pan = useRef(new Animated.ValueXY()).current;

  return [
    pan,
    useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (e, gestureState) => {
          return !(gestureState.dx === 0 && gestureState.dy === 0);
        },
        onPanResponderGrant: () => {
          pan.setOffset({
            x: pan.x._value,
            y: pan.y._value,
          });
        },
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: () => {
          pan.flattenOffset();
        },
      }),
    ).current,
  ];
}
