import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInitialList } from '../../redux/listState/slice';
import TodoForm from '../../components/todoForm/TodoForm';
import TodoList from '../../components/todoList/TodoList';

function Home() {
  const firstTime = useSelector((state) => state.todolist.firstTime);
  const jwt = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log('home excute useEffect');
    if (firstTime) {
      dispatch(getInitialList(jwt));
    }
  }, [firstTime]); // eslint-disable-line

  return (
    <div>
      <h1>今日计划</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default Home;
