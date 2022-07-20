import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  imageContainer: {
    margin: 10,
    flex: 1,
    backgroundColor: '#E4E4E4',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  imagePhoto: {
    width: 350,
    height: 350,
  },
  imageNotLoaded: {
    width: 350,
    height: 0,
  },
  imagePlaceholder: {
    width: 350,
    height: 350,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
