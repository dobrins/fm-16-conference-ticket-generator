import * as React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import InputError from "./InputError";
import styles from "./Input.module.scss";

// TYPINGS

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "onChange" | "onBlur" | "ref"
> & {
  label: string;
  id: string;
  registration: UseFormRegisterReturn;
  error?: string;
};

// COMPONENT

const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, registration, error, ...rest }, forwardedRef) => {
    const { ref: rhfRef, ...reg } = registration;

    const errorId = `${id}-feedback`;
    const inputStyleCss = error ? "input-error" : "input";

    return (
      <div className={styles["form-control"]}>
        <label
          htmlFor={id}
          className={styles["label"]}>
          {label}
        </label>
        <input
          id={id}
          className={styles[inputStyleCss]}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...reg}
          {...rest}
          ref={(el) => {
            rhfRef(el);
            if (typeof forwardedRef === "function") forwardedRef(el);
            else if (forwardedRef) forwardedRef.current = el;
          }}
        />
        {error && <InputError id={errorId}>{error}</InputError>}
      </div>
    );
  },
);

// EXPORT

export default InputField;
