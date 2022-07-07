import {Camera, TakePhotoOptions} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';

const takePhotoOptions: TakePhotoOptions = {
  qualityPrioritization: 'speed',
  skipMetadata: true,
  flash: 'auto',
};

export function getTakePhotoHandler(
  camera: React.RefObject<Camera>,
  photoId?: string,
) {
  if (!photoId) {
    return;
  }
  return async () => {
    try {
      const photo = await camera.current?.takePhoto(takePhotoOptions);
      console.log(photo?.path);
      const filePath = photo?.path ?? '';
      const newFilePath =
        RNFS.ExternalDirectoryPath + `/${photoId.toString()}.jpeg`;
      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getPhotoUri(todoId?: string): string {
  return `file:///storage/emulated/0/Android/data/com.react_native_course/files/${
    todoId ?? ' '
  }.jpeg`;
}
