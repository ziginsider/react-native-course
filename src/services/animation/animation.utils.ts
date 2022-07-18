import {Animated} from 'react-native';

export function holdOnHandler(
  isPressed: boolean,
  scaleOut: () => void,
  scaleIn: () => void,
) {
  return () => {
    if (isPressed) {
      scaleOut();
    } else {
      scaleIn();
    }
  };
}

export function zoomOut(scaleAnim: Animated.Value) {
  return () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };
}

export function zoomIn(scaleAnim: Animated.Value) {
  return () => {
    Animated.timing(scaleAnim, {
      toValue: 3,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };
}
