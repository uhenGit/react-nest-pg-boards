import React, { useState } from 'react';
import boards from '../stores/BoardStore';

const BoardLoad = () => {
  const [ boardId, setBoardId ] = useState('');
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    setBoardId(evt.currentTarget.value);
  }
  const onLoadBoard = async (evt: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    evt.preventDefault();
    const { loadBoard } = boards;
    await loadBoard(boardId);
    setBoardId('');
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
              onChange={ handleInput }
              value={ boardId }
              className='col-sm-10 mb-2 mr-1'
              placeholder='Board id'
            />
            <button
              className='btn btn-primary col-sm-auto mb-2'
              type='submit'
              onClick={ onLoadBoard }
            >
              Search
            </button>
          </div>          
        </form>
      </div>
    </header>
  )
}

export default BoardLoad;