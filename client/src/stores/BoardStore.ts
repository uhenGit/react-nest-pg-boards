import { makeAutoObservable, runInAction } from 'mobx';
import { Board, Card } from './interfaces';

class Boards {
  constructor() {
    makeAutoObservable(this)
  }

  board: Board = {
    boardName: '',
  }

  cards: Card[] = []

  get isBoardLoaded() {
    return !!this.board?.id;
  }

  get isCardsExist() {
    return this.cards.length > 0;
  }

  loadBoard = async (boardId: string): Promise<void> => {
    const url = `http://localhost:3000/boards/get-board/${boardId}`;
    try {
      const response: Response = await fetch(
        url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const board = await response.json();
      console.log('board: ', board);
      runInAction(() => {
        this.board = {
          boardName: board.boardName,
          id: board.id,
        };
        this.cards = board.cards;
      })
    } catch (err) {
      console.log('Load board error: ', err);
    }
  }
}

export default new Boards();