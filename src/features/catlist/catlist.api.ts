// see https://docs.thecatapi.com/authentication to get api key

export const API_KEY = '1b93f35a-f707-49cb-9e2e-17032a53c5e6j';

export function getUrl(
  limit: number,
  page: number,
  order: string = 'DESC',
): string {
  return `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&order=${order}`;
}

export function getHeader() {
  return {
    method: 'GET',
    headers: new Headers({
      'x-api-key': API_KEY,
    }),
  };
}
