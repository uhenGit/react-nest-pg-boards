import React, { useState } from 'react';
import BoardStore from '../stores/BoardStore';

const BoardLoad = () => {
  const [ boardId, setBoardId ] = useState('');
  const [ currentBoardId, setCurrentBoardId ] = useState('');
  const [ boardIdBtnTitle, setBtnTitle ] = useState('Display current board id');
  const { loadBoard, board, isBoardLoaded } = BoardStore;
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setBoardId(evt.currentTarget.value);
  }
  const onLoadBoard = async (evt: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    evt.preventDefault();

    if (boardId.trim() === '') {
      return;
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
        <form className='form-inline'>
          <div className='form-group row justify-content-around'>
            <input
              value={ boardId }
              onChange={ handleInput }
              className='col-sm-10 mb-2'
              placeholder='Board id'
            />
            <button
              type='submit'
              disabled={ boardId.trim() === '' }
              onClick={ onLoadBoard }
              className='btn btn-primary col-sm-auto mb-2'
            >
              Search
            </button>
          </div>          
        </form>
        {
          isBoardLoaded
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