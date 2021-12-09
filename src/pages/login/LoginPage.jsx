import styles from '../../styles/SignupAndRegist.module.css';
import { useState, useEffect } from 'react';
import { signIn } from '../../redux/user/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/toast/Toast';
import { showToast } from '../../components/toast/Toast';

function LoginPage() {
  const dispatch = useDispatch();

  // 组件 state 获取用户输入
  const [userLogInInput, setUserLogInInput] = useState({
    userName: '',
    password: ''
  });
  function handleUserNameInput(e) {
    setUserLogInInput({ ...userLogInInput, userName: e.target.value });
  }
  function handlePasswordInput(e) {
    setUserLogInInput({ ...userLogInInput, password: e.target.value });
  }

  // 连接 redux 获取 token 和 error
  const jwt = useSelector((state) => state.user.token);
  const errorMessage = useSelector((state) => state.user.error);
  // 密码错误时 showToast
  useEffect(() => {
    if (errorMessage !== null) {
      showToast(errorMessage);
    }
  }, [errorMessage]);
  // jwt 改变时 路由转跳
  const navigate = useNavigate();
  useEffect(() => {
    if (jwt !== null) {
      console.log('jwt:', jwt);
      navigate('/home');
    }
  }, [jwt]);// eslint-disable-line

  function handleLogin(e) {
    e.preventDefault();
    if (!userLogInInput.userName || !userLogInInput.password) {
      showToast('用户名和密码不能为空！')
    } else {
      dispatch(signIn(userLogInInput));
    }

    // console.log('userInput:', userLogInInput);
  }

  return (
    <>
      <h1 className={styles['firstPage-title']}>Task-APP</h1>
      <h2 className={styles['firstPage-header']}>Please login</h2>
      <form className={styles['firstPage-form']} onSubmit={handleLogin}>
        <input
          className={styles['firstPage-input']}
          type="text"
          value={userLogInInput.userName}
          onChange={handleUserNameInput}
          placeholder="请输入用户名"
        />
        <input
          className={`${styles['firstPage-input']} ${styles['firstPage-password']}`}
          type="text"
          value={userLogInInput.password}
          onChange={handlePasswordInput}
          placeholder="请输入密码"
        />
        <button className={styles['firstPage-button']}>登 录</button>
        <a className={styles['firstPage-SignupRegsitSwitch']} href="/signup">
          注册
        </a>
      </form>
      <Toast />
    </>
  );
}

export default LoginPage;
