import * as React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import styles from "./Input.module.scss";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "onChange" | "onBlur" | "ref"
> & {
  label: string;
  id: string;
  registration: UseFormRegisterReturn;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, registration, error, className, ...rest }, forwardedRef) => {
    const { ref: rhfRef, ...reg } = registration;

    return (
      <div className={styles["form-control"]}>
        <label
          htmlFor={id}
          className={styles["label"]}>
          {label}
        </label>
        <input
          id={id}
          className={[styles["input"], className].filter(Boolean).join(" ")}
          {...reg}
          {...rest}
          ref={(el) => {
            rhfRef(el);
            if (typeof forwardedRef === "function") forwardedRef(el);
            else if (forwardedRef) forwardedRef.current = el;
          }}
        />
        {error && <p className={styles["error"]}>{error}</p>}
      </div>
    );
  }
);
