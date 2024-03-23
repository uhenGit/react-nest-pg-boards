import { observer } from 'mobx-react-lite';
import CreateBoard from './components/CreateBoard';
import BoardLoad from './components/BoardLoad';
import BoardContainer from './components/BoardContainer';
import board from './stores/BoardStore';
import './main.css';

const App = observer(() => {
  const { isBoardLoaded } = board;
  return (
    <>
      <BoardLoad />
     {
        isBoardLoaded
          ? <BoardContainer />
          : <CreateBoard />
      }
    </>
  )
})

export default App
