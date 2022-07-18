import React from 'react';
import {Permissions} from '.';

export const requestLocationPermissionStatus = async (
  setLocationPermissionStatus: (value: React.SetStateAction<boolean>) => void,
) => {
  const checkStatus = await Permissions.checkLocationPermission();

  if (Permissions.isGranted(checkStatus)) {
    setLocationPermissionStatus(true);
    console.debug('LOCATION PERMISSION IS GRANTED');
  }

  if (
    Permissions.isUnavailable(checkStatus) ||
    Permissions.isBlocked(checkStatus)
  ) {
    setLocationPermissionStatus(false);
    console.debug('LOCATION PERMISSION IS DENIED');
  }

  if (Permissions.isDenied(checkStatus)) {
    const requestStatus = await Permissions.requestLocationPermission();
    if (Permissions.isGranted(requestStatus)) {
      setLocationPermissionStatus(true);
    } else {
      setLocationPermissionStatus(false);
    }
  }
};

export const requestCameraPermissionStatus = async (
  setCameraPermissionStatus: (value: React.SetStateAction<boolean>) => void,
) => {
  const checkStatus = await Permissions.checkCameraPermission();

  if (Permissions.isGranted(checkStatus)) {
    setCameraPermissionStatus(true);
    console.debug('CAMERA PERMISSION IS GRANTED');
  }

  if (
    Permissions.isUnavailable(checkStatus) ||
    Permissions.isBlocked(checkStatus)
  ) {
    setCameraPermissionStatus(false);
    console.debug('CAMERA PERMISSION IS DENIED');
  }

  if (Permissions.isDenied(checkStatus)) {
    const requestStatus = await Permissions.requestCameraPermission();
    if (Permissions.isGranted(requestStatus)) {
      setCameraPermissionStatus(true);
    } else {
      setCameraPermissionStatus(false);
    }
  }
};

export const requestStoragePermissionStatus = async (
  setStoragePermissionStatus: (value: React.SetStateAction<boolean>) => void,
) => {
  const checkStatus = await Permissions.checkStoragePermission();

  if (Permissions.isGranted(checkStatus)) {
    setStoragePermissionStatus(true);
    console.debug('STORAGE PERMISSION IS GRANTED');
  }

  if (
    Permissions.isUnavailable(checkStatus) ||
    Permissions.isBlocked(checkStatus)
  ) {
    setStoragePermissionStatus(false);
    console.debug('STORAGE PERMISSION IS DENIED');
  }

  if (Permissions.isDenied(checkStatus)) {
    const requestStatus = await Permissions.requestStoragePermission();
    if (Permissions.isGranted(requestStatus)) {
      setStoragePermissionStatus(true);
    } else {
      setStoragePermissionStatus(false);
    }
  }
};
