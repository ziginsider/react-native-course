import {Alert} from 'react-native';

export function throwExpression(errorMessage: string): never {
  throw new Error(errorMessage);
}

export function showAlert(title: string, message: string) {
  Alert.alert(title, `Image id = ${message}`, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
}
