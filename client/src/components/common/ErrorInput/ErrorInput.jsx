import React from 'react';
import styles from './ErrorInput.module.css';
export default function ErrorInput({ label, onChange, error, value, type, name }) {
  return (
    <div className={`${styles.ErrorInput} ${error && styles.error}`}>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} value={value} onChange={onChange} name={name} />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
