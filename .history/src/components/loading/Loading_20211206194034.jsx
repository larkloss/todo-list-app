import Styles from './Loading.module.css';
function Toast() {
  return (
    <div className={Styles.mask}>
      <div className={Styles['lds-grid']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
export default Toast;