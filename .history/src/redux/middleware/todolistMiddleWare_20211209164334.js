import axios from 'axios';

// 封装后的 Post Put 方法
const axiosPost = async (action, api, authodId) => {
  const packet = Object.assign({ authodId: authodId }, action.payload);
  console.log(packet);
  const { data } = await axios.post(api, packet);
  return data;
};

const axiosPut = async (action, api, authodId) => {
  const packet = Object.assign({ authodId: authodId }, action.payload);
  console.log(packet);
  const { data } = await axios.put(api, packet);
  return data;
};

export const todolistMiddleWare = (store) => (next) => (action) => {
  // console.log('state now',store);
  // console.log('fire action', action);
  const authorId = store.getState().user.uid;
  let api =
    'https://www.fastmock.site/mock/ec3f45d4cf2bb5a3874fc0d304a8c735/todolist/api/';

  switch (action.type) {
    case 'todolist/GET_TODO':
      break;

    case 'todolist/ADD_TODO':
      let addTodoApi = api + 'addtodo';
      let storelist = store.getState().todolist;

      // 为新的 todo 添加 sortIndex
      action.payload.sortIndex = storelist.length
        ? storelist[storelist.length - 1].sortIndex + 1
        : 0;
      axiosPost(action, addTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    case 'todolist/REMOVE_TODO':
      let removeTodoApi = api + 'removetodo';
      axiosPost(action, removeTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    case 'todolist/UPDATE_TODO':
      let updateTodoApi = api + 'updatetodo';
      axiosPut(action, updateTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    case 'todolist/COMPLETE_TODO':
      let completeTodoApi = api + 'completeTodo';
      axiosPut(action, completeTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    case 'todolist/REORDER_TODO':
      let reorderTodoApi = api + 'reordertodo';
      let reorderPacket = action.payload.map((item) => {
        return { id: item.id, sortIndex: item.sortIndex };
      });
      console.log(reorderPacket);
      axiosPost(action, reorderTodoApi, authorId).then((data) => {
        console.log(data);
      });
      break;

    default:
      break;
  }
  next(action);
  // console.log('state updated',store);
};
