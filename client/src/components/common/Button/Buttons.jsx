import styles from './Button.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const BorderButton = ({ children, ...rest }) => {
  return (
    <button className={cx('border-button')} {...rest}>
      {children}
    </button>
  );
};
export const BottomButton = ({ children, ...rest }) => {
  return (
    <button className={cx('bottom-button')} {...rest}>
      {children}
    </button>
  );
};
