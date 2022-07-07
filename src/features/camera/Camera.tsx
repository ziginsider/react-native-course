import React, {useRef} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {styles} from './camera.styles';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {cameraScreenRouteType} from '../../navigation/RootStackParams';
import {getTakePhotoHandler} from '../../services/photo/photo';
import {useCheckPhotoPermissions} from '../../services/photo/hooks';

export const CameraView = () => {
  const [isCameraPermission, isStoragePermission] = useCheckPhotoPermissions();

  const isFocused = useIsFocused();
  const devices = useCameraDevices();
  const camera = useRef<Camera>(null);
  const device = devices.back;

  const {
    params: {todoId},
  } = useRoute<cameraScreenRouteType>();

  const takePhotoHandler = getTakePhotoHandler(camera, todoId);

  if (!isCameraPermission || !isStoragePermission || !device) {
    console.warn('No camera available', device);
    return null;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        device={device}
        isActive={isFocused}
        style={StyleSheet.absoluteFill}
        frameProcessorFps={'auto'}
        orientation="portrait"
        photo={true}
      />
      <View style={styles.captureBottonContainer}>
        <Button title="take photo" onPress={takePhotoHandler} />
      </View>
    </View>
  );
};
