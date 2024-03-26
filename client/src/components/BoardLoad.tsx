import React, { useEffect, useRef, useState } from 'react';
import BoardStore from '../stores/BoardStore';
import { Tooltip } from 'bootstrap';

const BoardLoad = () => {
  const { loadBoard, board, isBoardLoaded } = BoardStore;

  useEffect(() => {
    if (rememberCheckbox.current) {
      new Tooltip(rememberCheckbox.current, {
        title: 'Remember this board',
        placement: 'bottom',
        trigger: 'hover',
      });
    }
    
    const selectedBoard = localStorage.getItem('selectedBoard');

    if (selectedBoard) {
      const id = JSON.parse(selectedBoard);
      setBoardId(id);
      setIsBoardBemember(true);
    }
  }, []);
  const rememberCheckbox = useRef<HTMLDivElement>(null);
  const [ boardId, setBoardId ] = useState('');
  const [ currentBoardId, setCurrentBoardId ] = useState('');
  const [ isBoardRemember, setIsBoardBemember ] = useState(false);
  const [ boardIdBtnTitle, setBtnTitle ] = useState('Display current board id');

  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setBoardId(evt.currentTarget.value);
  }
  const handleRemember = (): void => {
    setIsBoardBemember(!isBoardRemember)
  }
  const onLoadBoard = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();

    if (boardId.trim() === '') {
      return;
    }

    if (isBoardRemember) {
      localStorage.setItem('selectedBoard', JSON.stringify(boardId));
    } else {
      localStorage.removeItem('selectedBoard');
    }

    await loadBoard(boardId);
    setBoardId('');
  }
  const displayCurrentBoardId = (): void => {
    const payload = currentBoardId === ''
      ? {
        id: board.boardId as string,
        title: 'Hide current board id',
      }
      : {
        id: '',
        title: 'Display current board id',
      }
    setCurrentBoardId(payload.id);
    setBtnTitle(payload.title);
  }
  return (
    <header className='card sticky-top'>
      <div className='card-body'>
        <p className='card-title'>
          Insert unique board id and load board data
        </p>
        <form
          onSubmit={ onLoadBoard }
          className='form-inline'
        >
          <div className='input-group'>
            <div
              ref={ rememberCheckbox }
              className='input-group-text mb-2'
            >
              <input
                checked={ isBoardRemember }
                type='checkbox'
                name='rememberBoard'
                onChange={ handleRemember }
                className='form-check-input'
              />
            </div>
            <input
              value={ boardId }
              onChange={ handleInput }
              type='text'
              className='form-control col-sm-10 mb-2'
              placeholder='Board id'
            />
            <button
              type='submit'
              disabled={ boardId.trim() === '' }
              className='btn btn-primary col-sm-auto mb-2'
            >
              Search
            </button>
          </div>          
        </form>
        {
          isBoardLoaded && board.id !== '-1'
            && <div>
              <button
                type='button'
                onClick={ displayCurrentBoardId }
                className='btn btn-info btn-sm mx-2'
              >
                { boardIdBtnTitle }
              </button>
              {
                currentBoardId !== ''
                && <span className='font-italic font-weight-light'>{ currentBoardId }</span>
              }
            </div>
        }
      </div>
    </header>
  )
}

export default BoardLoad;