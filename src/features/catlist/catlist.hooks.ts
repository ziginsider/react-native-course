import {useState} from 'react';
import {CatImage, CatResponse} from '../../models/catimage';
import {getHeader, getUrl} from './catlist.api';

export function usePaging(initialPage: number): [Array<CatImage>, () => void] {
  const [page, setPage] = useState(initialPage);

  const [cats, setCats] = useState<Array<CatImage>>([]);

  const toCatImage = (catResponse: CatResponse): CatImage => {
    return {id: catResponse.id, url: catResponse.url};
  };

  const loadMoreCats = () => {
    fetch(getUrl(10, page), getHeader())
      .then((response) => response.json())
      .then((responseJson: Array<CatResponse>) => {
        const catsResponse = responseJson.map((item) => toCatImage(item));
        const pagedCats = [...cats].concat(catsResponse);
        setCats(pagedCats);
        setPage(page + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return [cats, loadMoreCats];
}
