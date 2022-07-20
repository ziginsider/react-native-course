import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {CatImage} from '../../models/catimage';
import {showAlert} from '../../utils/utils';
import {styles} from './catlist.styles';

export const CatItem = ({item}: {item: CatImage}) => {
  const [isLoaded, setLoaded] = useState(false);

  const onPress = () => {
    showAlert('Cat API', item.id);
  };

  const sourceOptions: Source = {
    uri: item.url,
    priority: FastImage.priority.normal,
    cache: FastImage.cacheControl.immutable,
  };

  const load = () => {
    setLoaded(true);
  };

  return (
    <View style={styles.imageContainer}>
      {!isLoaded && (
        <Image
          source={require('../img/cat-placeholder.png')}
          style={styles.imagePlaceholder}
        />
      )}
      <TouchableOpacity onPress={onPress}>
        <FastImage
          style={isLoaded ? styles.imagePhoto : styles.imageNotLoaded}
          source={sourceOptions}
          resizeMode={FastImage.resizeMode.contain}
          onLoadEnd={load}
        />
      </TouchableOpacity>
    </View>
  );
};
