import React from "react";
import styles from "./Input.module.scss";

type Propstypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const Input = ({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  disabled,
}: Propstypes) => {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        className={styles.container__input}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
