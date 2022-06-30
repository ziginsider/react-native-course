import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Permissions} from '../../services/permissions';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export const Markers = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const [isCameraVisible, setCameraVisible] = useState(false);

  const requestCameraPermissionStatus = async () => {
    const checkStatus = await Permissions.checkCameraPermission();

    if (Permissions.isGranted(checkStatus)) {
      setCameraVisible(true);
      console.debug('CAMERA PERMISSION GRANTED');
    }

    if (
      Permissions.isUnavailable(checkStatus) ||
      Permissions.isBlocked(checkStatus)
    ) {
      setCameraVisible(false);
      console.debug('AMERA PERMISSION DENIED');
    }

    // 4
    if (Permissions.isDenied(checkStatus)) {
      const requestStatus = await Permissions.requestCameraPermission();
      if (Permissions.isGranted(requestStatus)) {
        setCameraVisible(true);
      } else {
        setCameraVisible(false);
      }
    }
  };

  useEffect(() => {
    requestCameraPermissionStatus();
  }, []);

  if (!isCameraVisible || !device) {
    console.debug('No camera available', device);
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <Camera
        device={device}
        isActive={true}
        style={StyleSheet.absoluteFill}
        frameProcessorFps={'auto'}
        orientation="portrait"
        photo={true}
      />
    </View>
  );
};
