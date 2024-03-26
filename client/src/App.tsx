import { observer } from 'mobx-react-lite';
import CreateBoard from './components/CreateBoard';
import BoardLoad from './components/BoardLoad';
import BoardContainer from './components/BoardContainer';
import BoardStore from './stores/BoardStore';
import './main.css';

const App = observer(() => {
  const { isBoardLoaded, board } = BoardStore;

  return (
    <>
      <BoardLoad />
     {
        isBoardLoaded && board.id !== '-1'
          ? <BoardContainer />
          : <CreateBoard />
      }
    </>
  )
})

export default App
