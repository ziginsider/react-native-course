import {RESULTS, request, check} from 'react-native-permissions';
import {CAMERA_PERMISSION} from './permissions.constans';

const isGranted = (value: string): boolean => value === RESULTS.GRANTED;

const isDenied = (value: string): boolean => value === RESULTS.DENIED;

const isBlocked = (value: string): boolean => value === RESULTS.BLOCKED;

const isUnavailable = (value: string): boolean => value === RESULTS.UNAVAILABLE;

const requestCameraPermission = () =>
  CAMERA_PERMISSION ? request(CAMERA_PERMISSION) : RESULTS.UNAVAILABLE;

const checkCameraPermission = () =>
  CAMERA_PERMISSION ? check(CAMERA_PERMISSION) : RESULTS.UNAVAILABLE;

export default {
  isGranted,
  isDenied,
  isBlocked,
  isUnavailable,
  requestCameraPermission,
  checkCameraPermission,
};
