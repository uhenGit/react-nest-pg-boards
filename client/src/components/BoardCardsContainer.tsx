import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import CardItem from './Card';
import BoardStore from '../stores/BoardStore';
import { Column, Card } from '../interfaces/interfaces';

const BoardCardsContainer = observer(() => {
  const [ currentColumn, setCurrentColumn ] = useState<Column>();
  const [ currentCard, setCurrentCard ] = useState<Card>();
  const [ isShowCardForm, setIsShowCardForm ] = useState(false);
  const [ selectedId, setSelectedId ] = useState('');
  const handleDragOver = (evt: React.DragEvent<HTMLDivElement>): void => {
    evt.preventDefault();
    const eventTarget = evt.target as HTMLTextAreaElement;

    if (eventTarget.className === 'card-body') {
      evt.currentTarget.style.boxShadow = '0 4px 3px gray';
    }
  }
  const handleDragStart = (evt: React.DragEvent<HTMLDivElement>, column: Column, card: Card): void => {
    setCurrentColumn(column);
    setCurrentCard(card);
  }
  const handleDragLeave = (evt: React.DragEvent<HTMLDivElement>): void => {
    evt.currentTarget.style.boxShadow = 'none';
  }
  const handleDragEnd = (evt: React.DragEvent<HTMLDivElement>): void => {
    evt.currentTarget.style.boxShadow = 'none';
  }
  const handleDrop = (evt: React.DragEvent<HTMLDivElement>, column: Column, card: Card) => {
    evt.preventDefault();
    // if only change a column
    console.log('DROP: ', column.columnName, card.status, currentCard?.status, currentColumn);
    
    /* const currentCardIdx = currentColumn.cards.indexOf(currentCard);
    console.log('DROP: ', currentCardIdx);
    currentColumn.cards.splice(currentCardIdx, 1);
    const dropCardIdx = column.cards.indexOf(card);
    column.cards.splice(dropCardIdx + 1, 0, currentCard);
    boards.setColumns(boards.cardsColumnsByStatus.map((boardColumn) => {
      if (boardColumn.id === column.id) {
        return column;
      }

      if (boardColumn.id === currentColumn.id) {
        return currentColumn;
      }

      return boardColumn;
    })) */
    // const toggleEditMode = (): void => {
    //   setEditMode(!editMode);
    // }
  }
  const onAddCard = (currentColumnName: string): JSX.Element | null => {
    if (currentColumnName === 'todo' && !isShowCardForm && selectedId === '') {
      return (
        <button
          onClick={ showCardForm }
          className='btn btn-success btn-sm w-100'
        >
          add
        </button>
      )
    }

    if (currentColumnName === 'todo' && isShowCardForm) {
      return (
        <CardItem
          cardInfo={{
            title: '',
            description: '',
          }}
          editMode={ true }
          toggleEditMode={ handleEditMode }
        />
      )
    }

    return null;
  }
  const handleEditMode = (id: string): void => {
    setSelectedId(id);
    
    if (id === '') {
      setIsShowCardForm(false);
    }
  }
  const showCardForm = (): void => {
    setIsShowCardForm(!isShowCardForm);
  }
  return (
    <div className='container h-100'>
      <div className='row justify-content-around h-100'>
        {
          BoardStore.cardsColumnsByStatus.map((column) => {
            return (
              <div
                key={ column.id }
                className={ `col-sm-3 mb-2 py-2 ${column.columnName}` }
              >
                <div>
                  <p className='text-uppercase'>
                    { column.columnName }
                  </p>
                  { onAddCard(column.columnName) }
                  {
                    column.cards.map((cardItem) =>
                      <div
                        key={ cardItem.id }
                        draggable={ true }
                        onDragOver={ (evt: React.DragEvent<HTMLDivElement>) => handleDragOver(evt) }
                        onDragStart={ (evt: React.DragEvent<HTMLDivElement>) => handleDragStart(evt, column, cardItem) }
                        onDragLeave={ (evt: React.DragEvent<HTMLDivElement>) => handleDragLeave(evt) }
                        onDragEnd={ (evt: React.DragEvent<HTMLDivElement>) => handleDragEnd(evt) }
                        onDrop={ (evt: React.DragEvent<HTMLDivElement>) => handleDrop(evt, column, cardItem) }
                        className='card my-2'
                      >
                        <CardItem
                          cardInfo={ cardItem }
                          editMode={ cardItem.id === selectedId }
                          toggleEditMode={ handleEditMode }
                        />
                      </div>
                    )
                    
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
})

export default BoardCardsContainer;