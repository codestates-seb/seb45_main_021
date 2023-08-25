import styles from './Section.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function Section({ children }) {
  return <section className={cx('Section')}>{children}</section>;
}
