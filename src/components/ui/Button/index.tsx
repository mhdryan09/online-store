import React from "react";
import styles from "./Button.module.scss";

type Propstypes = {
  type: "submit" | "button" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
  className?: string;
};

const Button = ({
  type,
  onClick,
  children,
  variant = "primary",
  className,
}: Propstypes) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
