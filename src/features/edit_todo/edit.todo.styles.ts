import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    margin: 15,
  },
  textInput: {
    width: '80%',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 2,
    fontSize: 20,
  },
  texticonClose: {
    fontSize: 16,
    textAlign: 'center',
  },
  clearIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    padding: 10,
  },
  locationContainer: {
    margin: 15,
    alignItems: 'center',
  },
  locationText: {
    fontSize: 10,
  },
  imageContainer: {
    paddingTop: 50,
    margin: 10,
  },
  imagePhoto: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});
