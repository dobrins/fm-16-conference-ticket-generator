import ExclamationIcon from "./ExclamationIcon";
import styles from "./InputError.module.scss";

// TYPINGS

interface PassedProps {
  children: React.ReactNode;
  id?: string;
  /** How urgently screen readers should announce updates */
  live?: "polite" | "assertive";
}

// COMPONENT

const InputError = ({ children, id, live = "assertive" }: PassedProps) => {
  return (
    <p
      className={styles["error"]}
      id={id}
      role="alert"
      aria-live={live}
      aria-atomic="true">
      <ExclamationIcon />
      {children}
    </p>
  );
};

// EXPORT

export default InputError;
