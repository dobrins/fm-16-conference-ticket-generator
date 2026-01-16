import styles from "./Container.module.scss";

// TYPINGS

interface PassedProps {
  children: React.ReactNode;
}

// COMPONENT

const Container = ({ children }: PassedProps) => {
  return (
    <div className={styles.container}>
      <img
        src="/assets/images/logo-full.svg"
        alt="Coding Conf Logo"
        className={styles.logo}
      />
      {children}
    </div>
  );
};

// EXPORT

export default Container;
