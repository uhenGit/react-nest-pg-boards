import { useEffect, useRef, useState } from 'react';
import BoardStore from '../stores/BoardStore';
import { Card } from '../interfaces/interfaces';
import { Indicator } from './Indicator';

interface CardInfo {
  cardInfo: Card,
  editMode: boolean,
  isDraggable: boolean,
  toggleEditMode: (cardId: string) => void,
  handleDragStart: (evt: React.DragEvent<HTMLDivElement>, cardId: string) => void,
}

const CardItem = ({
  cardInfo,
  editMode,
  isDraggable,
  toggleEditMode,
  handleDragStart,
}: CardInfo) => {
  const { title, description } = cardInfo;
  const { createCard, updateCard, deleteCard } = BoardStore;

  useEffect(() => {
    if (editMode && titleInput.current) {
      titleInput.current.focus();
    }
  }, [editMode]);
  const [ cardBody, setNewCardBody ] = useState({
    newTitle: title,
    newDescription: description,
  });
  const titleInput = useRef<HTMLInputElement>(null);

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = evt.currentTarget;
    setNewCardBody((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSaveCard = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const payload = {
      title: cardBody.newTitle,
      description: cardBody.newDescription,
    }

    if (!cardInfo.id) {
      await createCard(payload);
    } else {
      await updateCard(payload, cardInfo.id);
    }

    toggleEditMode('');
  }
  const onEditCard = (): void => {
    toggleEditMode(cardInfo.id as string);
  }
  const onDeleteCard = async (): Promise<void> => {
    await deleteCard(cardInfo.id as string);
  }
  return (
    <div
      className='card my-2'
      draggable={ isDraggable && !editMode }
      onDragStart={ (evt: React.DragEvent<HTMLDivElement>) => handleDragStart(evt, cardInfo.id as string) }
    >
      <Indicator
        beforeId={ cardInfo.id || null }
        column={ cardInfo.status as string }
      />
      <div className="card-body px-0 pt-0">
        {
         editMode
         ? <form onSubmit={ onSaveCard }>
            <label className='mb-1 form-label px-1'>
              Card title:
              <input
                ref={ titleInput }
                value={ cardBody.newTitle }
                onChange={ handleInput }
                name='newTitle'
                className='form-control-sm w-100'
              />
            </label>
            <label className='form-label px-1'>
              Card description:
              <input
                value={ cardBody.newDescription }
                onChange={ handleInput }
                name='newDescription'
                className='form-control-sm w-100'
              />
            </label>
            <button
              type='submit'
              disabled={ cardBody.newTitle.trim() === '' || cardBody.newDescription.trim() === '' }
              className='btn btn-success btn-sm mx-1'
            >
              save
            </button>
            <button
              type='button'
              onClick={ ()  => toggleEditMode('') }
              className='btn btn-warning btn-sm'
            >
              cancel
            </button>
          </form>
         : <div className='px-2 pt-0'>
              <div className='card-header d-flex justify-content-end pe-1 pt-0'>
                <button
                  type='button'
                  onClick={ onEditCard }
                  className='btn btn-info rounded-circle btn-sm me-1'
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                  </svg>
                </button>
                <button
                  type='button'
                  onClick={ onDeleteCard }
                  className='btn btn-danger rounded-circle btn-sm'
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                  </svg>
                </button>
              </div>
              <p
                className="card-title"
              >
                { title }
              </p>
              <p className='card-text'>
                { description }
              </p>
            </div>
        }
      </div>
    </div>
  )
}

export default CardItem;