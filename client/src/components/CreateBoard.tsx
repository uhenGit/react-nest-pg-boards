import { useState } from 'react';
import BoardStore from '../stores/BoardStore';

const CreateBoard = () => {
  const { createBoard, board } = BoardStore;
  const [ isFormShow, toggleIsFormShow ] = useState(false);
  const [ boardName, setBoardName ] = useState('');
  const toggleShowBoardForm = (): void => {
    toggleIsFormShow(!isFormShow);
  }
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>):void => {
    evt.preventDefault();
    setBoardName(evt.currentTarget.value);
  }
  const onSaveBoard = async (evt: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    evt.preventDefault();
    if (boardName.trim() === '') {
      return;
    }

    await createBoard(boardName);
    setBoardName('');
    toggleIsFormShow(false);
  }
  return (
    <div className="d-flex justify-content-center">
      {
        isFormShow
          ? <form className='mt-5'>
              <input
                value={ boardName }
                onChange={ handleInput }
              />
              <button
                type='submit'
                onClick={ onSaveBoard }
                disabled={ boardName.trim() === '' }
                className='btn btn-success btn-sm ms-3'
              >
                save
              </button>
              <button
                type='button'
                onClick={ toggleShowBoardForm }
                className='btn btn-warning btn-sm ms-2'
              >
                cancel
              </button>
            </form>
          : <div className='d-flex flex-column justify-content-center mt-3 w-25'>
              { board.id === '-1' && <h5 className='text-center'>Board did not found</h5> }
               <button
                onClick={ toggleShowBoardForm }
                className="btn btn-info btn-sm mt-5"
              >
                create
              </button>
            </div>
      }
    </div>
  )
}

export default CreateBoard;