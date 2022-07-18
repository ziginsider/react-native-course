import {useFocusEffect} from '@react-navigation/native';
import {useState} from 'react';
import {
  requestCameraPermissionStatus,
  requestStoragePermissionStatus,
} from '../permissions/permissions.requests';

export function useCheckPhotoPermissions() {
  const [isCameraPermission, setCameraVisible] = useState(false);
  const [isStoragePermission, setStoragePermission] = useState(false);

  useFocusEffect(() => {
    requestCameraPermissionStatus(setCameraVisible);
    requestStoragePermissionStatus(setStoragePermission);
  });

  return [isCameraPermission, isStoragePermission];
}
