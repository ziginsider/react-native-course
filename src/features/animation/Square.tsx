import React, {useRef} from 'react';
import {Animated, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  holdOnHandler,
  zoomIn,
  zoomOut,
} from '../../services/animation/animation.utils';
import {
  useDoublePressSwitch,
  usePanResponder,
} from '../../services/animation/hooks';
import {styles} from './square.styles';

export const Square = () => {
  const [pan, panResponder] = usePanResponder();

  const [isPressed, onDoublePress] = useDoublePressSwitch();

  const initialAnimState = useRef(new Animated.Value(1)).current;

  const onLongPress = holdOnHandler(
    isPressed,
    zoomOut(initialAnimState),
    zoomIn(initialAnimState),
  );

  const animatedStyles = {
    transform: [
      {translateX: pan.x},
      {translateY: pan.y},
      {scale: initialAnimState},
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyles} {...panResponder.panHandlers}>
        <TouchableOpacity onPress={onDoublePress} onLongPress={onLongPress}>
          <View style={isPressed ? styles.boxRed : styles.boxGreen} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
