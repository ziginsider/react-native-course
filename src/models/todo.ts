export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TodoData {
  description: string;
  coordinates?: Coordinates;
  photoUrl?: string;
}

export interface Todo extends TodoData {
  readonly id: string | number[];
  isCompleted: boolean;
}
