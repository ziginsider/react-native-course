import React, {useRef, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {
  Camera,
  TakePhotoOptions,
  useCameraDevices,
} from 'react-native-vision-camera';
import {styles} from './camera.styles';
import {useFocusEffect, useIsFocused, useRoute} from '@react-navigation/native';
import {
  requestCameraPermissionStatus,
  requestStoragePermissionStatus,
} from '../../services/permissions/permissions.requests';
import {cameraScreenRouteType} from '../../navigation/RootStackParams';
import {getTakePhotoHandler} from '../../services/photo/photo';

export const CameraView = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);

  const [isCameraVisible, setCameraVisible] = useState(false);
  const [isStoragePermission, setStoragePermission] = useState(false);
  const isFocused = useIsFocused();

  const {
    params: {todoId},
  } = useRoute<cameraScreenRouteType>();

  useFocusEffect(() => {
    console.log(todoId);
    requestCameraPermissionStatus(setCameraVisible);
    requestStoragePermissionStatus(setStoragePermission);
  });

  const takePhotoOptions: TakePhotoOptions = {
    qualityPrioritization: 'speed',
    skipMetadata: true,
    flash: 'auto',
  };

  const takePhotoHandler = getTakePhotoHandler(
    camera,
    takePhotoOptions,
    todoId,
  );

  if (!isCameraVisible || !isStoragePermission || !device) {
    console.debug('No camera available', device);
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
