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
        cards: this.cards.filter(({ status }) => status === itemStatus),
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
      runInAction(() => {
        this.board = {
          boardName: board.boardName || 'Board not found',
          id: board.id || '-1',
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
      
      runInAction(() => {
        this.board = updatedBoard;
      })
    } catch (err) {
      console.log('Update board error: ', err);
    }
  }

  deleteBoard = async (id: string): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3000/boards/delete-board/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        runInAction(() => {
          this.board = { boardName: '' }
        });
      }
    } catch (err) {
      console.log('Delete board error: ', err);
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

  updateCards = async (cards: Card[]): Promise<void> => {
    const reorderedCards = cards.map((card, idx) => ({
      ...card,
      order: idx,
    }));
    try {
      const response = await fetch(
        'http://localhost:3000/cards/update-cards-order',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reorderedCards),
        },
      );
      const success = await response.json();

      if (success) {
        runInAction(() => {
          this.cards = reorderedCards;
        });
      }
    } catch (err) {
      console.log('update order error: ', err);
    }
  }
}

export default new Boards();