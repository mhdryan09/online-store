import React from "react";
import styles from "./Input.module.scss";

type Propstypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
};
const Input = ({ label, name, type, placeholder }: Propstypes) => {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        className={styles.container__input}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
