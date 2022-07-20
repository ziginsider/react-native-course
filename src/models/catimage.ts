export interface CatImage {
  readonly id: string;
  url: string;
}

export interface CatResponse {
  breeds?: Array<string>;
  id: string;
  url: string;
  width?: number;
  height?: number;
}
