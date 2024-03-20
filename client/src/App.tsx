import { observer } from 'mobx-react-lite';
import BoardLoad from './components/BoardLoad';
import BoardContainer from './components/BoardContainer';
import board from './stores/BoardStore';

const App = observer(() => {
  const { isBoardLoaded } = board;
  return (
    <>
      <BoardLoad />
     { isBoardLoaded && <BoardContainer /> }
    </>
  )
})

export default App
