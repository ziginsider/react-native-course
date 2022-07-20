import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {emptyState} from '../../screens/screens_jsx_elements/TodosElements';
import {CatImage} from '../../models/catimage';
import {styles} from './catlist.styles';
import {CatItem} from './CatItem';
import {useFocusEffect} from '@react-navigation/native';
import {usePaging} from './catlist.hooks';

export const Catlist = () => {
  const FIRST_PAGE = 1;

  const [cats, loadMoreCats] = usePaging(FIRST_PAGE);

  useFocusEffect(
    useCallback(() => {
      loadMoreCats();
    }, [loadMoreCats]),
  );

  const renderItem = ({item}: {item: CatImage}) => <CatItem item={item} />;

  const keyEx = (item: CatImage) => item.id;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListEmptyComponent={emptyState}
        data={cats}
        keyExtractor={keyEx}
        renderItem={renderItem}
        onEndReached={loadMoreCats}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};
