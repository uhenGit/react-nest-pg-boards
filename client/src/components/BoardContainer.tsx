import { observer } from 'mobx-react-lite';
import BoardCardsContainer from './BoardCardsContainer';
import board from '../stores/BoardStore';

const BoardContainer = observer(() => {
  return (
    <div className='card mt-2'>
      <h3>
        Board name: { board.board.boardName }
      </h3>
      { board.isCardsExist && <BoardCardsContainer /> }
    </div>
  )
})

export default BoardContainer;