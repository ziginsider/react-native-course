import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Main: undefined;
  Edit: {isUpdate: boolean; todoId?: string};
  Camera: {todoId: string};
};

export type editScreenProp = StackNavigationProp<RootStackParamList, 'Edit'>;

export type editScreenRouteType = RouteProp<RootStackParamList, 'Edit'>;

export type cameraScreenRouteType = RouteProp<RootStackParamList, 'Camera'>;

export type todosScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;
