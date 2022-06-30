import {RESULTS, request, check} from 'react-native-permissions';
import {
  CAMERA_PERMISSION,
  LOCATION_PERMISSION,
  STORAGE_PERMISSION,
} from './permissions.constans';

const isGranted = (value: string): boolean => value === RESULTS.GRANTED;

const isDenied = (value: string): boolean => value === RESULTS.DENIED;

const isBlocked = (value: string): boolean => value === RESULTS.BLOCKED;

const isUnavailable = (value: string): boolean => value === RESULTS.UNAVAILABLE;

const requestCameraPermission = async () => {
  return CAMERA_PERMISSION
    ? await request(CAMERA_PERMISSION)
    : RESULTS.UNAVAILABLE;
};

const checkCameraPermission = async () => {
  return CAMERA_PERMISSION
    ? await check(CAMERA_PERMISSION)
    : RESULTS.UNAVAILABLE;
};

const requestLocationPermission = async () => {
  return LOCATION_PERMISSION
    ? await request(LOCATION_PERMISSION)
    : RESULTS.UNAVAILABLE;
};

const checkLocationPermission = async () => {
  return LOCATION_PERMISSION
    ? await check(LOCATION_PERMISSION)
    : RESULTS.UNAVAILABLE;
};

const requestStoragePermission = async () => {
  return STORAGE_PERMISSION
    ? await request(STORAGE_PERMISSION)
    : RESULTS.UNAVAILABLE;
};

const checkStoragePermission = async () => {
  return STORAGE_PERMISSION
    ? await check(STORAGE_PERMISSION)
    : RESULTS.UNAVAILABLE;
};

export default {
  isGranted,
  isDenied,
  isBlocked,
  isUnavailable,
  requestCameraPermission,
  checkCameraPermission,
  requestLocationPermission,
  checkLocationPermission,
  requestStoragePermission,
  checkStoragePermission,
};
