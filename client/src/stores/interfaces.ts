export interface Board {
  id?: string;
  boardName: string;
  boardId?: string;
  cards?: Card[];
}

export interface Card {
  id: string;
  title: string;
  description: string;
  status: string;
  boardId: string;
}