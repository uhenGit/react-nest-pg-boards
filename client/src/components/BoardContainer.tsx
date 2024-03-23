import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import BoardCardsContainer from './BoardCardsContainer';
import BoardStore from '../stores/BoardStore';

const BoardContainer = observer(() => {
  const { board, updateBoard } = BoardStore;
  const [ isFormShow, toggleIsFormShow ] = useState(false);
  const [ boardName, setBoardName ] = useState(board.boardName);
  const showBoardForm = (): void => {
    toggleIsFormShow(!isFormShow);
  }
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    evt.preventDefault();
    setBoardName(evt.currentTarget.value);
  }
  const saveBoard = async (evt: React.FormEvent<HTMLButtonElement>): Promise<void> => {
    evt.preventDefault();
    const trimedName = boardName.trim();

    if (trimedName === '') {
      return;
    }

    await updateBoard(trimedName, board.id as string);
    toggleIsFormShow(false);
  }
  return (
    <div className='my-3 min-vh-50'>
      <div className='d-flex border mb-2'>
        {
          isFormShow
          ? <form className='mx-2 my-0 col-sm-10'>
              <input
                value={ boardName }
                onChange={ handleInput }
              />
              <button
                className='btn btn-primary btn-sm ms-2 my-2'
                type='submit'
                onClick={ saveBoard }
                disabled={ boardName.trim() === '' }
              >
                save
              </button>
            </form>
          : <p className='m-2 col-sm-10'>
            Board name: { board.boardName }
          </p>
        }
        <div className='my-2'>
          <button
            type='button'
            onClick={ showBoardForm }
            className='btn btn-secondary btn-sm'
          >
            edit
          </button>
        </div>
      </div>
      <BoardCardsContainer />
    </div>
  )
})

export default BoardContainer;