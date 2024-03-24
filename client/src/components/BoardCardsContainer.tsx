import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import CardItem from './Card';
import BoardStore from '../stores/BoardStore';

const BoardCardsContainer = observer(() => {
  const { cardsColumnsByStatus, cards, updateCards } = BoardStore;
  const [ isShowCardForm, setIsShowCardForm ] = useState(false);
  const [ selectedId, setSelectedId ] = useState('');
  const handleDragStart = (evt: React.DragEvent<HTMLDivElement>, cardId: string): void => {
    evt.dataTransfer.setData('cardId', cardId);
  }
  const handleDrop = (evt: React.DragEvent<HTMLDivElement>, columnName: string) => {
    const cardId = evt.dataTransfer.getData('cardId');
    clearHighlights(columnName);
    const indicators: HTMLElement[] = getIndicators(columnName);
    const { el } = getNearestIndicator(evt, indicators);
    const before = el?.dataset.before || '-1';

    if (before !== cardId) {
      let cardsClone = [...cards];
      let draggedCard = cardsClone.find(({ id }) => id === cardId);

      if (!draggedCard) {
        return;
      }

      draggedCard = { ...draggedCard, status: columnName };
      cardsClone = cardsClone.filter(({ id }) => id !== cardId);
      
      const isMoveBack = before === '-1';

      if(isMoveBack) {
        cardsClone.push(draggedCard);
      } else {
        const targetIdx = cardsClone.findIndex(({ id }) => id === before);

        if (targetIdx === undefined) {
          return;
        }

        cardsClone.splice(targetIdx, 0, draggedCard);
      }
      updateCards(cardsClone);
    }
  }
  const handleDragOver = (evt: React.DragEvent<HTMLDivElement>, columnName: string): void => {
    evt.preventDefault();
    highlightElement(evt, columnName);
  }
  const handleDragLeave = (columnName: string): void => {
    clearHighlights(columnName)
  }
  const getIndicators = (columnName: string) => {
    return Array.from(
      document.querySelectorAll(`[data-column=${columnName}]`) as unknown as HTMLElement[]
    ) || [];
  }
  const highlightElement = (evt: React.DragEvent<HTMLDivElement>, columnName: string): void => {
    const indicators: HTMLElement[] = getIndicators(columnName);
    clearHighlights(columnName, indicators);
    const { el } = getNearestIndicator(evt, indicators);

    if (!el) {
      return;
    }

    el.style.opacity = '1';
  }
  const clearHighlights = (columnName: string, elements?: HTMLElement[]) => {
    const indicators = elements || getIndicators(columnName);
    indicators.forEach((item) => {
      item.style.opacity = '0';
    })
  }
  const getNearestIndicator = (evt: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
    const OFFSET_MEASURE = 50;
    return indicators.reduce(
      (acc, cV) => {
        const cvRect = cV.getBoundingClientRect();
        const offset = evt.clientY - (cvRect.top + OFFSET_MEASURE);

        if (offset < 0 && offset > acc.offset) {
          return { offset, el: cV };
        } else {
          return acc;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        el: indicators[indicators.length - 1],
      },
    );
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
          isDraggable={ false }
          toggleEditMode={ handleEditMode }
          handleDragStart={ () => {} }
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
          cardsColumnsByStatus.map((column) => {
            return (
              <div
                key={ column.id }
                onDragOver={ (evt: React.DragEvent<HTMLDivElement>) => handleDragOver(evt, column.columnName) }
                onDragLeave={ () => handleDragLeave(column.columnName) }
                onDrop={ (evt: React.DragEvent<HTMLDivElement>) => handleDrop(evt, column.columnName) }
                className={ `col-sm-3 mb-2 py-2 ${column.columnName}` }
              >
                <div>
                  <p className='text-uppercase'>
                    { column.columnName }
                  </p>
                  { onAddCard(column.columnName) }
                  <div>
                  {
                    column.cards.map((cardItem) =>
                      <CardItem
                        key={ cardItem.id }
                        cardInfo={ cardItem }
                        editMode={ cardItem.id === selectedId }
                        isDraggable={ true }
                        toggleEditMode={ handleEditMode }
                        handleDragStart={ handleDragStart }
                      />
                    )
                  }
                  </div>
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