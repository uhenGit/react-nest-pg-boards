export interface Board {
  id?: string;
  boardName: string;
  boardId?: string;
  cards?: Card[];
}

export interface Card {
  id?: string;
  title: string;
  description: string;
  status?: string;
  boardId?: string;
  order?: number;
}

export interface Column {
  columnName: string;
  id: number;
  cards: Card[];
}