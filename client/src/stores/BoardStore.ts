import { makeObservable, action, observable, computed, runInAction } from 'mobx';
import { Board, Card, Column } from '../interfaces/interfaces';

class Boards {
  constructor() {
    makeObservable(this, {
      isBoardLoaded: computed,
      isCardsExist: computed,
      cardsColumnsByStatus: computed,
      board: observable,
      cards: observable,
      loadBoard: action,
      createBoard: action,
      updateBoard: action,
      createCard: action,
      updateCard: action,
    })
  }

  board: Board = {
    boardName: '',
  }

  cards: Card[] = []

  get isBoardLoaded(): boolean {
    return !!this.board?.id;
  }

  get isCardsExist(): boolean {
    return this.cards.length > 0;
  }

  get cardsColumnsByStatus(): Column[] {
    if (!this.isBoardLoaded) {
      return [];
    }

    return ['todo', 'inProgress', 'done']
      .map((itemStatus, idx): Column => ({
        id: idx,
        columnName: itemStatus,
        cards: this.cards
          .filter(({ status }) => status === itemStatus)
          // .sort((a, b) => a.order - b.order),
      }));
  }

  loadBoard = async (boardId: string): Promise<void> => {
    try {
      const response: Response = await fetch(
        'http://localhost:3000/boards/load-board',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ boardId }),
        },
      );
      const board: Board = await response.json();
      // console.log('board: ', board);
      runInAction(() => {
        this.board = {
          boardName: board.boardName,
          id: board.id,
          boardId: board.boardId,
        };
        this.cards = board.cards || [];
      })
    } catch (err) {
      console.log('Load board error: ', err);
    }
  }

  createBoard = async (boardName: string): Promise<void> => {
    try {
      const response: Response = await fetch(
        'http://localhost:3000/boards/create-board',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ boardName }),
        },
      );
      const newBoard: Board = await response.json();
      runInAction(() => {
        this.board = newBoard;
      })
    } catch (err) {
      console.log('Create board error: ', err);
    }
  }

  updateBoard = async (boardName: string, boardId: string): Promise<void> => {
    try {
      const response: Response = await fetch(
        'http://localhost:3000/boards/update-board',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ boardName, boardId }),
        },
      );
      const updatedBoard: Board = await response.json();
      console.log('UPDATE: ',this, updatedBoard);
      
      runInAction(() => {
        this.board = updatedBoard;
      })
    } catch (err) {
      console.log('Update board error: ', err);
    }
  }

  createCard = async (card: Card): Promise<void> => {
    try {
      const payload = {
        ...card,
        boardId: this.board.id,
      }
      const response = await fetch(
        'http://localhost:3000/cards/create-card',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );
      const newCard = await response.json();
      runInAction(() => {
        this.cards.push(newCard);
      })
    } catch (err) {
      console.log('Create card error: ', err);
    }
  }

  updateCard = async (card: Card, cardId: string): Promise<void> => {
    try {
      const response = await fetch(
        'http://localhost:3000/cards/update-card',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cardBody: {
              title: card.title,
              description: card.description,
            },
            cardId,
          }),
        },
      );
      const updatedCard = await response.json();
      runInAction(() => {
        this.cards = this.cards.map((item) => {
          if (item.id === updatedCard.id) {
            return updatedCard;
          }

          return item;
        })
      })
    } catch (err) {
      console.log('Update card error: ', err);
    }
  }

  deleteCard = async (cardId: string): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3000/cards/delete-card/${this.board.id}/${cardId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const { id: deletedCardId } = await response.json();
      runInAction(() => {
        this.cards = this.cards.filter(({ id }) => id !== deletedCardId)
      });
    } catch (err) {
      console.log('Delete card error: ', err);
    }
  }
  // setColumns = (columns: any[]): void => {
  //   console.log('STORE: ', columns);
  //   runInAction(() => {
  //     this.cards = 
  //   })
  // }
}

export default new Boards();