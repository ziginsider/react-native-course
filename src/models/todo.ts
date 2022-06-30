export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Todo {
  readonly id: string;
  isCompleted: boolean;
  description: string;
  coordinates?: Coordinates;
  photoUrl?: string;
}

// The data needed to create new Todo
export interface TodoData {
  description: string;
  coordinates?: Coordinates;
  photoUrl?: string;
}
